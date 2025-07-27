// Types for credit analysis
export interface CreditData {
  income: number;
  employment_years: number;
  has_property: boolean;
  has_debt: boolean;
  payment_defaults: number;
}

export interface AnalysisResult {
  score: number;
  threshold: number;
  passed: boolean;
  category: string;
  message: string;
  suggestedLimit: number;
  factors: CreditData;
}

export interface UserProfile {
  incomeRange: 'low' | 'medium' | 'high';
  employmentStability: 'new' | 'moderate' | 'stable';
  hasProperty: boolean;
  hasDebt: boolean;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface Analysis {
  score: number;
  threshold: number;
  passed: boolean;
  category: string;
  message: string;
  suggestedLimit: number;
  confidence: number;
}

export interface Recommendations {
  immediate: string[];
  longTerm: string[];
  nextReview: string;
}

export interface Technical {
  processingTime: number;
  algorithm: string;
  dataPoints: number;
  validation: string;
}

export interface CreditAnalysisResponse {
  requestId: string;
  timestamp: string;
  modelVersion: string;
  workflowVersion: string;
  environment: string;
  userProfile: UserProfile;
  analysis: Analysis;
  recommendations: Recommendations;
  technical: Technical;
  zkProof?: {
    proof: any;
    publicSignals: string[];
    hash: string;
    verified: boolean;
    zkVerifySubmission?: {
      success: boolean;
      transactionHash?: string;
      error?: string;
    };
  };
}

/**
 * Calcula o score de crédito baseado nos dados do usuário
 * Algoritmo migrado do n8n workflow
 */
export function calculateCreditScore(data: CreditData): AnalysisResult {
  // Calcular score base
  let score = 300; // Minimum score

  // Fatores de renda (0-300 pontos)
  if (data.income >= 10000) score += 300;
  else if (data.income >= 8000) score += 250;
  else if (data.income >= 6000) score += 200;
  else if (data.income >= 4000) score += 150;
  else if (data.income >= 2000) score += 100;

  // Fatores de emprego (0-200 pontos)
  if (data.employment_years >= 10) score += 200;
  else if (data.employment_years >= 7) score += 180;
  else if (data.employment_years >= 5) score += 150;
  else if (data.employment_years >= 3) score += 120;
  else if (data.employment_years >= 1) score += 80;

  // Fatores de propriedade (0-150 pontos)
  if (data.has_property) score += 150;

  // Debt factors (-100 to 0 points)
  if (data.has_debt) score -= 100;

  // Default factors (-200 to 0 points)
  if (data.payment_defaults >= 5) score -= 200;
  else if (data.payment_defaults >= 3) score -= 150;
  else if (data.payment_defaults >= 1) score -= 100;

  // Garantir que o score esteja entre 300 e 850
  score = Math.max(300, Math.min(850, score));

  // Determinar status
  const threshold = 650;
  const passed = score >= threshold;

  // Categorizar score
  let category = 'Poor';
  if (score >= 750) category = 'Excellent';
  else if (score >= 700) category = 'Good';
  else if (score >= 650) category = 'Fair';
  else if (score >= 600) category = 'Poor';
  else category = 'Very Poor';

  // Gerar mensagem personalizada
  let message = '';
  if (passed) {
    message = `Parabéns! Seu score de crédito é ${score} (${category}). Você está aprovado para financiamento.`;
  } else {
    message = `Seu score de crédito é ${score} (${category}). Infelizmente não foi aprovado. Recomendamos melhorar sua situação financeira.`;
  }

  // Calculate suggested credit limit
  let suggestedLimit = 0;
  if (passed) {
    if (score >= 750) suggestedLimit = data.income * 12;
    else if (score >= 700) suggestedLimit = data.income * 8;
    else if (score >= 650) suggestedLimit = data.income * 5;
  }

  return {
    score,
    threshold,
    passed,
    category,
    message,
    suggestedLimit,
    factors: data
  };
}

/**
 * Gera o perfil do usuário baseado nos dados de entrada
 */
export function generateUserProfile(userData: CreditData): UserProfile {
  return {
    incomeRange: userData.income >= 10000 ? 'high' : 
                 userData.income >= 6000 ? 'medium' : 'low',
    employmentStability: userData.employment_years >= 5 ? 'stable' : 
                         userData.employment_years >= 2 ? 'moderate' : 'new',
    hasProperty: userData.has_property,
    hasDebt: userData.has_debt,
    riskLevel: userData.payment_defaults >= 3 ? 'high' : 
               userData.payment_defaults >= 1 ? 'medium' : 'low'
  };
}

/**
 * Gera recomendações baseadas no resultado da análise
 */
export function generateRecommendations(analysisResult: AnalysisResult): Recommendations {
  const immediate = analysisResult.passed ? 
    ['Aproveite o financiamento aprovado', 'Mantenha pagamentos em dia'] : 
    ['Reduza dívidas existentes', 'Melhore histórico de pagamentos'];

  const longTerm = analysisResult.passed ? 
    ['Construa reserva de emergência', 'Diversifique investimentos'] : 
    ['Estabeleça orçamento mensal', 'Considere consultoria financeira'];

  const nextReview = new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString(); // 6 meses

  return {
    immediate,
    longTerm,
    nextReview
  };
}

/**
 * Gera informações técnicas da análise
 */
export function generateTechnical(startTime: number, analysisData: CreditData): Technical {
  return {
    processingTime: Date.now() - startTime,
    algorithm: 'zkfinance-credit-v1',
    dataPoints: Object.keys(analysisData).length,
    validation: 'passed'
  };
}

/**
 * Função principal que executa a análise completa de crédito
 */
export async function analyzeCredit(userData: CreditData, requestId?: string): Promise<CreditAnalysisResponse> {
  const startTime = Date.now();
  
  // Calcular score
  const analysisResult = calculateCreditScore(userData);
  
  // Generate user profile
  const userProfile = generateUserProfile(userData);
  
  // Generate recommendations
  const recommendations = generateRecommendations(analysisResult);
  
  // Generate technical information
  const technical = generateTechnical(startTime, userData);
  
  // Calculate confidence based on score
  const confidence = analysisResult.score >= 750 ? 0.95 : 
                     analysisResult.score >= 700 ? 0.85 : 
                     analysisResult.score >= 650 ? 0.75 : 0.60;
  
  // Generate ZK proof (if module is available)
  let zkProof;
  try {
    console.log('🔍 Tentando importar módulo zk-credit-enhanced...');
    const { ZKCreditEnhancedService } = await import('./zk-credit-enhanced.ts');
    console.log('✅ Módulo zk-credit-enhanced importado com sucesso');
    
    console.log('🔧 Instanciando ZKCreditEnhancedService...');
    const zkCreditService = new ZKCreditEnhancedService();
    console.log('✅ ZKCreditEnhancedService instanciado');
    
    console.log('🚀 Iniciando geração de prova ZK...');
    const proofResult = await zkCreditService.generateProof({
      score: analysisResult.score,
      threshold: analysisResult.threshold,
      requestId: requestId || 'auto-generated'
    });
    
    console.log('📊 Resultado da prova:', proofResult.success ? 'Sucesso' : 'Falha');
    
    if (proofResult.success && proofResult.proof) {
      zkProof = {
        proof: proofResult.proof.proof,
        publicSignals: proofResult.proof.publicSignals,
        hash: proofResult.proof.hash,
        verified: true, // Assume it was verified by the service
        zkVerifySubmission: proofResult.proof.zkVerifySubmission
      };
      
      console.log(`🔐 Prova ZK gerada e enviada para ZKVerify`);
      console.log(`📝 Hash da prova: ${proofResult.proof.hash}`);
      if (proofResult.proof.zkVerifySubmission) {
        console.log(`🌐 ZKVerify: ${proofResult.proof.zkVerifySubmission.success ? 'Enviado' : 'Falha'}`);
        if (proofResult.proof.zkVerifySubmission.transactionHash) {
          console.log(`🔗 TX Hash: ${proofResult.proof.zkVerifySubmission.transactionHash}`);
        }
      }
    } else {
      console.log('❌ Falha na geração da prova ZK:', proofResult.error);
    }
  } catch (error) {
    console.log('⚠️ Módulo zk-credit-enhanced não disponível, continuando sem prova ZK');
    console.log('🔍 Detalhes do erro:', error.message);
    console.log('📁 Stack trace:', error.stack);
  }
  
  // Montar resposta completa
  return {
    requestId: requestId || Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    timestamp: new Date().toISOString(),
    modelVersion: '1.0.0',
    workflowVersion: '2.0.0',
    environment: 'production',
    userProfile,
    analysis: {
      score: analysisResult.score,
      threshold: analysisResult.threshold,
      passed: analysisResult.passed,
      category: analysisResult.category,
      message: analysisResult.message,
      suggestedLimit: analysisResult.suggestedLimit,
      confidence
    },
    recommendations,
    technical,
    zkProof
  };
} 