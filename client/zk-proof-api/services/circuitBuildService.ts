// Types for circuit build API
export interface CircuitBuildRequest {
  circuit: string;
  circuitName: string;
  version?: string;
}

export interface CircuitBuildResponse {
  success: boolean;
  buildId?: string;
  circuitName?: string;
  version?: string;
  artifacts?: {
    wasmBase64: string;
    zkeyBase64: string;
    vkeyBase64: string;
  };
  metadata?: {
    requestId: string;
    processingTime: number;
    timestamp: string;
  };
  error?: string;
}

export interface CircuitValidationRequest {
  circuit: string;
}

export interface CircuitValidationResponse {
  success: boolean;
  validation: {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  };
  timestamp: string;
}

/**
 * Circuit Build Service for Client
 * Handles communication with the circuit build API
 */
export class CircuitBuildService {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  /**
   * Build a circuit and get base64 artifacts
   */
  async buildCircuit(request: CircuitBuildRequest): Promise<CircuitBuildResponse> {
    try {
      console.log('🔧 Requesting circuit build:', request.circuitName);
      
      const response = await fetch(`${this.baseUrl}/api/circuit/build`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Request-ID': this.generateRequestId()
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const result: CircuitBuildResponse = await response.json();
      
      if (result.success) {
        console.log('✅ Circuit build successful:', result.buildId);
        console.log('📦 Artifacts received: WASM, ZKEY, VKEY');
      } else {
        console.error('❌ Circuit build failed:', result.error);
      }

      return result;

    } catch (error) {
      console.error('❌ Error in circuit build request:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Validate circuit format without building
   */
  async validateCircuit(request: CircuitValidationRequest): Promise<CircuitValidationResponse> {
    try {
      console.log('🔍 Validating circuit format...');
      
      const response = await fetch(`${this.baseUrl}/api/circuit/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Request-ID': this.generateRequestId()
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const result: CircuitValidationResponse = await response.json();
      
      if (result.success) {
        console.log('✅ Circuit validation completed');
        if (result.validation.isValid) {
          console.log('✅ Circuit is valid');
        } else {
          console.log('❌ Circuit validation failed:', result.validation.errors);
        }
        if (result.validation.warnings.length > 0) {
          console.log('⚠️ Warnings:', result.validation.warnings);
        }
      }

      return result;

    } catch (error) {
      console.error('❌ Error in circuit validation:', error);
      return {
        success: false,
        validation: {
          isValid: false,
          errors: [error instanceof Error ? error.message : 'Unknown error'],
          warnings: []
        },
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Get build service health status
   */
  async getHealth(): Promise<{ status: string; service: string; version: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/circuit/build/health`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();

    } catch (error) {
      console.error('❌ Error checking build service health:', error);
      throw error;
    }
  }

  /**
   * Get build statistics
   */
  async getStats(): Promise<{ stats: any; timestamp: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/circuit/build/stats`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();

    } catch (error) {
      console.error('❌ Error getting build stats:', error);
      throw error;
    }
  }

  /**
   * Generate a unique request ID
   */
  private generateRequestId(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  /**
   * Example circuit for testing
   */
  static getExampleCircuit(): string {
    return `pragma circom 2.1.4;

template ExampleCircuit() {
    signal input a;
    signal input b;
    signal output c;
    
    c <== a * b;
}

component main = ExampleCircuit();`;
  }

  /**
   * Example credit score circuit
   */
  static getCreditScoreCircuit(): string {
    return `pragma circom 2.1.4;

include "node_modules/circomlib/circuits/comparators.circom";

template CreditScoreCheck() {
    signal input score;      // private
    signal input threshold;  // public
    signal output passed;    // public

    component isGreaterEq = GreaterEqThan(16);
    isGreaterEq.in[0] <== score;
    isGreaterEq.in[1] <== threshold;
    passed <== isGreaterEq.out;
}

component main = CreditScoreCheck();`;
  }
}

// Export singleton instance
export const circuitBuildService = new CircuitBuildService(); 