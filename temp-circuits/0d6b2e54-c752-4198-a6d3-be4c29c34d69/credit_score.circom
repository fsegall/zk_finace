pragma circom 2.1.4;

include "node_modules/circomlib/circuits/comparators.circom";

template CreditScore() {
    signal input score;
    signal input threshold;
    signal output isValid;
    
    component gte = GreaterEqualThan(32);
    gte.in[0] <== score;
    gte.in[1] <== threshold;
    
    isValid <== gte.out;
}

component main { public [isValid] } = CreditScore();