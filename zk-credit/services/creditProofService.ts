import * as snarkjs from 'snarkjs';
import fs from 'fs';
import path from 'path';

export async function generateCreditProof(input: { score: string; threshold: string }) {
  const base = path.join(process.cwd(), 'build');
  const wasm = path.join(base, 'credit_score_js', 'credit_score.wasm');
  const zkey = path.join(base, 'credit_score.zkey');
  const vkey = JSON.parse(fs.readFileSync(path.join(base, 'verification_key.json'), 'utf-8'));

  const { proof, publicSignals } = await snarkjs.groth16.fullProve(input, wasm, zkey);

  return { proof, publicSignals, vkey };
}
