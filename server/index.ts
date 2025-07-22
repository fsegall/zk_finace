
import express from 'express';
const app = express();
import cors from "cors";

app.use(cors());
app.use(express.json()); // Para aceitar JSON no body



app.post('/api/credit-analysis-result', (req, res) => {
  const analysisResult = req.body;
  console.log("analysisResult", analysisResult);
  
  console.log('=== CREDIT ANALYSIS RESULT RECEIVED ===');
  console.log('Request ID:', analysisResult.requestId);
  console.log('Timestamp:', analysisResult.timestamp);
  console.log('Model Version:', analysisResult.modelVersion);
  console.log('Environment:', analysisResult.environment);
  
  console.log('\n--- USER PROFILE ---');
  console.log('Income Range:', analysisResult.userProfile?.incomeRange);
  console.log('Employment Stability:', analysisResult.userProfile?.employmentStability);
  console.log('Has Property:', analysisResult.userProfile?.hasProperty);
  console.log('Has Debt:', analysisResult.userProfile?.hasDebt);
  console.log('Risk Level:', analysisResult.userProfile?.riskLevel);
  
  console.log('\n--- ANALYSIS RESULT ---');
  console.log('Score:', analysisResult.analysis?.score);
  console.log('Threshold:', analysisResult.analysis?.threshold);
  console.log('Passed:', analysisResult.analysis?.passed);
  console.log('Category:', analysisResult.analysis?.category);
  console.log('Message:', analysisResult.analysis?.message);
  console.log('Suggested Limit:', analysisResult.analysis?.suggestedLimit);
  console.log('Confidence:', analysisResult.analysis?.confidence);
  
  console.log('\n--- RECOMMENDATIONS ---');
  console.log('Immediate:', analysisResult.recommendations?.immediate);
  console.log('Long Term:', analysisResult.recommendations?.longTerm);
  console.log('Next Review:', analysisResult.recommendations?.nextReview);
  
  console.log('\n--- TECHNICAL INFO ---');
  console.log('Processing Time (ms):', analysisResult.technical?.processingTime);
  console.log('Algorithm:', analysisResult.technical?.algorithm);
  console.log('Data Points:', analysisResult.technical?.dataPoints);
  console.log('Validation:', analysisResult.technical?.validation);
  
  console.log('=====================================\n');

  // Aqui você pode processar/salvar o resultado
  // Por exemplo: salvar no banco de dados, enviar notificação, etc.
  
  res.status(200).json({ 
    received: true, 
    requestId: analysisResult.requestId,
    processedAt: new Date().toISOString()
  });
});

// Endpoint de health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'zkfinance-credit-analysis-backend'
  });
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
  console.log('Endpoints disponíveis:');
  console.log('- POST /api/credit-analysis-result');
  console.log('- GET /health');
});