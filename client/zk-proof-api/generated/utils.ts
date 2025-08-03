/**
 * Utility functions for ZK proof generation
 */

/**
 * Convert Base64 string to Uint8Array
 */
export function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Detect the most recent circuit based on file modification times
 * This function checks which circuit files exist and returns the most recent one
 */
export async function detectMostRecentCircuit(): Promise<string> {
  const circuits = ['credit_score', 'example_circuit'];
  
  for (const circuit of circuits) {
    try {
      // Try to load the circuit files
      await import(`./${circuit}-wasm-base64.txt?raw`);
      await import(`./${circuit}-zkey-base64.txt?raw`);
      await import(`./${circuit}-vkey-base64.txt?raw`);
      
      console.log(`✅ Found circuit: ${circuit}`);
      return circuit;
    } catch (error) {
      console.log(`❌ Circuit ${circuit} not found, trying next...`);
      continue;
    }
  }
  
  // If no circuits found, throw error
  throw new Error('No valid circuits found in generated directory');
}

/**
 * Get available circuits in the generated directory
 */
export async function getAvailableCircuits(): Promise<string[]> {
  const circuits = ['credit_score', 'example_circuit'];
  const available: string[] = [];
  
  for (const circuit of circuits) {
    try {
      await import(`./${circuit}-wasm-base64.txt?raw`);
      await import(`./${circuit}-zkey-base64.txt?raw`);
      await import(`./${circuit}-vkey-base64.txt?raw`);
      available.push(circuit);
    } catch {
      // Circuit not available, skip
    }
  }
  
  return available;
} 