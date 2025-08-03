pragma circom 2.1.4;

template ExampleCircuit() {
    signal input a;
    signal output b;
    
    b <== a;
}

component main { public [b] } = ExampleCircuit();