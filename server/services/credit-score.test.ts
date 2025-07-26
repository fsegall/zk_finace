import { describe, it, expect } from 'vitest';
import { 
  calculateCreditScore, 
  generateUserProfile, 
  generateRecommendations,
  generateTechnical,
  analyzeCredit,
  type CreditData 
} from './credit-score.js';

describe('Credit Score Service', () => {
  describe('calculateCreditScore', () => {
    it('should calculate high score for excellent profile', () => {
      const data: CreditData = {
        income: 12000,
        employment_years: 8,
        has_property: true,
        has_debt: false,
        payment_defaults: 0
      };

      const result = calculateCreditScore(data);
      
      expect(result.score).toBeGreaterThanOrEqual(750);
      expect(result.passed).toBe(true);
      expect(result.category).toBe('Excellent');
    });





    it('should handle edge cases correctly', () => {
      const data: CreditData = {
        income: 0,
        employment_years: 0,
        has_property: false,
        has_debt: true,
        payment_defaults: 10
      };

      const result = calculateCreditScore(data);
      
      expect(result.score).toBe(300); // Score mínimo
      expect(result.passed).toBe(false);
    });
  });

  describe('generateUserProfile', () => {
    it('should generate high income profile', () => {
      const data: CreditData = {
        income: 15000,
        employment_years: 5,
        has_property: true,
        has_debt: false,
        payment_defaults: 0
      };

      const profile = generateUserProfile(data);
      
      expect(profile.incomeRange).toBe('high');
      expect(profile.employmentStability).toBe('stable');
      expect(profile.hasProperty).toBe(true);
      expect(profile.hasDebt).toBe(false);
      expect(profile.riskLevel).toBe('low');
    });


  });

  describe('generateRecommendations', () => {
    it('should generate positive recommendations for approved users', () => {
      const analysisResult = {
        score: 800,
        threshold: 650,
        passed: true,
        category: 'Excellent',
        message: 'Approved',
        suggestedLimit: 96000,
        factors: {} as CreditData
      };

      const recommendations = generateRecommendations(analysisResult);
      
      expect(recommendations.immediate).toContain('Aproveite o financiamento aprovado');
      expect(recommendations.longTerm).toContain('Construa reserva de emergência');
      expect(recommendations.nextReview).toBeDefined();
    });

    it('should generate improvement recommendations for rejected users', () => {
      const analysisResult = {
        score: 500,
        threshold: 650,
        passed: false,
        category: 'Poor',
        message: 'Rejected',
        suggestedLimit: 0,
        factors: {} as CreditData
      };

      const recommendations = generateRecommendations(analysisResult);
      
      expect(recommendations.immediate).toContain('Reduza dívidas existentes');
      expect(recommendations.longTerm).toContain('Estabeleça orçamento mensal');
    });
  });



  describe('analyzeCredit', () => {
    it('should perform complete credit analysis', async () => {
      const data: CreditData = {
        income: 8000,
        employment_years: 5,
        has_property: true,
        has_debt: false,
        payment_defaults: 0
      };

      const result = await analyzeCredit(data, 'test-123');
      
      expect(result.requestId).toBe('test-123');
      expect(result.analysis.score).toBeGreaterThan(650);
      expect(result.analysis.passed).toBe(true);
      expect(result.userProfile).toBeDefined();
      expect(result.recommendations).toBeDefined();
      expect(result.technical).toBeDefined();
      expect(result.timestamp).toBeDefined();
      expect(result.modelVersion).toBe('1.0.0');
      expect(result.environment).toBe('production');
    });

    it('should handle ZK proof generation gracefully', async () => {
      const data: CreditData = {
        income: 8000,
        employment_years: 5,
        has_property: true,
        has_debt: false,
        payment_defaults: 0
      };

      const result = await analyzeCredit(data, 'test-zk');
      
      // A prova ZK pode ou não estar presente (depende da disponibilidade do módulo)
      expect(result.analysis).toBeDefined();
      expect(result.analysis.score).toBeGreaterThan(0);
      
      // Se a prova ZK estiver presente, deve ter a estrutura correta
      if (result.zkProof) {
        expect(result.zkProof.proof).toBeDefined();
        expect(result.zkProof.publicSignals).toBeDefined();
        expect(result.zkProof.hash).toBeDefined();
        expect(typeof result.zkProof.verified).toBe('boolean');
      }
    });
  });
}); 