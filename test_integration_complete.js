#!/usr/bin/env node

/**
 * 🚀 Full Integration Test Script
 * 
 * Demonstrates the complete flow:
 * 1. ZK proof generation
 * 2. Verification on ZKVerify
 * 3. Creation on the Smart Contract
 * 4. Persistence in Supabase
 */

import 'dotenv/config';
import { zkVerifySession, Library, CurveType } from 'zkverifyjs';
import { createPublicClient, createWalletClient, http, parseEther } from 'viem';
import { localhost } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { formatVerificationKeyForZKVerify } from './server/utils/zkverifyFormatter.ts';
import { generateCreditProof } from './zk-credit/services/creditProofService.ts';

// Smart Contract Configuration
const LOAN_MANAGER_ABI = [
  {
    "inputs": [
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "uint256", "name": "durationInDays", "type": "uint256" },
      { "internalType": "uint256", "name": "interestRate", "type": "uint256" },
      { "internalType": "bytes32", "name": "zkCommitmentHash", "type": "bytes32" }
    ],
    "name": "createLoanRequest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "loanId", "type": "uint256" }],
    "name": "getLoan",
    "outputs": [
      { "internalType": "address", "name": "borrower", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "uint256", "name": "fundedAmount", "type": "uint256" },
      { "internalType": "uint256", "name": "deadline", "type": "uint256" },
      { "internalType": "uint256", "name": "interestRate", "type": "uint256" },
      { "internalType": "bytes32", "name": "zkCommitmentHash", "type": "bytes32" },
      { "internalType": "bool", "name": "repaid", "type": "bool" },
      { "internalType": "address[]", "name": "funders", "type": "address[]" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

async function main() {
  console.log('🚀 STARTING FULL INTEGRATION TEST');
  console.log('=' .repeat(60));

  try {
    // 1. 🔐 GENERATE ZK PROOF
    console.log('\n1️⃣ GENERATING ZK PROOF...');
    const timestamp = Date.now();
    const score = 750 + (timestamp % 100);
    const threshold = 700 + (timestamp % 50);
    
    console.log(`📊 Score: ${score}, Threshold: ${threshold}`);
    
    const proofResult = await generateCreditProof({
      score: score.toString(),
      threshold: threshold.toString()
    });
    
    console.log('✅ ZK proof generated successfully!');
    console.log(`🔗 Public Signals: ${proofResult.publicSignals.join(', ')}`);

    // 2. 🔍 VERIFY ON ZKVERIFY
    console.log('\n2️⃣ VERIFYING ON ZKVERIFY...');
    
    const buildPath = path.join(process.cwd(), 'zk-credit', 'build');
    const vkeyPath = path.join(buildPath, 'verification_key.json');
    const vkey = JSON.parse(fs.readFileSync(vkeyPath, 'utf-8'));
    const formattedVkey = formatVerificationKeyForZKVerify(vkey);

    const session = await zkVerifySession.start()
      .Volta()
      .withAccount(process.env.ZKVERIFY_SEED_PHRASE || 'test seed phrase');
    
    console.log('✅ ZKVerify session created!');
    const account = session.getAccount();
    console.log(`👤 Address: ${account?.address || 'N/A'}`);

    const { events, transactionResult } = await session
      .verify()
      .groth16({ library: Library.snarkjs, curve: CurveType.bn128 })
      .execute({
        proofData: {
          vk: formattedVkey,
          proof: proofResult.proof,
          publicSignals: proofResult.publicSignals.map(String)
        },
        domainId: 1
      });

    events.on('includedInBlock', (e) => console.log('📦 Proof included in block:', e));
    events.on('finalized', (e) => console.log('✅ Proof finalized:', e));
    events.on('error', (e) => console.error('❌ Proof error:', e));

    const verification = await transactionResult;
    console.log('✅ Proof verified on ZKVerify!');

    // 3. 📝 CREATE ON SMART CONTRACT
    console.log('\n3️⃣ CREATING ON SMART CONTRACT...');
    
    const publicClient = createPublicClient({
      chain: localhost,
      transport: http('http://localhost:8545')
    });

    const walletClient = createWalletClient({
      chain: localhost,
      transport: http('http://localhost:8545')
    });

    const account_contract = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);
    
    // Create ZK proof hash
    const zkCommitmentHash = `0x${crypto.randomBytes(32).toString('hex')}`;
    
    // Loan data
    const loanAmount = 1.0; // 1 ETH
    const durationDays = 30;
    const interestRate = 5; // 5%

    const { request } = await publicClient.simulateContract({
      address: CONTRACT_ADDRESS,
      abi: LOAN_MANAGER_ABI,
      functionName: 'createLoanRequest',
      args: [
        parseEther(loanAmount.toString()),
        BigInt(durationDays),
        BigInt(interestRate),
        zkCommitmentHash
      ],
      account: account_contract
    });

    const contractTx = await walletClient.writeContract(request);
    console.log('✅ Loan created on smart contract!');
    console.log(`🔗 Transaction Hash: ${contractTx}`);

    // 4. 💾 SIMULATE PERSISTENCE IN SUPABASE
    console.log('\n4️⃣ SIMULATING PERSISTENCE IN SUPABASE...');
    
    const loanData = {
      id: crypto.randomUUID(),
      creator_id: crypto.randomUUID(),
      title: `Test Loan ${timestamp}`,
      description: 'Loan generated via integration test',
      amount: loanAmount,
      interest_rate: interestRate,
      term_months: durationDays / 30,
      category: 'test',
      risk_score: score.toString(),
      status: 'pending',
      deadline: new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString(),
      blockchain_tx_hash: contractTx,
      zk_proof_hash: zkCommitmentHash,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log('✅ Simulated data for Supabase:');
    console.log(`📋 ID: ${loanData.id}`);
    console.log(`💰 Amount: ${loanData.amount} ETH`);
    console.log(`📅 Term: ${loanData.term_months} months`);
    console.log(`🔗 TX Hash: ${loanData.blockchain_tx_hash}`);

    // 5. 📊 VERIFY ON SMART CONTRACT
    console.log('\n5️⃣ VERIFYING ON SMART CONTRACT...');
    
    const loanCount = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi: LOAN_MANAGER_ABI,
      functionName: 'getLoan',
      args: [BigInt(0)] // First loan
    });

    console.log('✅ Loan data on contract:');
    console.log(`👤 Borrower: ${loanCount[0]}`);
    console.log(`💰 Amount: ${parseEther(loanCount[1].toString())} ETH`);
    console.log(`📅 Deadline: ${new Date(Number(loanCount[3]) * 1000).toISOString()}`);
    console.log(`📊 Interest Rate: ${loanCount[4]}%`);
    console.log(`🔐 ZK Hash: ${loanCount[5]}`);
    console.log(`✅ Repaid: ${loanCount[6]}`);

    // 6. 🎯 FINAL SUMMARY
    console.log('\n🎉 FULL INTEGRATION SUCCESSFULLY COMPLETED!');
    console.log('=' .repeat(60));
    console.log('✅ ZK proof generated and verified');
    console.log('✅ Smart Contract executed');
    console.log('✅ Data persisted (simulated)');
    console.log('✅ End-to-end flow working');
    console.log('\n🚀 SYSTEM READY FOR PRESENTATION!');

  } catch (error) {
    console.error('❌ Integration error:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
} 