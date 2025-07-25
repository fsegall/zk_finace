/**
 * Formats verification key to the format expected by ZKVerify
 * Removes extra fields and ensures correct array formats
 */
export function formatVerificationKeyForZKVerify(vkey: any): any {
  console.log('🔧 Formatting verification key for ZKVerify...');
  
  // Ensure vkey is a valid object
  if (!vkey || typeof vkey !== 'object') {
    console.error('❌ Invalid verification key:', vkey);
    throw new Error('Invalid verification key');
  }
  
  // Check if it has the required properties
  const requiredProps = ['protocol', 'curve', 'nPublic', 'vk_alpha_1', 'vk_beta_2', 'vk_gamma_2', 'vk_delta_2', 'vk_alphabeta_12', 'IC'];
  const missingProps = requiredProps.filter(prop => !(prop in vkey));
  
  if (missingProps.length > 0) {
    console.error('❌ Verification key missing properties:', missingProps);
    throw new Error(`Verification key missing properties: ${missingProps.join(', ')}`);
  }
  
  // Map only the fields expected by zkverifyjs
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

  // alpha_1 length validation
  console.assert(formatted.vk_alpha_1.length === 2, 'vk_alpha_1 must contain exactly 2 elements');

  console.log('✅ Verification key formatted successfully');
  console.log('🔍 Formatted VK - Type:', typeof formatted);
  console.log('🔍 Formatted VK - Keys:', Object.keys(formatted));
  console.log('🔍 VK Alpha1 (2 elements):', formatted.vk_alpha_1);
  console.log('🔍 IC (first 2 elements):', formatted.IC.slice(0, 2));
  
  return formatted;
}
