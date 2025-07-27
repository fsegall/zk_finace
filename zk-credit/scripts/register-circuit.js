import 'dotenv/config';
import { zkVerifySession, Library, CurveType } from 'zkverifyjs';
import fs from 'fs';
import path from 'path';
import { formatVerificationKeyForZKVerify } from '../../server/utils/zkverifyFormatter.ts';

async function main() {
  try {
    console.log('🔍 Registrando verification key (circuito) na ZKVerify...');
    // Carrega verification key
    const buildPath = path.join(process.cwd(), 'zk-credit', 'build');
    const vkeyPath = path.join(buildPath, 'verification_key.json');
    const vkey = JSON.parse(fs.readFileSync(vkeyPath, 'utf-8'));
    const formattedVkey = formatVerificationKeyForZKVerify(vkey);

    // Initialize session
    const session = await zkVerifySession.start()
      .Volta()
      .withAccount(process.env.ZKVERIFY_SEED_PHRASE || 'test seed phrase');
    console.log('✅ Sessão criada com sucesso!');
    const account = session.getAccount();
    console.log('👤 Endereço:', account?.address || 'N/A');

    // Registra verification key
    console.log('🔐 Registrando verification key...');
    const { events: vkEvents, transactionResult: vkTx } = await session
      .registerVerificationKey()
      .groth16({ library: Library.snarkjs, curve: CurveType.bn128 })
      .execute(formattedVkey);

    vkEvents.on('includedInBlock', (e) => console.log('📦 VK incluída no bloco:', e));
    vkEvents.on('finalized', (e) => console.log('✅ VK finalizada:', e));
    vkEvents.on('error', (e) => console.error('❌ VK erro:', e));

    await vkTx;
    console.log('✅ Verification key registrada com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao registrar VK:', error);
  }
}

main(); 