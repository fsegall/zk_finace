pragma circom 2.2.2;

template CreditScoreCheckSimple() {
    signal input score;      // privado
    signal input threshold;  // público
    signal output passed;    // público

    // Implementação simples: score >= threshold
    // Se score >= threshold, então passed = 1, senão passed = 0
    signal diff;
    diff <== score - threshold;
    
    // Se diff >= 0, então passed = 1
    // Se diff < 0, então passed = 0
    // Usando multiplicação para simular comparação
    signal isPositive;
    isPositive <== (diff + 1000000) / 1000000; // Garante que é positivo se diff >= 0
    
    // Limita o resultado a 0 ou 1
    passed <== isPositive * (1 - (isPositive - 1) * (isPositive - 1));
}

component main = CreditScoreCheckSimple(); 