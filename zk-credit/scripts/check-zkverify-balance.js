import 'dotenv/config';
import { zkVerifySession } from 'zkverifyjs';

async function checkZKVerifyBalance() {
  try {
    console.log('💰 Verificando saldo da conta ZKVerify...');
    
    // ZKVerify account address (derived by script)
    const zkverifyAddress = 'xpkjTc2VemmgauFnBaa1VEbgyjw4NThpsmQiyEtxLYFNu8f8s';
    console.log('👤 Endereço ZKVerify:', zkverifyAddress);
    
    // Initialize session
    const session = await zkVerifySession.start()
      .Volta()
      .withAccount(process.env.ZKVERIFY_SEED_PHRASE || 'test seed phrase');
    
    console.log('✅ Sessão criada com sucesso!');
    const account = session.getAccount();
    console.log('👤 Endereço da sessão:', account?.address || 'N/A');
    
    // Check if session address matches expected
    if (account?.address === zkverifyAddress) {
      console.log('✅ Endereço da sessão corresponde ao esperado!');
    } else {
      console.log('⚠️ Endereço da sessão diferente do esperado');
      console.log('   Esperado:', zkverifyAddress);
      console.log('   Atual:', account?.address);
    }
    
    // Try to get account information
    try {
      const accountInfo = await session.getAccountInfo();
      console.log('📊 Informações da conta:', accountInfo);
      
      if (accountInfo && accountInfo.length > 0) {
        const accountData = accountInfo[0];
        console.log('💰 Saldo livre:', accountData.freeBalance || '0');
        console.log('💰 Saldo reservado:', accountData.reservedBalance || '0');
        console.log('🔢 Nonce:', accountData.nonce || '0');
        
        const freeBalance = accountData.freeBalance || '0';
        if (freeBalance > 0) {
          console.log('✅ Conta tem saldo! Pronto para transações.');
        } else {
          console.log('❌ Conta sem saldo. Precisa transferir tVFY.');
        }
      } else {
        console.log('ℹ️ Conta não encontrada ou sem dados.');
      }
      
    } catch (error) {
      console.log('ℹ️ Erro ao obter informações da conta:', error.message);
    }
    
    console.log('🎉 Verificação de saldo concluída!');
    
  } catch (error) {
    console.error('❌ Erro ao verificar saldo:', error);
  }
}

checkZKVerifyBalance(); 