import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
import { encodeAddress, decodeAddress } from '@polkadot/util-crypto';

// Import embedded base64 files
import wasmBase64 from '../assets/wasm-base64.txt?raw';
import zkeyBase64 from '../assets/zkey-base64.txt?raw';
import vkeyBase64 from '../assets/vkey-base64.txt?raw';

export interface EmbeddedProofResult {
  success: boolean;
  proof?: any;
  publicSignals?: any;
  txHash?: string;
  fee?: string;
  error?: string;
  timestamp: string;
  address: string;
  score: number;
  threshold: number;
}

export class EmbeddedZKVerifyService {
  private userAddress: string = '';
  private isInitialized: boolean = false;
  private session: any = null;

  async initialize(): Promise<void> {
    try {
      console.log('🔐 Initializing ZKVerify service with embedded files...');

      // Enable Polkadot extensions
      await web3Enable('zkfinance-app');
      const accounts = await web3Accounts();

      if (accounts.length === 0) {
        throw new Error('No Subwallet account found');
      }

      // Use the real Subwallet account
      this.userAddress = accounts[0].address;
      console.log('✅ Subwallet detected!');
      console.log('📋 Available accounts:', accounts.map(acc => acc.address));
      console.log('👤 Original Polkadot address:', this.userAddress);

      // const voltaAddress = this.convertAddressToVoltaFormat(this.userAddress);
      // console.log('🎯 Volta address converted:', voltaAddress);

      // Initialize ZKVerify session with wallet (browser)
      console.log('🔗 Initializing ZKVerify session with wallet...');
      const { zkVerifySession } = await import('zkverifyjs');

      this.userAddress = accounts[0].address;
      console.log('👤 Polkadot address at index 0:', this.userAddress);

      //const polkadotAddress = '5DyR6CBwevjqE8YJNjpjRhaP7b8238LRDjT6qGNLpuUnofNG';
      const voltaAddress = encodeAddress(decodeAddress(this.userAddress), 42);
      console.log('Volta (prefix 42):', voltaAddress);
      this.session = await zkVerifySession.start()
        .Volta()
        .withWallet({
          source: 'subwallet-js',
          accountAddress: voltaAddress,
        });
        // .withWallet({
        //   source: 'subwallet-js',
        //   accountAddress: this.userAddress, // for signing
        // });

      console.log('✅ ZKVerify session initialized with wallet!');
      console.log('🎯 Subwallet account for signing:', this.userAddress);
      console.log('🎯 Volta address for transaction:', voltaAddress);

      this.isInitialized = true;
      console.log('✅ ZKVerify service initialized successfully!');
    } catch (error) {
      console.error('❌ Error initializing ZKVerify service:', error);
      throw error;
    }
  }

  private convertAddressToVoltaFormat(address: string): string {
    try {
      const publicKey = decodeAddress(address);
      const voltaAddress = encodeAddress(publicKey, 42);
      const polkadotAddress = encodeAddress(publicKey, 0);
      console.log('🔍 Polkadot format (prefix 0):', polkadotAddress);
      console.log('🔍 Volta format (prefix 42):  ', voltaAddress);
      return voltaAddress;
    } catch (error) {
      console.log('⚠️ Conversion failed:', error);
      return address;
    }
  }


  private compareSS58Formats(address: string) {
    try {
      const publicKey = decodeAddress(address);

      const polkadotFormat = encodeAddress(publicKey, 0);   // prefix 0
      const voltaFormat    = encodeAddress(publicKey, 42);  // prefix 42

      console.log('🔍 Original:       ', address);
      console.log('📘 Polkadot (0):   ', polkadotFormat);
      console.log('⚡ Volta (42):     ', voltaFormat);

      const same = polkadotFormat === voltaFormat;
      if (same) {
        console.warn('⚠️ Both formats are VISUALLY IDENTICAL. Probable SS58 collision.');
      }

      return { polkadotFormat, voltaFormat };
    } catch (err) {
      console.error('❌ Error converting address:', err);
      return null;
    }
  }

  async generateAndSubmitProof(score: number, threshold: number): Promise<EmbeddedProofResult> {
    if (!this.isInitialized || !this.session) {
      throw new Error('Service not initialized');
    }

    try {
      console.log('🚀 Starting ZK proof with embedded files: Score=', score, 'Threshold=', threshold);

      // Decode base64 files
      const wasmBuffer = this.base64ToUint8Array(wasmBase64);
      const zkeyBuffer = this.base64ToUint8Array(zkeyBase64);
      const vkeyData = JSON.parse(atob(vkeyBase64));

      console.log('📦 ZK files decoded successfully');

      // Import snarkjs dynamically
      const snarkjs = await import('snarkjs');
      console.log('📦 SnarkJS imported');

      const input = { score, threshold };

      const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        input,
        wasmBuffer,
        zkeyBuffer
      );

      const userPolkadot = '5DyR6CBwevjqE8YJNjpjRhaP7b8238LRDjT6qGNLpuUnofNG';
      const userVolta = encodeAddress(decodeAddress(userPolkadot), 42);
      console.log('🎯 Volta address for transaction using convertAddressToVoltaFormat function:', this.convertAddressToVoltaFormat(this.userAddress));
      console.log("Comparing function", this.compareSS58Formats(this.userAddress));
      console.log(`🔐 Connected account:
        - Polkadot (prefix 0): ${userPolkadot}
        - Volta (prefix 42):   ${userVolta}`);

      console.log('✅ ZK proof generated successfully!');

      // Submit proof using zkverifyjs with wallet
      console.log('🚀 Submitting proof to ZKVerify via zkverifyjs...');
      const submissionResult = await this.submitProofViaZKVerifyJS(proof, publicSignals, vkeyData);
      console.log('🎯 Volta address for transaction using function:', this.convertAddressToVoltaFormat(this.userAddress));


      return {
        success: true,
        proof,
        publicSignals,
        txHash: submissionResult.txHash,
        fee: submissionResult.fee,
        timestamp: new Date().toISOString(),
        address:this.convertAddressToVoltaFormat(this.userAddress),
        score,
        threshold,
      };
    } catch (error) {
      console.error('❌ Error in proof generation/submission:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        address: this.userAddress,
        score,
        threshold,
      };
    }
  }

  private async submitProofViaZKVerifyJS(
    proof: any,
    publicSignals: any,
    vkey: any
  ): Promise<{ txHash: string; fee: string }> {
    try {
      if (!this.session) {
        throw new Error('Session not initialized');
      }

      const { events, transactionResult } = await this.session
        .verify()
        .groth16({
          library: 'snarkjs',
          curve: 'bn128',
        })
        .execute({
          proofData: {
            vk: vkey,
            proof,
            publicSignals,
          },
          domainId: 1,
        });

      events.on('includedInBlock', (e: any) => console.log('📦 Proof included in block:', e));
      events.on('finalized', (e: any) => console.log('✅ Proof finalized:', e));
      events.on('error', (e: any) => console.error('❌ Error in proof:', e));

      const verification = await transactionResult;
      console.log('✅ Verification result:', verification);

      return {
        txHash: verification.txHash || 'pending',
        fee: '0',
      };
    } catch (error) {
      console.error('❌ Error submitting proof via zkverifyjs:', error);
      throw error;
    }

  }

  private base64ToUint8Array(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }
}
