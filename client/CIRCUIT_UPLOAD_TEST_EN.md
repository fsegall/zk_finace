# Circuit Upload Test Page

## Overview

The Circuit Upload Test page provides a user-friendly interface for testing the circuit build API without requiring command-line tools. This makes it easy for evaluators and developers to test circuit compilation and artifact generation.

## Features

### 🎯 **Easy File Upload**
- Drag & drop `.circom` files directly into the interface
- File picker for selecting circuit files
- Automatic circuit name detection from filename

### 📝 **Direct Code Input**
- Paste circuit code directly into a text area
- Syntax highlighting for better readability
- Real-time validation

### 🔧 **Build Configuration**
- Customizable circuit name
- Version control for circuit iterations
- Real-time build status feedback

### 📦 **Artifact Management**
- Automatic download of generated artifacts (WASM, ZKEY, VKEY)
- Base64 encoded files for easy integration
- Build metadata and timing information

## How to Use

### 1. Access the Page
Navigate to `http://localhost:8080/circuit-upload-test` or click the "📁 Circuit Upload Test" button on the login page.

### 2. Upload a Circuit
**Option A: File Upload**
- Drag and drop a `.circom` file onto the upload area
- Or click "Choose File" to select a file from your system

**Option B: Direct Input**
- Paste your circuit code directly into the text area
- Fill in the circuit name and version manually

### 3. Configure Build
- **Circuit Name**: Enter a descriptive name for your circuit
- **Version**: Specify the version (default: 1.0.0)

### 4. Build the Circuit
- Click "Build Circuit" to start the compilation process
- Monitor the build progress in real-time
- View build results and timing information

### 5. Download Artifacts
After successful build:
- **Download WASM**: WebAssembly binary for circuit execution
- **Download ZKEY**: Proving key for ZK proof generation
- **Download VKEY**: Verification key for proof verification

## Example Circuit

The page includes a built-in example circuit for testing:

```circom
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
```

Click "Load Example" to automatically populate the form with this circuit.

## API Integration

The page communicates with the circuit build API at `http://localhost:3000/api/circuit/build`:

```typescript
POST /api/circuit/build
{
  "circuit": "pragma circom 2.2.2; ...",
  "circuitName": "credit_score",
  "version": "1.0.0"
}
```

## Technical Details

### Build Process
1. **Circuit Validation**: Syntax and structure validation
2. **Compilation**: Real circom compilation with dependencies
3. **Key Generation**: Groth16 proving and verification key generation
4. **Artifact Conversion**: Base64 encoding for web compatibility
5. **File Generation**: Automatic saving to `client/zk-proof-api/generated/`

### Supported Features
- ✅ Real circom compilation (not simulation)
- ✅ Dependency resolution (circomlib)
- ✅ Groth16 proving scheme
- ✅ Base64 artifact encoding
- ✅ Automatic file management
- ✅ Error handling and validation

### File Structure
```
client/zk-proof-api/generated/
├── {circuitName}-wasm-base64.txt
├── {circuitName}-zkey-base64.txt
└── {circuitName}-vkey-base64.txt
```

## Error Handling

The interface provides clear error messages for common issues:
- **Missing circuit content**: "Please provide circuit content and name"
- **API connection errors**: Network and server communication issues
- **Compilation errors**: Syntax and dependency problems
- **File upload errors**: Invalid file types or corrupted files

## Integration with ZK System

Generated artifacts can be used with:
- **New ZK System Test**: `/new-zk-system-test`
- **Client-side ZK proofs**: Direct integration with zkverifyjs
- **Blockchain submission**: ZKVerify testnet integration

## Benefits for Evaluators

1. **No Command Line Required**: Pure web interface
2. **Visual Feedback**: Real-time build status and progress
3. **Easy Testing**: Built-in examples and validation
4. **Artifact Management**: Automatic download and organization
5. **Error Diagnostics**: Clear error messages and suggestions

## Future Enhancements

- [ ] Circuit validation preview
- [ ] Multiple circuit compilation
- [ ] Build history and versioning
- [ ] Integration with ZK proof testing
- [ ] Advanced circuit templates
- [ ] Performance metrics and optimization suggestions 