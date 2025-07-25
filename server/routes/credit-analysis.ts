import { Router, Request, Response } from 'express';
import { analyzeCredit, CreditData } from '../services/credit-score.js';

const router = Router();

/**
 * POST /api/credit-analysis
 * Credit analysis endpoint
 * Replaces the n8n webhook with local processing
 */
router.post('/credit-analysis', async (req: Request, res: Response) => {
  try {
    console.log('=== CREDIT ANALYSIS REQUEST RECEIVED ===');
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    
    // Extract user data from body
    const userData: CreditData = {
      income: req.body.income || 0,
      employment_years: req.body.employment_years || 0,
      has_property: req.body.has_property || false,
      has_debt: req.body.has_debt || false,
      payment_defaults: req.body.payment_defaults || 0
    };

    // Validate required data
    if (userData.income <= 0) {
      return res.status(400).json({
        error: 'Invalid income value',
        message: 'Income must be greater than 0'
      });
    }

    // Generate request ID (can come from header or be generated)
    const requestId = req.headers['x-request-id'] as string || 
                     Math.random().toString(36).substring(2, 15) + 
                     Math.random().toString(36).substring(2, 15);

    console.log('Processing credit analysis for request ID:', requestId);
    console.log('User data:', userData);

    // Execute credit analysis (now asynchronous)
    const analysisResult = await analyzeCredit(userData, requestId);

    console.log('=== CREDIT ANALYSIS RESULT ===');
    console.log('Request ID:', analysisResult.requestId);
    console.log('Score:', analysisResult.analysis.score);
    console.log('Category:', analysisResult.analysis.category);
    console.log('Passed:', analysisResult.analysis.passed);
    console.log('Processing Time (ms):', analysisResult.technical.processingTime);
    console.log('=====================================\n');

    // Return result
    res.status(200).json(analysisResult);

  } catch (error) {
    console.error('Error in credit analysis:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to process credit analysis',
      requestId: req.headers['x-request-id'] || 'unknown'
    });
  }
});

/**
 * GET /api/credit-analysis/health
 * Specific health check for the credit analysis service
 */
router.get('/credit-analysis/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'credit-analysis',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    algorithm: 'zkfinance-credit-v1'
  });
});

/**
 * GET /api/credit-analysis/algorithm
 * Endpoint to get information about the algorithm
 */
router.get('/credit-analysis/algorithm', (req: Request, res: Response) => {
  res.status(200).json({
    algorithm: 'zkfinance-credit-v1',
    version: '1.0.0',
    description: 'Credit score algorithm migrated from n8n workflow',
    factors: {
      income: '0-300 points based on income level',
      employment_years: '0-200 points based on employment stability',
      has_property: '0-150 points if user owns property',
      has_debt: '-100 points if user has debt',
      payment_defaults: '-100 to -200 points based on payment defaults'
    },
    thresholds: {
      minimum: 300,
      maximum: 850,
      approval: 650
    },
    categories: {
      'Excellent': '750-850',
      'Good': '700-749',
      'Fair': '650-699',
      'Poor': '600-649',
      'Very Poor': '300-599'
    }
  });
});

export default router; 