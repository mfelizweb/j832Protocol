import { ethers } from 'ethers';
import J832ProtocolABI from '../abi/J832Protocol.json';
export class J832 {
    provider;
    contract;
    apiKey;
    constructor(config) {
        this.provider = new ethers.JsonRpcProvider(config.providerUrl);
        this.apiKey = config.apiKey;
        // Por defecto, instancia el contrato solo para lectura
        let signerOrProvider = this.provider;
        if (config.privateKey) {
            const wallet = new ethers.Wallet(config.privateKey, this.provider);
            signerOrProvider = wallet;
        }
        this.contract = new ethers.Contract(config.contractAddress, J832ProtocolABI, signerOrProvider);
    }
    async logChange(params) {
        // Por ahora, solo stub para saber si hay signer
        if (!('signer' in this.contract) || !this.contract.runner) {
            throw new Error('Contract not connected with signer. Provide a privateKey in config to send transactions.');
        }
        throw new Error('Not implemented yet');
    }
    async getChangeById(changeId) {
        throw new Error('Not implemented yet');
    }
}
