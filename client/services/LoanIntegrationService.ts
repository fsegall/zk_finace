import { createPublicClient, createWalletClient, http, parseEther, formatEther } from 'viem';
import { sepolia, localhost } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import { supabase } from '../lib/supabase/client';
import { generateCreditProof } from '../../zk-credit/services/creditProofService';

// ABI do contrato LoanManager
const LOAN_MANAGER_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "durationInDays",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "interestRate",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "zkCommitmentHash",
        "type": "bytes32"
      }
    ],
    "name": "createLoanRequest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "loanId",
        "type": "uint256"
      }
    ],
    "name": "fundLoan",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "loanId",
        "type": "uint256"
      }
    ],
    "name": "repayLoan",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "loanId",
        "type": "uint256"
      }
    ],
    "name": "getLoan",
    "outputs": [
      {
        "internalType": "address",
        "name": "borrower",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "fundedAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "interestRate",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "zkCommitmentHash",
        "type": "bytes32"
      },
      {
        "internalType": "bool",
        "name": "repaid",
        "type": "bool"
      },
      {
        "internalType": "address[]",
        "name": "funders",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "loanCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Endereços dos contratos
const CONTRACT_ADDRESSES = {
  localhost: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  sepolia: '0x9EA26472ddFD1C14F02e1D8B16Bad0904758599e'
} as const;

// Tipos TypeScript
export interface LoanData {
  title: string;
  description?: string;
  amount: number;
  interestRate: number;
  termMonths: number;
  category: string;
  riskScore: string;
  deadline: Date;
}

export interface LoanRequest {
  id: string;
  borrower: string;
  amount: bigint;
  fundedAmount: bigint;
  deadline: bigint;
  interestRate: bigint;
  zkCommitmentHash: string;
  repaid: boolean;
  funders: string[];
}

export interface IntegrationResult {
  contractTx: { hash: string };
  dbRecord: any;
  zkProof: any;
}

export class LoanIntegrationService {
  private publicClient;
  private walletClient;
  private contractAddress: string;

  constructor(chain: 'localhost' | 'sepolia' = 'localhost') {
    const chainConfig = chain === 'localhost' ? localhost : sepolia;
    this.contractAddress = CONTRACT_ADDRESSES[chain];

    // Cliente público para leitura
    this.publicClient = createPublicClient({
      chain: chainConfig,
      transport: http()
    });

    // Cliente de carteira para transações
    this.walletClient = createWalletClient({
      chain: chainConfig,
      transport: http()
    });
  }

  /**
   * Cria um novo empréstimo integrando ZK, Smart Contract e Supabase
   */
  async createLoan(
    loanData: LoanData,
    userWalletAddress: string,
    userId: string
  ): Promise<IntegrationResult> {
    try {
      console.log('🔗 Iniciando criação de empréstimo...', { loanData, userWalletAddress });

      // 1. Gerar prova ZK
      console.log('🔐 Gerando prova ZK...');
      const zkProof = await generateCreditProof({
        score: loanData.riskScore,
        threshold: "700" // Threshold padrão
      });

      // 2. Criar hash da prova ZK
      const zkCommitmentHash = this.hashZKProof(zkProof);

      // 3. Criar no smart contract
      console.log('📝 Criando no smart contract...');
      const contractTx = await this.createLoanOnContract(
        loanData,
        zkCommitmentHash,
        userWalletAddress
      );

      // 4. Persistir no Supabase
      console.log('💾 Persistindo no Supabase...');
      const dbRecord = await this.createLoanInDatabase(
        loanData,
        userId,
        contractTx.hash,
        zkCommitmentHash
      );

      console.log('✅ Empréstimo criado com sucesso!', {
        contractTx: contractTx.hash,
        dbRecord: dbRecord.id,
        zkProofHash: zkCommitmentHash
      });

      return {
        contractTx,
        dbRecord,
        zkProof
      };

    } catch (error) {
      console.error('❌ Erro ao criar empréstimo:', error);
      throw error;
    }
  }

  /**
   * Financia um empréstimo existente
   */
  async fundLoan(
    loanId: number,
    amount: number,
    investorWalletAddress: string,
    investorId: string
  ): Promise<{ contractTx: { hash: string }, dbRecord: any }> {
    try {
      console.log('💰 Financiando empréstimo...', { loanId, amount, investorWalletAddress });

      // 1. Financiar no smart contract
      const contractTx = await this.fundLoanOnContract(loanId, amount, investorWalletAddress);

      // 2. Registrar investimento no Supabase
      const dbRecord = await this.createInvestmentInDatabase(
        loanId,
        investorId,
        amount,
        contractTx.hash
      );

      console.log('✅ Empréstimo financiado com sucesso!', {
        contractTx: contractTx.hash,
        dbRecord: dbRecord.id
      });

      return { contractTx, dbRecord };

    } catch (error) {
      console.error('❌ Erro ao financiar empréstimo:', error);
      throw error;
    }
  }

  /**
   * Reembolsa um empréstimo
   */
  async repayLoan(
    loanId: number,
    borrowerWalletAddress: string
  ): Promise<{ contractTx: { hash: string }, dbRecord: any }> {
    try {
      console.log('💸 Reembolsando empréstimo...', { loanId, borrowerWalletAddress });

      // 1. Obter dados do empréstimo
      const loan = await this.getLoanFromContract(loanId);
      const totalWithInterest = this.calculateTotalWithInterest(loan.amount, loan.interestRate);

      // 2. Reembolsar no smart contract
      const contractTx = await this.repayLoanOnContract(loanId, totalWithInterest, borrowerWalletAddress);

      // 3. Atualizar status no Supabase
      const dbRecord = await this.updateLoanStatusInDatabase(loanId, 'repaid', contractTx.hash);

      console.log('✅ Empréstimo reembolsado com sucesso!', {
        contractTx: contractTx.hash,
        dbRecord: dbRecord.id
      });

      return { contractTx, dbRecord };

    } catch (error) {
      console.error('❌ Erro ao reembolsar empréstimo:', error);
      throw error;
    }
  }

  /**
   * Obtém dados de um empréstimo do smart contract
   */
  async getLoanFromContract(loanId: number): Promise<LoanRequest> {
    const loan = await this.publicClient.readContract({
      address: this.contractAddress as `0x${string}`,
      abi: LOAN_MANAGER_ABI,
      functionName: 'getLoan',
      args: [BigInt(loanId)]
    });

    return {
      id: loanId.toString(),
      borrower: loan[0],
      amount: loan[1],
      fundedAmount: loan[2],
      deadline: loan[3],
      interestRate: loan[4],
      zkCommitmentHash: loan[5],
      repaid: loan[6],
      funders: loan[7]
    };
  }

  /**
   * Obtém o total de empréstimos
   */
  async getLoanCount(): Promise<number> {
    const count = await this.publicClient.readContract({
      address: this.contractAddress as `0x${string}`,
      abi: LOAN_MANAGER_ABI,
      functionName: 'loanCount'
    });

    return Number(count);
  }

  // Métodos privados auxiliares

  private async createLoanOnContract(
    loanData: LoanData,
    zkCommitmentHash: string,
    userWalletAddress: string
  ) {
    const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);
    
    const { request } = await this.publicClient.simulateContract({
      address: this.contractAddress as `0x${string}`,
      abi: LOAN_MANAGER_ABI,
      functionName: 'createLoanRequest',
      args: [
        parseEther(loanData.amount.toString()),
        BigInt(loanData.termMonths * 30), // Converter meses para dias
        BigInt(loanData.interestRate),
        zkCommitmentHash as `0x${string}`
      ],
      account
    });

    const hash = await this.walletClient.writeContract(request);
    
    return { hash };
  }

  private async fundLoanOnContract(
    loanId: number,
    amount: number,
    investorWalletAddress: string
  ) {
    const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);
    
    const { request } = await this.publicClient.simulateContract({
      address: this.contractAddress as `0x${string}`,
      abi: LOAN_MANAGER_ABI,
      functionName: 'fundLoan',
      args: [BigInt(loanId)],
      value: parseEther(amount.toString()),
      account
    });

    const hash = await this.walletClient.writeContract(request);
    
    return { hash };
  }

  private async repayLoanOnContract(
    loanId: number,
    totalAmount: bigint,
    borrowerWalletAddress: string
  ) {
    const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);
    
    const { request } = await this.publicClient.simulateContract({
      address: this.contractAddress as `0x${string}`,
      abi: LOAN_MANAGER_ABI,
      functionName: 'repayLoan',
      args: [BigInt(loanId)],
      value: totalAmount,
      account
    });

    const hash = await this.walletClient.writeContract(request);
    
    return { hash };
  }

  private async createLoanInDatabase(
    loanData: LoanData,
    userId: string,
    txHash: string,
    zkProofHash: string
  ) {
    const { data, error } = await supabase
      .from('loans')
      .insert({
        creator_id: userId,
        title: loanData.title,
        description: loanData.description,
        amount: loanData.amount,
        interest_rate: loanData.interestRate,
        term_months: loanData.termMonths,
        category: loanData.category,
        risk_score: loanData.riskScore,
        status: 'pending',
        deadline: loanData.deadline.toISOString(),
        blockchain_tx_hash: txHash,
        zk_proof_hash: zkProofHash
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  private async createInvestmentInDatabase(
    loanId: number,
    investorId: string,
    amount: number,
    txHash: string
  ) {
    const { data, error } = await supabase
      .from('investments')
      .insert({
        loan_id: loanId.toString(),
        investor_id: investorId,
        amount: amount,
        status: 'confirmed',
        blockchain_tx_hash: txHash
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  private async updateLoanStatusInDatabase(
    loanId: number,
    status: string,
    txHash: string
  ) {
    const { data, error } = await supabase
      .from('loans')
      .update({
        status: status,
        blockchain_tx_hash: txHash,
        updated_at: new Date().toISOString()
      })
      .eq('id', loanId.toString())
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  private hashZKProof(zkProof: any): string {
    // Implementar hash da prova ZK
    // Por simplicidade, usando JSON.stringify + keccak256
    const proofString = JSON.stringify(zkProof);
    return `0x${Buffer.from(proofString).toString('hex').slice(0, 64)}`;
  }

  private calculateTotalWithInterest(amount: bigint, interestRate: bigint): bigint {
    return amount + (amount * interestRate) / BigInt(100);
  }
}

// Instância singleton
export const loanIntegrationService = new LoanIntegrationService(); 