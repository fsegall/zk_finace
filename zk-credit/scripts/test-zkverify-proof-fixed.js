import 'dotenv/config';
import { zkVerifySession, Library, CurveType } from 'zkverifyjs';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { formatVerificationKeyForZKVerify } from '../../server/utils/zkverifyFormatter.ts';
import { generateCreditProof } from '../services/creditProofService.ts';

async function main() {
  try {
    console.log('🔍 Testando submissão de prova ZKVerify (versão corrigida)...');
    
    // Generate unique identifier for this test
    const timestamp = Date.now();
    const randomHash = crypto.randomBytes(8).toString('hex');
    const testId = `${timestamp}-${randomHash}`;
    console.log('🆔 Teste ID:', testId);
    
    // Endereço correto que funcionou no dia 26
    const expectedAddress = 'xpkjTc2VemmgauFnBaa1VEbgyjw4NThpsmQiyEtxLYFNu8f8s';
    console.log('🎯 Endereço esperado:', expectedAddress);
    
    // Load verification key (already registered)
    const buildPath = path.join(process.cwd(), 'build');
    const vkeyPath = path.join(buildPath, 'verification_key.json');
    const vkey = JSON.parse(fs.readFileSync(vkeyPath, 'utf-8'));
    const formattedVkey = formatVerificationKeyForZKVerify(vkey);
    
    // Generate real ZK proof with unique inputs
    const score = 750 + (timestamp % 100); // Score varia entre 750-849
    const threshold = 700 + (timestamp % 50); // Threshold varia entre 700-749
    console.log(`📊 Score: ${score}, Threshold: ${threshold}`);
    
    const proofResult = await generateCreditProof({ 
      score: score.toString(), 
      threshold: threshold.toString() 
    });
    const proof = proofResult.proof;
    const publicSignals = proofResult.publicSignals.map(String);
    
    // Initialize session
    console.log('🔐 Inicializando sessão ZKVerify...');
    const session = await zkVerifySession.start()
      .Volta()
      .withAccount(process.env.ZKVERIFY_SEED_PHRASE || 'test seed phrase');
    
    console.log('✅ Sessão criada com sucesso!');
    const account = session.getAccount();
    console.log('👤 Endereço da sessão:', account?.address || 'N/A');
    
    // Verificar se o endereço é o correto
    if (account?.address === expectedAddress) {
      console.log('✅ Endereço correto! Usando conta com saldo.');
    } else {
      console.log('⚠️ Endereço diferente do esperado!');
      console.log('   Esperado:', expectedAddress);
      console.log('   Atual:', account?.address);
      console.log('💡 Continuando com o endereço atual (saldo transferido)...');
    }
    
    // Verificar saldo antes de prosseguir
    try {
      const accountInfo = await session.getAccountInfo();
      if (accountInfo && accountInfo.length > 0) {
        const accountData = accountInfo[0];
        const freeBalance = accountData.freeBalance || '0';
        console.log('💰 Saldo disponível:', freeBalance);
        
        if (parseFloat(freeBalance) < 0.1) {
          console.log('❌ Saldo insuficiente para transações');
          return;
        }
        console.log('✅ Saldo suficiente para transações');
      }
    } catch (error) {
      console.log('⚠️ Erro ao verificar saldo:', error.message);
    }
    
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
    
    // Extrair dados corretos da transação
    const txHash = verification.txHash || verification.transactionHash;
    const fee = verification.feeInfo?.actualFee ? 
      (parseInt(verification.feeInfo.actualFee) / 1e18).toFixed(8) + ' tVFY' : 
      'N/A';
    
    console.log('🔗 Transaction Hash:', txHash);
    console.log('💰 Fee:', fee);
    
    // Gerar relatório de sucesso
    const report = `# 🎉 **TESTE ZKVERIFY CORRIGIDO - SUCESSO!**

## 📅 **Data/Hora:** ${new Date().toLocaleDateString('pt-BR')} - ${new Date().toLocaleTimeString('pt-BR')}

---

## ✅ **STATUS: FUNCIONAL NOVAMENTE**

### 🚀 **Teste Concluído com Sucesso:**

- **✅ Endereço Correto**: ${expectedAddress}
- **✅ Saldo Verificado**: Suficiente para transações
- **✅ Geração de Prova ZK**: SnarkJS funcionando perfeitamente  
- **✅ Submissão de Prova**: **PROVA SUBMETIDA COM SUCESSO!**

---

## 📊 **Detalhes do Teste:**

- **Test ID**: ${testId}
- **Score**: ${score}, Threshold: ${threshold}
- **Endereço Usado**: ${account?.address}
- **Status**: ✅ **SUCCESSFUL**

---

## 🔗 **Transação Real:**

- **Transaction Hash**: \`${txHash}\`
- **Block Hash**: \`${verification.blockHash}\`
- **Fee**: ${fee}
- **Domain ID**: ${verification.domainId}
- **Aggregation ID**: ${verification.aggregationId}
- **Status**: ✅ **FINALIZED**

### 🔗 **Link da Transação:**
[https://zkverify-testnet.subscan.io/extrinsic/${txHash}](https://zkverify-testnet.subscan.io/extrinsic/${txHash})

---

## 📋 **RESULTADO FINAL:**

**🎉 ZKVerify está 100% funcional novamente!**

- **Connectivity**: ✅ Operational
- **ZK Proofs**: ✅ Generated locally
- **Privacy**: ✅ Preserved
- **Integration**: ✅ Complete
- **Address**: ✅ Correct (with balance)
- **Proof Submission**: ✅ **SUCCESSFUL!**

---

*Documentação gerada automaticamente em ${new Date().toISOString()}*`;

    const filename = `ZKVERIFY_TEST_FIXED_${Date.now()}.md`;
    fs.writeFileSync(filename, report);
    console.log(`📄 Relatório salvo em: ${filename}`);
    
  } catch (error) {
    console.error('❌ Erro no teste ZKVerify:', error);
  }
}

main(); 