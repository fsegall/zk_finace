import { Router, Request, Response } from 'express';
import { circuitBuildService, CircuitBuildRequest } from '../services/circuit-build.js';

const router = Router();

/**
 * POST /api/circuit/build
 * Build ZK circuit from source and return base64 artifacts
 */
router.post('/circuit/build', async (req: Request, res: Response) => {
  try {
    console.log('=== CIRCUIT BUILD REQUEST RECEIVED ===');
    console.log('Headers:', req.headers);
    console.log('Body keys:', Object.keys(req.body));
    
    // Extract circuit data from body
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

    // Validate circuit name format (alphanumeric and underscore only)
    if (!/^[a-zA-Z0-9_]+$/.test(circuitName)) {
      return res.status(400).json({
        error: 'Invalid circuit name format',
        message: 'Circuit name must contain only letters, numbers, and underscores'
      });
    }

    // Generate request ID
    const requestId = req.headers['x-request-id'] as string || 
                     Math.random().toString(36).substring(2, 15) + 
                     Math.random().toString(36).substring(2, 15);

    console.log('Processing circuit build for request ID:', requestId);
    console.log('Circuit name:', circuitName);
    console.log('Circuit size:', circuit.length, 'characters');

    // Prepare build request
    const buildRequest: CircuitBuildRequest = {
      circuit: circuit.trim(),
      circuitName,
      version: version || '1.0.0'
    };

    // Execute circuit build
    const buildResult = await circuitBuildService.buildCircuit(buildRequest);

    console.log('=== CIRCUIT BUILD RESULT ===');
    console.log('Request ID:', requestId);
    console.log('Build ID:', buildResult.buildId);
    console.log('Success:', buildResult.success);
    console.log('Processing Time (ms):', buildResult.processingTime);
    
    if (buildResult.success) {
      console.log('Artifacts generated: WASM, ZKEY, VKEY');
    } else {
      console.log('Error:', buildResult.error);
    }
    console.log('=====================================\n');

    // Return result
    if (buildResult.success) {
      res.status(200).json({
        success: true,
        buildId: buildResult.buildId,
        circuitName,
        version: buildRequest.version,
        artifacts: {
          wasmBase64: buildResult.wasmBase64,
          zkeyBase64: buildResult.zkeyBase64,
          vkeyBase64: buildResult.vkeyBase64
        },
        metadata: {
          requestId,
          processingTime: buildResult.processingTime,
          timestamp: new Date().toISOString()
        }
      });
    } else {
      res.status(400).json({
        success: false,
        error: buildResult.error,
        buildId: buildResult.buildId,
        requestId,
        processingTime: buildResult.processingTime,
        timestamp: new Date().toISOString()
      });
    }

  } catch (error) {
    console.error('Error in circuit build:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to process circuit build',
      requestId: req.headers['x-request-id'] || 'unknown',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/circuit/build/health
 * Health check for the circuit build service
 */
router.get('/circuit/build/health', (req: Request, res: Response) => {
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

/**
 * GET /api/circuit/build/stats
 * Get build statistics
 */
router.get('/circuit/build/stats', async (req: Request, res: Response) => {
  try {
    const stats = await circuitBuildService.getBuildStats();
    res.status(200).json({
      stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting build stats:', error);
    res.status(500).json({
      error: 'Failed to retrieve build statistics',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * POST /api/circuit/validate
 * Validate circuit format without building
 */
router.post('/circuit/validate', async (req: Request, res: Response) => {
  try {
    console.log('=== CIRCUIT VALIDATION REQUEST ===');
    
    const { circuit } = req.body;

    if (!circuit || typeof circuit !== 'string') {
      return res.status(400).json({
        error: 'Invalid circuit content',
        message: 'Circuit content must be a non-empty string'
      });
    }

    // Create a temporary service instance for validation
    const { CircuitBuildService } = await import('../services/circuit-build.js');
    const tempService = new CircuitBuildService();
    
    // Use private method through reflection (for validation only)
    const validation = (tempService as any).validateCircuit(circuit);

    console.log('Validation result:', validation);
    console.log('=====================================\n');

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

export default router; 