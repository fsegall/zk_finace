/**
 * Teste simples para verificar se a correção Base64 funcionou
 */

import { base64ToUint8Array } from './generated/utils';

async function testBase64Conversion() {
  try {
    console.log('🧪 Testando conversão Base64...');
    
    // Importar um arquivo Base64
    const wasmBase64 = await import('./generated/example_circuit-wasm-base64.txt?raw');
    console.log('✅ Arquivo Base64 importado com sucesso');
    console.log('📏 Tamanho do Base64:', wasmBase64.default.length);
    
    // Converter para Uint8Array
    const wasmBuffer = base64ToUint8Array(wasmBase64.default);
    console.log('✅ Conversão para Uint8Array bem-sucedida');
    console.log('📏 Tamanho do buffer:', wasmBuffer.length);
    
    console.log('🎉 Teste Base64 concluído com sucesso!');
    return true;
    
  } catch (error) {
    console.error('❌ Erro no teste Base64:', error);
    return false;
  }
}

// Executar teste
testBase64Conversion().then(success => {
  if (success) {
    console.log('✅ CORREÇÃO BASE64 FUNCIONOU!');
  } else {
    console.log('❌ CORREÇÃO BASE64 FALHOU!');
  }
}); 