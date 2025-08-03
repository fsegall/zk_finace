# Circuit Build API - Documentation

## 🎯 **Overview**

The Circuit Build API is a **new independent feature** that allows building ZK circuits on the server and converting them to Base64 format for client-side use. This functionality is completely separate from the existing MVP ZK proof system.

## 📁 **File Structure**

```
client/zk-proof-api/
├── services/
│   └── circuitBuildService.ts       # Client service for API calls
├── components/
│   └── CircuitBuildDemo.tsx         # Demo component
├── generated/
│   └── example-usage.ts             # Example integration
└── README.md                        # Module documentation

server/services/circuit-build.ts     # Server-side build logic
server/routes/circuit-build.ts       # API routes
```

## 🚀 **API Endpoints**

### **POST** `/api/circuit/build`
Build a circuit and return Base64 artifacts.

**Request:**
```json
{
  "circuit": "pragma circom 2.1.4; template Example() { signal input a; signal output b; b <== a; } component main = Example();",
  "circuitName": "example_circuit",
  "version": "1.0.0"
}
```

**Response:**
```json
{
  "success": true,
  "buildId": "fa1a388e-fcb0-4242-8bc7-919e426e63fa",
  "circuitName": "example_circuit",
  "version": "1.0.0",
  "artifacts": {
    "wasmBase64": "d2FzbV9iYXNlNjRfc2ltdWxhdGVk",
    "zkeyBase64": "emtleV9iYXNlNjRfc2ltdWxhdGVk",
    "vkeyBase64": "dmtleV9iYXNlNjRfc2ltdWxhdGVk"
  },
  "metadata": {
    "requestId": "i0rbxq855q9g1db24k89hu",
    "processingTime": 506,
    "timestamp": "2025-08-03T12:58:56.131Z"
  }
}
```

### **POST** `/api/circuit/validate`
Validate circuit format without building.

### **GET** `/api/circuit/build/health`
Health check endpoint.

### **GET** `/api/circuit/build/stats`
Get build statistics.

## 🔧 **Current Status**

### ✅ **Implemented:**
- API endpoints structure
- Simulation mode (returns mock artifacts)
- Client-side service integration
- Demo component with UI
- Independent file structure
- Health checks and validation

### ⚠️ **Simulation Mode:**
Currently running in simulation mode:
- No real circom compilation
- Returns mock Base64 artifacts
- Safe for testing and development

### 🎯 **Next Steps:**
- [ ] Implement real circom compilation
- [ ] Add circuit caching
- [ ] Implement versioning system
- [ ] Add security validations

## 🔄 **Integration Flow**

### **1. Circuit Build Process:**
```
User Input → CircuitBuildDemo → circuitBuildService → API Server → Base64 Artifacts
```

### **2. Artifact Usage:**
```
Base64 Artifacts → Decode → Uint8Array → SnarkJS → ZK Proof Generation
```

### **3. Integration with Existing System:**
```
API Artifacts → APIZKService → Compatible with existing ZK proof system
```

## 🧪 **Testing**

### **API Testing:**
```bash
# Health check
curl -X GET http://localhost:3000/api/circuit/build/health

# Build circuit
curl -X POST http://localhost:3000/api/circuit/build \
  -H "Content-Type: application/json" \
  -d '{"circuit": "pragma circom 2.1.4; template Example() { signal input a; signal output b; b <== a; } component main = Example();", "circuitName": "test_circuit", "version": "1.0.0"}'
```

### **Client Testing:**
1. Start server: `npm run server:start`
2. Start client: `npm run dev`
3. Navigate to: `/circuit-build-test`
4. Test circuit build functionality

## 🔒 **Security Considerations**

- **Input Validation**: All circuit inputs are validated
- **Simulation Mode**: Safe testing without real compilation
- **Independent System**: No interference with existing MVP
- **Error Handling**: Comprehensive error responses

## 📊 **Performance**

- **Simulation Mode**: ~500ms response time
- **Real Build**: Expected 2-10 seconds (when implemented)
- **Caching**: Planned for future optimization

## 🎯 **Use Cases**

1. **Development**: Test new circuit designs
2. **Integration**: Generate artifacts for client-side ZK proofs
3. **Education**: Learn circuit building process
4. **Prototyping**: Quick circuit validation

## 🔗 **Related Documentation**

- [ZK Proof MVP](./client/zk-proof/README.md)
- [Server API](./server/README.md)
- [Project Overview](./README.md)

---

**Note**: This API is designed to be independent and non-intrusive. The existing MVP ZK proof system continues to work normally without any interference. 