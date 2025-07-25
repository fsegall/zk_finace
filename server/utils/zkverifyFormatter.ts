/**
 * Formata verification key para o formato esperado pelo ZKVerify
 * Remove campos extras e garante formato correto dos arrays
 */
export function formatVerificationKeyForZKVerify(vkey: any): any {
  console.log('🔧 Formatando verification key para ZKVerify...');
  
  // Garantir que vkey é um objeto válido
  if (!vkey || typeof vkey !== 'object') {
    console.error('❌ Verification key inválida:', vkey);
    throw new Error('Verification key inválida');
  }
  
  // Verificar se tem as propriedades necessárias
  const requiredProps = ['protocol', 'curve', 'nPublic', 'vk_alpha_1', 'vk_beta_2', 'vk_gamma_2', 'vk_delta_2', 'vk_alphabeta_12', 'IC'];
  const missingProps = requiredProps.filter(prop => !(prop in vkey));
  
  if (missingProps.length > 0) {
    console.error('❌ Verification key faltando propriedades:', missingProps);
    throw new Error(`Verification key faltando propriedades: ${missingProps.join(', ')}`);
  }
  
  // Mapear apenas os campos esperados pelo zkverifyjs
  const formatted = {
    protocol: String(vkey.protocol),
    curve: String(vkey.curve),
    nPublic: Number(vkey.nPublic),
    vk_alpha_1: Array.isArray(vkey.vk_alpha_1) ? vkey.vk_alpha_1.slice(0, 2).map(String) : vkey.vk_alpha_1,
    vk_beta_2: Array.isArray(vkey.vk_beta_2) ? vkey.vk_beta_2.map((pair: any[]) => pair.slice(0, 2).map(String)) : vkey.vk_beta_2,
    vk_gamma_2: Array.isArray(vkey.vk_gamma_2) ? vkey.vk_gamma_2.map((pair: any[]) => pair.slice(0, 2).map(String)) : vkey.vk_gamma_2,
    vk_delta_2: Array.isArray(vkey.vk_delta_2) ? vkey.vk_delta_2.map((pair: any[]) => pair.slice(0, 2).map(String)) : vkey.vk_delta_2,
    vk_alphabeta_12: Array.isArray(vkey.vk_alphabeta_12)
      ? vkey.vk_alphabeta_12.map((row: any[][]) =>
          row.map((pair: any[]) => pair.slice(0, 2).map(String))
        )
      : vkey.vk_alphabeta_12,
    IC: Array.isArray(vkey.IC) ? vkey.IC.map((point: any[]) => point.map(String)) : vkey.IC
  };

  // Validação de tamanho de alpha_1
  console.assert(formatted.vk_alpha_1.length === 2, 'vk_alpha_1 deve conter exatamente 2 elementos');

  console.log('✅ Verification key formatada com sucesso');
  console.log('🔍 VK Formatada - Type:', typeof formatted);
  console.log('🔍 VK Formatada - Keys:', Object.keys(formatted));
  console.log('🔍 VK Alpha1 (2 elementos):', formatted.vk_alpha_1);
  console.log('🔍 IC (primeiros 2 elementos):', formatted.IC.slice(0, 2));
  
  return formatted;
}
