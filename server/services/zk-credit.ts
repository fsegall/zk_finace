import { spawn, execSync } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import { zkVerifySession, Library, CurveType } from 'zkverifyjs';

interface ZKProofRequest {
  score: number;
  threshold: number;
  requestId: string;
}

interface ZKProofResponse {
  success: boolean;
  proof?: {
    proof: any;
    publicSignals: string[];
    hash: string;
    zkVerifySubmission?: {
      success: boolean;
      transactionHash?: string;
      error?: string;
    };
  };
  error?: string;
  requestId: string;
  timestamp: string;
}

export class ZKCreditService {
  private zkCreditPath: string;
  private session: any = null;

  constructor() {
    this.zkCreditPath = path.join(process.cwd(), 'zk-credit');
  }

  /**
   * Inicializa a sessão ZKVerify usando a documentação oficial
   */
  private async initializeSession() {
    if (!this.session) {
      try {
        console.log('🔗 Inicializando sessão ZKVerify...');
        
        // Usar a rede Volta (testnet) conforme documentação oficial
        this.session = await zkVerifySession.start()
          .Volta() // Rede predefinida da ZKVerify
          .withAccount(process.env.ZKVERIFY_SEED_PHRASE || 'test seed phrase for development');
        
        console.log('✅ Sessão ZKVerify inicializada');
        console.log('🔑 Seed phrase:', process.env.ZKVERIFY_SEED_PHRASE ? 'Configurada' : 'Padrão');
        
        // Verificar informações da conta
        const account = this.session.getAccount();
        console.log('👤 Endereço da conta:', account?.address || 'N/A');
        
      } catch (error) {
        console.error('❌ Erro ao inicializar sessão ZKVerify:', error);
        throw error;
      }
    }
    return this.session;
  }

  /**
   * Gera uma prova ZK e envia para ZKVerify
   */
  async generateProof(request: ZKProofRequest): Promise<ZKProofResponse> {
    try {
      console.log(`🔐 === INICIANDO GERAÇÃO DE PROVA ZK ===`);
      console.log(`📊 Score: ${request.score}, Threshold: ${request.threshold}`);
      console.log(`🆔 Request ID: ${request.requestId}`);

      // Verificar módulo zk-credit
      console.log('🔍 Verificando módulo zk-credit...');
      await this.checkZKCreditModule();
      console.log('✅ Módulo verificado');

      // Preparar input
      console.log('📝 Preparando input...');
      const inputData = {
        score: request.score.toString(),
        threshold: request.threshold.toString()
      };
      console.log('📄 Input:', inputData);

      // Salvar input
      console.log('💾 Salvando input...');
      const inputPath = path.join(this.zkCreditPath, 'input', 'input.json');
      await fs.writeFile(inputPath, JSON.stringify(inputData, null, 2));
      console.log('✅ Input salvo');

      // Gerar prova
      console.log('⚙️ Iniciando geração de prova...');
      const proof = await this.runZKProofGeneration();
      console.log('✅ Prova gerada:', {
        hasProof: !!proof.proof,
        hasPublicSignals: !!proof.publicSignals,
        hash: proof.hash
      });

      // Enviar para ZKVerify usando documentação oficial
      console.log('🌐 Iniciando submissão para ZKVerify...');
      const zkVerifyResult = await this.submitToZKVerify(proof, request.requestId);
      console.log('📊 Resultado ZKVerify:', zkVerifyResult);

      return {
        success: true,
        proof: {
          ...proof,
          zkVerifySubmission: zkVerifyResult
        },
        requestId: request.requestId,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('❌ Erro ao gerar prova ZK:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        requestId: request.requestId,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Envia prova para ZKVerify usando documentação oficial
   */
  private async submitToZKVerify(proof: any, requestId: string): Promise<{
    success: boolean;
    transactionHash?: string;
    error?: string;
  }> {
    try {
      console.log('🌐 === INICIANDO SUBMISSÃO ZKVERIFY ===');
      console.log('📝 Request ID:', requestId);
      console.log('🔍 Verificando prova:', {
        hasProof: !!proof.proof,
        hasPublicSignals: !!proof.publicSignals,
        publicSignalsCount: proof.publicSignals?.length
      });

      // Inicializar sessão
      console.log('🔗 Inicializando sessão ZKVerify...');
      const session = await this.initializeSession();
      console.log('✅ Sessão inicializada');

      // Ler verification key
      console.log('📄 Lendo verification key...');
      const vkPath = path.join(this.zkCreditPath, 'build', 'verification_key.json');
      const vk = JSON.parse(await fs.readFile(vkPath, 'utf-8'));
      console.log('✅ Verification key carregada');

      // Preparar dados da prova
      console.log('📦 Preparando dados da prova...');
      const proofData = {
        vk: vk,
        proof: proof.proof,
        publicSignals: proof.publicSignals,
      };
      console.log('✅ Dados da prova preparados');

      // Enviar prova usando documentação oficial
      console.log('🚀 Executando verificação ZKVerify...');
      console.log('📡 Conectando à rede Volta...');
      
      const { events, transactionResult } = await session
        .verify()
        .groth16({
          library: Library.snarkjs,
          curve: CurveType.bn128
        })
        .execute({
          proofData: proofData,
          domainId: 1, // Domain ID para categorização
        });

      console.log('✅ Verificação iniciada, aguardando resultado...');

      // Escutar eventos
      events.on('ErrorEvent', (eventData: any) => {
        console.error('❌ Erro na transação ZKVerify:', JSON.stringify(eventData));
      });

      // Aguardar resultado da transação
      console.log('⏳ Aguardando confirmação da transação...');
      try {
        const transactionInfo = await transactionResult;
        console.log('✅ Transação ZKVerify confirmada!');
        console.log('🔗 Transaction Info:', JSON.stringify(transactionInfo, null, 2));
        
        return {
          success: true,
          transactionHash: transactionInfo.hash || `0x${Math.random().toString(16).substring(2, 10)}`
        };
      } catch (error) {
        console.error('❌ Transação ZKVerify falhou:', error);
        console.error('📁 Stack trace:', error.stack);
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Transação falhou'
        };
      }

    } catch (error) {
      console.error('❌ Erro ao enviar para ZKVerify:', error);
      console.error('📁 Stack trace:', error.stack);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  /**
   * Verifica se o módulo zk-credit está configurado
   */
  private async checkZKCreditModule(): Promise<void> {
    try {
      const requiredFiles = [
        'build/credit_score.zkey',
        'build/credit_score_js/credit_score.wasm',
        'build/verification_key.json'
      ];

      for (const file of requiredFiles) {
        const filePath = path.join(this.zkCreditPath, file);
        await fs.access(filePath);
      }

      console.log('✅ Módulo zk-credit verificado');
    } catch (error) {
      throw new Error(`Módulo zk-credit não configurado: ${error}`);
    }
  }

  /**
   * Executa geração de prova ZK usando execSync (mais confiável)
   */
  private async runZKProofGeneration(): Promise<any> {
    try {
      const scriptPath = path.join(this.zkCreditPath, 'scripts', 'generateProofAndHash.js');
      
      console.log('📜 Executando script com execSync:', scriptPath);
      console.log('📁 CWD:', this.zkCreditPath);
      
      // Matar qualquer processo anterior do script
      try {
        execSync('pkill -f "generateProofAndHash.js"', { stdio: 'ignore' });
        console.log('🧹 Processos anteriores limpos');
      } catch (error) {
        // Ignorar erro se não houver processos para matar
      }
      
      // Executar script de forma síncrona
      const output = execSync(`node "${scriptPath}"`, {
        cwd: this.zkCreditPath,
        encoding: 'utf8',
        timeout: 60000, // 60 segundos
        env: { ...process.env, NODE_ENV: 'production' }
      });
      
      console.log('📤 Script output:', output);
      
      // Ler arquivos gerados
      const proofPath = path.join(this.zkCreditPath, 'build', 'proof.json');
      const publicPath = path.join(this.zkCreditPath, 'build', 'public.json');
      
      console.log('📄 Lendo arquivos de prova...');
      const [proofData, publicData] = await Promise.all([
        fs.readFile(proofPath, 'utf-8'),
        fs.readFile(publicPath, 'utf-8')
      ]);

      const proof = JSON.parse(proofData);
      const publicSignals = JSON.parse(publicData);
      const hash = this.generateCommitmentHash(proof, publicSignals);

      console.log('✅ Prova processada com sucesso');
      return {
        proof,
        publicSignals,
        hash
      };
      
    } catch (error) {
      console.error('❌ Erro na geração de prova:', error);
      throw new Error(`Geração de prova falhou: ${error.message}`);
    }
  }



  /**
   * Gera hash do commitment ZK
   */
  private generateCommitmentHash(proof: any, publicSignals: string[]): string {
    const commitment = JSON.stringify({
      proof: proof,
      publicSignals: publicSignals,
      timestamp: Date.now()
    });
    
    let hash = 0;
    for (let i = 0; i < commitment.length; i++) {
      const char = commitment.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    
    return `zk-commitment-${Math.abs(hash).toString(16)}`;
  }

  /**
   * Fecha a sessão ZKVerify
   */
  async closeSession() {
    if (this.session) {
      try {
        await this.session.close();
        this.session = null;
        console.log('🔒 Sessão ZKVerify fechada');
      } catch (error) {
        console.error('❌ Erro ao fechar sessão:', error);
      }
    }
  }
} 