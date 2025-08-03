import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs/promises';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

const execAsync = promisify(exec);

// Types
export interface CircuitBuildRequest {
  circuit: string; // .circom content
  circuitName: string;
  version?: string;
}

export interface CircuitBuildResponse {
  success: boolean;
  wasmBase64?: string;
  zkeyBase64?: string;
  vkeyBase64?: string;
  error?: string;
  buildId?: string;
  processingTime?: number;
}

export interface CircuitValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Circuit Build Service
 * Handles ZK circuit compilation and artifact generation
 */
export class CircuitBuildService {
  private buildDir: string;
  private tempDir: string;
  private powersOfTauPath: string;

  constructor() {
    this.buildDir = path.join(process.cwd(), 'temp-builds');
    this.tempDir = path.join(process.cwd(), 'temp-circuits');
    this.powersOfTauPath = path.join(process.cwd(), 'zk-credit', 'build', 'powersOfTau28_hez_final_12.ptau');
  }

  /**
   * Main method to build a circuit from source
   */
  async buildCircuit(request: CircuitBuildRequest): Promise<CircuitBuildResponse> {
    const startTime = Date.now();
    const buildId = uuidv4();
    
    try {
      console.log(`🔧 Starting circuit build: ${buildId}`);
      console.log(`📝 Circuit name: ${request.circuitName}`);
      
      // 1. Validate circuit format
      const validation = this.validateCircuit(request.circuit);
      if (!validation.isValid) {
        return {
          success: false,
          error: `Circuit validation failed: ${validation.errors.join(', ')}`,
          buildId,
          processingTime: Date.now() - startTime
        };
      }

      // 2. Create temporary directories
      await this.ensureDirectories();
      const circuitDir = path.join(this.tempDir, buildId);
      await fs.mkdir(circuitDir, { recursive: true });

      // 3. Write circuit file
      const circuitPath = path.join(circuitDir, `${request.circuitName}.circom`);
      await fs.writeFile(circuitPath, request.circuit);

      // 4. Build circuit using circom
      const buildResult = await this.compileCircuit(circuitPath, circuitDir, request.circuitName);
      if (!buildResult.success) {
        return {
          success: false,
          error: buildResult.error,
          buildId,
          processingTime: Date.now() - startTime
        };
      }

      // 5. Convert artifacts to base64
      const artifacts = await this.convertArtifactsToBase64(circuitDir, request.circuitName);

      // 6. Save artifacts to client directory
      await this.saveArtifactsToClient(artifacts, request.circuitName);

      // 7. Cleanup temporary files
      await this.cleanup(circuitDir);

      const processingTime = Date.now() - startTime;
      console.log(`✅ Circuit build completed: ${buildId} (${processingTime}ms)`);

      return {
        success: true,
        wasmBase64: artifacts.wasmBase64,
        zkeyBase64: artifacts.zkeyBase64,
        vkeyBase64: artifacts.vkeyBase64,
        buildId,
        processingTime
      };

    } catch (error) {
      console.error(`❌ Circuit build failed: ${buildId}`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown build error',
        buildId,
        processingTime: Date.now() - startTime
      };
    }
  }

  /**
   * Validate circuit format and syntax
   */
  private validateCircuit(circuit: string): CircuitValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Basic validation
    if (!circuit || circuit.trim().length === 0) {
      errors.push('Circuit content is empty');
    }

    if (!circuit.includes('template')) {
      errors.push('Circuit must contain a template definition');
    }

    if (!circuit.includes('signal')) {
      errors.push('Circuit must contain signal declarations');
    }

    // Check for common circom syntax
    if (!circuit.includes('<==') && !circuit.includes('==>')) {
      warnings.push('No signal assignments found (using <== or ==>)');
    }

    // Check for proper template structure
    const templateMatch = circuit.match(/template\s+(\w+)\s*\(/);
    if (!templateMatch) {
      errors.push('Invalid template declaration format');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Ensure build directories exist
   */
  private async ensureDirectories(): Promise<void> {
    await fs.mkdir(this.buildDir, { recursive: true });
    await fs.mkdir(this.tempDir, { recursive: true });
  }

  /**
   * Execute shell command
   */
  private async executeCommand(command: string, cwd: string): Promise<{ success: boolean; error?: string; output?: string }> {
    try {
      const { stdout, stderr } = await execAsync(command, { cwd });
      if (stderr && !stderr.includes('Warning')) {
        return { success: false, error: stderr };
      }
      return { success: true, output: stdout };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Command execution failed' 
      };
    }
  }

  /**
   * Compile circuit using circom
   */
  private async compileCircuit(
    circuitPath: string, 
    outputDir: string, 
    circuitName: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      console.log(`🔨 Compiling circuit: ${circuitPath}`);

      // Step 1: Compile circuit to R1CS and WASM
              const compileCmd = `circom ${circuitPath} --r1cs --wasm --output ${outputDir} -l ${process.cwd()}/zk-credit/node_modules/circomlib/circuits`;
      console.log(`📝 Executing: ${compileCmd}`);
      
      const compileResult = await this.executeCommand(compileCmd, process.cwd());
      if (!compileResult.success) {
        return { 
          success: false, 
          error: `Compilation failed: ${compileResult.error}` 
        };
      }

      // Step 2: Generate proving key (zkey)
      const zkeyPath = path.join(outputDir, `${circuitName}_0001.zkey`);
      const zkeyCmd = `snarkjs groth16 setup ${circuitName}.r1cs ${this.powersOfTauPath} ${zkeyPath}`;
      console.log(`🔑 Generating proving key: ${zkeyCmd}`);
      
      const zkeyResult = await this.executeCommand(zkeyCmd, outputDir);
      if (!zkeyResult.success) {
        return { 
          success: false, 
          error: `ZKey generation failed: ${zkeyResult.error}` 
        };
      }

      // Step 3: Export verification key
      const vkeyPath = path.join(outputDir, 'verification_key.json');
      const vkeyCmd = `snarkjs zkey export verificationkey ${zkeyPath} ${vkeyPath}`;
      console.log(`🔐 Exporting verification key: ${vkeyCmd}`);
      
      const vkeyResult = await this.executeCommand(vkeyCmd, outputDir);
      if (!vkeyResult.success) {
        return { 
          success: false, 
          error: `Verification key export failed: ${vkeyResult.error}` 
        };
      }

      console.log('✅ Circuit compilation completed successfully');
      return { success: true };

    } catch (error) {
      console.error('❌ Circuit compilation failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Compilation error'
      };
    }
  }

  /**
   * Convert build artifacts to base64
   */
  private async convertArtifactsToBase64(
    circuitDir: string, 
    circuitName: string
  ): Promise<{ wasmBase64: string; zkeyBase64: string; vkeyBase64: string }> {
    try {
      console.log('🔄 Converting artifacts to Base64...');

      // Read WASM file
      const wasmPath = path.join(circuitDir, `${circuitName}_js`, `${circuitName}.wasm`);
      const wasmBuffer = await fs.readFile(wasmPath);
      const wasmBase64 = wasmBuffer.toString('base64');

      // Read ZKEY file
      const zkeyPath = path.join(circuitDir, `${circuitName}_0001.zkey`);
      const zkeyBuffer = await fs.readFile(zkeyPath);
      const zkeyBase64 = zkeyBuffer.toString('base64');

      // Read verification key
      const vkeyPath = path.join(circuitDir, 'verification_key.json');
      const vkeyBuffer = await fs.readFile(vkeyPath);
      const vkeyBase64 = vkeyBuffer.toString('base64');

      console.log('✅ Real artifacts converted to Base64');

      return {
        wasmBase64,
        zkeyBase64,
        vkeyBase64
      };

    } catch (error) {
      console.error('❌ Failed to convert artifacts to base64:', error);
      throw new Error(`Artifact conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Save artifacts to client directory
   */
  private async saveArtifactsToClient(
    artifacts: { wasmBase64: string; zkeyBase64: string; vkeyBase64: string },
    circuitName: string
  ): Promise<void> {
    try {
      const clientGeneratedDir = path.join(process.cwd(), 'client', 'zk-proof-api', 'generated');
      
      // Ensure directory exists
      await fs.mkdir(clientGeneratedDir, { recursive: true });

      // Save WASM file
      const wasmPath = path.join(clientGeneratedDir, `${circuitName}-wasm-base64.txt`);
      await fs.writeFile(wasmPath, artifacts.wasmBase64);

      // Save ZKEY file
      const zkeyPath = path.join(clientGeneratedDir, `${circuitName}-zkey-base64.txt`);
      await fs.writeFile(zkeyPath, artifacts.zkeyBase64);

      // Save VKEY file
      const vkeyPath = path.join(clientGeneratedDir, `${circuitName}-vkey-base64.txt`);
      await fs.writeFile(vkeyPath, artifacts.vkeyBase64);

      console.log(`💾 Artifacts saved to client/zk-proof-api/generated/`);
      console.log(`   📁 ${circuitName}-wasm-base64.txt`);
      console.log(`   📁 ${circuitName}-zkey-base64.txt`);
      console.log(`   📁 ${circuitName}-vkey-base64.txt`);

    } catch (error) {
      console.error('❌ Failed to save artifacts to client:', error);
      throw new Error(`Failed to save artifacts: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Cleanup temporary files
   */
  private async cleanup(circuitDir: string): Promise<void> {
    try {
      await fs.rm(circuitDir, { recursive: true, force: true });
      console.log('🧹 Temporary files cleaned up');
    } catch (error) {
      console.warn('⚠️ Failed to cleanup temporary files:', error);
    }
  }

  /**
   * Get build statistics
   */
  async getBuildStats(): Promise<{
    totalBuilds: number;
    successfulBuilds: number;
    failedBuilds: number;
    averageProcessingTime: number;
  }> {
    // This could be enhanced with database storage
    return {
      totalBuilds: 0,
      successfulBuilds: 0,
      failedBuilds: 0,
      averageProcessingTime: 0
    };
  }
}

// Export singleton instance
export const circuitBuildService = new CircuitBuildService(); 