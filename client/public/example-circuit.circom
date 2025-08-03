pragma circom 2.2.2;

include "comparators.circom";

template CreditScoreCheck() {
    signal input score;      // private
    signal input threshold;  // public
    signal output passed;    // public

    component isGreaterEq = GreaterEqThan(16);
    isGreaterEq.in[0] <== score;
    isGreaterEq.in[1] <== threshold;
    passed <== isGreaterEq.out;
}

component main = CreditScoreCheck(); 