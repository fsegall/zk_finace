#!/bin/bash
mkdir -p build

# Copiar ptau 12 se ainda não existir
if [ ! -f build/powersOfTau28_hez_final_12.ptau ]; then
  cp powersOfTau28_hez_final_12.ptau build/powersOfTau28_hez_final_12.ptau
fi

# Compilar circuito
circom circuits/credit_score.circom --r1cs --wasm --sym -l node_modules/circomlib/circuits -o build

# Setup da prova
snarkjs groth16 setup build/credit_score.r1cs build/powersOfTau28_hez_final_12.ptau build/credit_score.zkey
snarkjs zkey export verificationkey build/credit_score.zkey build/verification_key.json
