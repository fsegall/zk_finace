import express from 'express';
import cors from "cors";

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

console.log('🔧 Loading environment variables...');

const app = express();

// Configurar CORS
app.use(cors());
app.use(express.json());

// Circuit build endpoint (simplified for testing)
app.post('/api/circuit/build', async (req, res) => {
  try {
    console.log('=== CIRCUIT BUILD REQUEST RECEIVED ===');
    console.log('Body keys:', Object.keys(req.body));
    
    const { circuit, circuitName, version } = req.body;

    // Validate required fields
    if (!circuit || typeof circuit !== 'string') {
      return res.status(400).json({
        error: 'Invalid circuit content',
        message: 'Circuit content must be a non-empty string'
      });
    }

    if (!circuitName || typeof circuitName !== 'string') {
      return res.status(400).json({
        error: 'Invalid circuit name',
        message: 'Circuit name must be a non-empty string'
      });
    }

    console.log('Processing circuit build for:', circuitName);
    console.log('Circuit size:', circuit.length, 'characters');

    // Simulate build process (for now)
    const buildId = Math.random().toString(36).substring(2, 15);
    const processingTime = Math.floor(Math.random() * 1000) + 500; // 500-1500ms

    // Simulate success response
    res.status(200).json({
      success: true,
      buildId,
      circuitName,
      version: version || '1.0.0',
      artifacts: {
        wasmBase64: 'd2FzbV9iYXNlNjRfc2ltdWxhdGVk', // simulated
        zkeyBase64: 'emtleV9iYXNlNjRfc2ltdWxhdGVk', // simulated
        vkeyBase64: 'dmtleV9iYXNlNjRfc2ltdWxhdGVk'  // simulated
      },
      metadata: {
        requestId: Math.random().toString(36).substring(2, 15),
        processingTime,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error in circuit build:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to process circuit build',
      timestamp: new Date().toISOString()
    });
  }
});

// Health check endpoint
app.get('/api/circuit/build/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'circuit-build',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    features: [
      'circom-compilation',
      'snarkjs-integration',
      'base64-conversion',
      'circuit-validation'
    ]
  });
});

// Stats endpoint
app.get('/api/circuit/build/stats', (req, res) => {
  res.status(200).json({
    stats: {
      totalBuilds: 0,
      successfulBuilds: 0,
      failedBuilds: 0,
      averageProcessingTime: 0
    },
    timestamp: new Date().toISOString()
  });
});

// Validation endpoint
app.post('/api/circuit/validate', async (req, res) => {
  try {
    console.log('=== CIRCUIT VALIDATION REQUEST ===');
    
    const { circuit } = req.body;

    if (!circuit || typeof circuit !== 'string') {
      return res.status(400).json({
        error: 'Invalid circuit content',
        message: 'Circuit content must be a non-empty string'
      });
    }

    // Simple validation
    const errors = [];
    const warnings = [];

    if (!circuit.includes('template')) {
      errors.push('Circuit must contain a template definition');
    }

    if (!circuit.includes('signal')) {
      errors.push('Circuit must contain signal declarations');
    }

    if (!circuit.includes('<==') && !circuit.includes('==>')) {
      warnings.push('No signal assignments found (using <== or ==>)');
    }

    const validation = {
      isValid: errors.length === 0,
      errors,
      warnings
    };

    console.log('Validation result:', validation);

    res.status(200).json({
      success: true,
      validation,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in circuit validation:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to validate circuit',
      timestamp: new Date().toISOString()
    });
  }
});

// General health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'zkfinance-circuit-build-backend',
    version: '1.0.0',
    features: [
      'circuit-build-service',
      'circuit-validation',
      'base64-conversion'
    ]
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log('📊 Available endpoints:');
  console.log('- POST /api/circuit/build (CIRCUIT BUILD + BASE64)');
  console.log('- GET /api/circuit/build/health');
  console.log('- GET /api/circuit/build/stats');
  console.log('- POST /api/circuit/validate (CIRCUIT VALIDATION)');
  console.log('- GET /health');
  console.log('');
  console.log('🔧 Circuit build service for automated ZK artifact generation');
  console.log('⚠️  Currently running in simulation mode');
}); 