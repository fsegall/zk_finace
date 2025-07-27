import 'dotenv/config';
import { zkVerifySession, Library, CurveType } from 'zkverifyjs';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { formatVerificationKeyForZKVerify } from '../../server/utils/zkverifyFormatter.ts';
import { generateCreditProof } from '../services/creditProofService.ts';

async function main() {
  try {
    console.log('🔍 Testando submissão de prova ZKVerify (usando VK já registrada)...');
    // Generate unique identifier for this test
    const timestamp = Date.now();
    const randomHash = crypto.randomBytes(8).toString('hex');
    const testId = `${timestamp}-${randomHash}`;
    console.log('🆔 Teste ID:', testId);
    // Load verification key (already registered)
    const buildPath = path.join(process.cwd(), 'build');
    const vkeyPath = path.join(buildPath, 'verification_key.json');
    const vkey = JSON.parse(fs.readFileSync(vkeyPath, 'utf-8'));
    const formattedVkey = formatVerificationKeyForZKVerify(vkey);
    // Generate real ZK proof with unique inputs
    const score = 750 + (timestamp % 100); // Score varia entre 750-849
    const threshold = 700 + (timestamp % 50); // Threshold varia entre 700-749
    console.log(`📊 Score: ${score}, Threshold: ${threshold}`);
    const proofResult = await generateCreditProof({ score: score.toString(), threshold: threshold.toString() });
    const proof = proofResult.proof;
    const publicSignals = proofResult.publicSignals.map(String);
    // Initialize session
    const session = await zkVerifySession.start()
      .Volta()
      .withAccount(process.env.ZKVERIFY_SEED_PHRASE || 'test seed phrase');
    console.log('✅ Sessão criada com sucesso!');
    const account = session.getAccount();
    console.log('👤 Endereço:', account?.address || 'N/A');
    // Submete prova diretamente
    console.log('🚀 Submetendo prova para ZKVerify...');
    const { events, transactionResult } = await session
      .verify()
      .groth16({ library: Library.snarkjs, curve: CurveType.bn128 })
      .execute({
        proofData: {
          vk: formattedVkey,
          proof,
          publicSignals
        },
        domainId: 1
      });
    events.on('includedInBlock', (e) => console.log('📦 Prova incluída no bloco:', e));
    events.on('finalized', (e) => console.log('✅ Prova finalizada:', e));
    events.on('error', (e) => console.error('❌ Erro na prova:', e));
    const verification = await transactionResult;
    console.log('✅ Verification result:', verification);
    console.log('🎉 Prova submetida com sucesso na ZKVerify!');
    console.log('🆔 Teste concluído com ID:', testId);
  } catch (error) {
    console.error('❌ Erro no teste ZKVerify:', error);
  }
}

main(); 