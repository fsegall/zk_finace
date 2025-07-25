
import express from 'express';
import cors from "cors";
import creditAnalysisRouter from './routes/credit-analysis.js';

// Carregar variáveis de ambiente
import dotenv from 'dotenv';
dotenv.config();

console.log('🔧 Carregando variáveis de ambiente...');
console.log('🔑 ZKVERIFY_SEED_PHRASE:', process.env.ZKVERIFY_SEED_PHRASE ? 'Configurada' : 'Não configurada');

const app = express();

app.use(cors());
app.use(express.json()); // Para aceitar JSON no body

// Rotas de análise de crédito (nova implementação local)
app.use('/api', creditAnalysisRouter);

// Endpoint legado removido - migração para processamento local concluída

// Endpoint de health check geral
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
  console.log(`🚀 Servidor rodando na porta ${port}`);
  console.log('📊 Endpoints disponíveis:');
  console.log('- POST /api/credit-analysis (ANÁLISE LOCAL + ZK)');
  console.log('- GET /api/credit-analysis/health');
  console.log('- GET /api/credit-analysis/algorithm');
  console.log('- GET /health');
  console.log('');
  console.log('💡 Análise de crédito 100% local com provas ZK');
  console.log('🔒 Dados processados localmente - sigilo total garantido');
  console.log('🔐 Provas ZK geradas para compliance com zero-knowledge');
});

export default app;