
import express from 'express';
import cors from "cors";
import creditAnalysisRouter from './routes/credit-analysis.js';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

console.log('🔧 Loading environment variables...');
console.log('🔑 ZKVERIFY_SEED_PHRASE:', process.env.ZKVERIFY_SEED_PHRASE ? 'Configured' : 'Not configured');

const app = express();

app.use(cors());
app.use(express.json()); // To accept JSON in the body

// Credit analysis routes (new local implementation)
app.use('/api', creditAnalysisRouter);

// Legacy endpoint removed - migration to local processing completed

// General health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'zkfinance-credit-analysis-backend',
    version: '2.0.0',
    features: [
      'credit-analysis-local',
      'zk-proof-generation',
      'privacy-compliant'
    ]
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log('📊 Available endpoints:');
  console.log('- POST /api/credit-analysis (LOCAL ANALYSIS + ZK)');
  console.log('- GET /api/credit-analysis/health');
  console.log('- GET /api/credit-analysis/algorithm');
  console.log('- GET /health');
  console.log('');
  console.log('💡 100% local credit analysis with ZK proofs');
  console.log('🔒 Data processed locally - total confidentiality guaranteed');
  console.log('🔑 ZK proofs generated for zero-knowledge compliance');
});

export default app;