import { ethers } from 'ethers';
import J832ProtocolABI from '../abi/J832Protocol.json';
import { ChangeType } from './types';
/**
 * J832 Protocol SDK — Professional audit, change tracking and multi-admin governance.
 * Connect to any deployed J832Protocol contract for global, tamper-proof audit trails.
 */
export class J832 {
    provider;
    contract;
    constructor(config) {
        if (!config.providerUrl || !config.contractAddress) {
            throw new Error("providerUrl and contractAddress are required");
        }
        this.provider = new ethers.JsonRpcProvider(config.providerUrl);
        let signerOrProvider = this.provider;
        if (config.privateKey) {
            if (!/^0x[a-fA-F0-9]{64}$/.test(config.privateKey)) {
                throw new Error("Invalid privateKey format. Must be 0x-prefixed 32-byte hex string.");
            }
            signerOrProvider = new ethers.Wallet(config.privateKey, this.provider);
        }
        this.contract = new ethers.Contract(config.contractAddress, J832ProtocolABI, signerOrProvider);
    }
    /** Converts a string (or hex string) to bytes32 using keccak256 if needed. */
    toBytes32(input) {
        if (/^0x[0-9a-fA-F]{64}$/.test(input))
            return input; // Already bytes32 hex
        return ethers.keccak256(ethers.toUtf8Bytes(input));
    }
    // === Core Resource Methods ===
    /**
     * Create a new resource on-chain. Only the first admin/owner can do this.
     * @param resourceId Unique resource string. (Will be hashed to bytes32)
     * @param enforceUniqueness If true, each dataHash must be unique for this resource.
     */
    async createResource(params) {
        if (!this.hasSigner())
            throw new Error('Provide a privateKey for write actions.');
        const resourceId = this.toBytes32(params.resourceId);
        const enforceUniqueness = params.enforceUniqueness ?? false;
        const tx = await this.contract.createResource(resourceId, enforceUniqueness);
        return await tx.wait();
    }
    /**
     * Register a change for a resource.
     * @param resourceId Unique resource string (will be hashed)
     * @param dataHash Hex string (bytes32) or arbitrary string to hash as dataHash.
     * @param changeType ChangeType enum (CREATE, UPDATE, etc.)
     */
    async registerChange(params) {
        if (!this.hasSigner())
            throw new Error('Provide a privateKey for write actions.');
        const resourceId = this.toBytes32(params.resourceId);
        const dataHash = this.toBytes32(params.dataHash);
        if (params.changeType < 0 || params.changeType > 4)
            throw new Error('Invalid changeType');
        const tx = await this.contract.registerChange(resourceId, dataHash, params.changeType);
        return await tx.wait();
    }
    // === Resource & Audit History ===
    /**
     * Get the latest change for a resource.
     * @param resourceId Unique resource string (will be hashed)
     */
    async getLatestChange(resourceId) {
        const bytes32Id = this.toBytes32(resourceId);
        const result = await this.contract.getLatestChange(bytes32Id);
        return this.parseChange(result);
    }
    /**
     * Get a paginated range of changes for a resource.
     * @param resourceId Unique resource string (will be hashed)
     * @param start Zero-based start index
     * @param count Number of changes to return
     */
    async getHistoryRange(resourceId, start, count) {
        const bytes32Id = this.toBytes32(resourceId);
        const results = await this.contract.getHistoryRange(bytes32Id, start, count);
        return results.map((r) => this.parseChange(r));
    }
    /**
     * Get the number of changes/versions for a resource.
     */
    async getVersionCount(resourceId) {
        const bytes32Id = this.toBytes32(resourceId);
        const result = await this.contract.getVersionCount(bytes32Id);
        return Number(result);
    }
    // === Admin & Governance Methods ===
    /** Get all admin addresses for a resource. */
    async getAdmins(resourceId) {
        const bytes32Id = this.toBytes32(resourceId);
        return await this.contract.getAdmins(bytes32Id);
    }
    /** Get number of admins for a resource. */
    async getAdminCount(resourceId) {
        const bytes32Id = this.toBytes32(resourceId);
        const res = await this.contract.getAdminCount(bytes32Id);
        return Number(res);
    }
    /** Propose adding a new admin (majority approval required). */
    async proposeAddAdmin(resourceId, newAdmin) {
        if (!this.hasSigner())
            throw new Error('Provide a privateKey for write actions.');
        const bytes32Id = this.toBytes32(resourceId);
        const tx = await this.contract.proposeAddAdmin(bytes32Id, newAdmin);
        return await tx.wait();
    }
    /** Approve current add-admin proposal. */
    async approveAddAdmin(resourceId) {
        if (!this.hasSigner())
            throw new Error('Provide a privateKey for write actions.');
        const bytes32Id = this.toBytes32(resourceId);
        const tx = await this.contract.approveAddAdmin(bytes32Id);
        return await tx.wait();
    }
    /** Propose removing an admin (majority approval required). */
    async proposeRemoveAdmin(resourceId, adminToRemove) {
        if (!this.hasSigner())
            throw new Error('Provide a privateKey for write actions.');
        const bytes32Id = this.toBytes32(resourceId);
        const tx = await this.contract.proposeRemoveAdmin(bytes32Id, adminToRemove);
        return await tx.wait();
    }
    /** Approve current remove-admin proposal. */
    async approveRemoveAdmin(resourceId) {
        if (!this.hasSigner())
            throw new Error('Provide a privateKey for write actions.');
        const bytes32Id = this.toBytes32(resourceId);
        const tx = await this.contract.approveRemoveAdmin(bytes32Id);
        return await tx.wait();
    }
    /** Propose transferring resource ownership (majority approval required). */
    async proposeTransferOwnership(resourceId, newOwner) {
        if (!this.hasSigner())
            throw new Error('Provide a privateKey for write actions.');
        const bytes32Id = this.toBytes32(resourceId);
        const tx = await this.contract.proposeTransferOwnership(bytes32Id, newOwner);
        return await tx.wait();
    }
    /** Approve current transfer ownership proposal. */
    async approveTransferOwnership(resourceId) {
        if (!this.hasSigner())
            throw new Error('Provide a privateKey for write actions.');
        const bytes32Id = this.toBytes32(resourceId);
        const tx = await this.contract.approveTransferOwnership(bytes32Id);
        return await tx.wait();
    }
    /** Returns true if address is admin for a resource. */
    async isAdmin(resourceId, address) {
        const bytes32Id = this.toBytes32(resourceId);
        return await this.contract.isAdmin(bytes32Id, address);
    }
    /** Get the owner of a resource. */
    async getResourceOwner(resourceId) {
        const bytes32Id = this.toBytes32(resourceId);
        const config = await this.contract.resourceConfig(bytes32Id);
        return config.owner;
    }
    // === Resource Status & Uniqueness ===
    /** Activate/Archive a resource (admin only). */
    async setResourceActiveStatus(resourceId, active) {
        if (!this.hasSigner())
            throw new Error('Provide a privateKey for write actions.');
        const bytes32Id = this.toBytes32(resourceId);
        const tx = await this.contract.setResourceActiveStatus(bytes32Id, active);
        return await tx.wait();
    }
    /** Check if resource is active (not archived). */
    async isResourceActive(resourceId) {
        const bytes32Id = this.toBytes32(resourceId);
        return await this.contract.isResourceActive(bytes32Id);
    }
    /** Check if uniqueness is enforced for a resource. */
    async isUniquenessEnforced(resourceId) {
        const bytes32Id = this.toBytes32(resourceId);
        return await this.contract.isUniquenessEnforced(bytes32Id);
    }
    /** Set (enforce or disable) uniqueness for a resource (admin only). */
    async setUniqueness(resourceId, enforceUniqueness) {
        if (!this.hasSigner())
            throw new Error('Provide a privateKey for write actions.');
        const bytes32Id = this.toBytes32(resourceId);
        const tx = await this.contract.setUniqueness(bytes32Id, enforceUniqueness);
        return await tx.wait();
    }
    // === Utility & Internal ===
    /** Returns true if the contract instance is using a signer (write access). */
    hasSigner() {
        return !!this.contract.runner;
    }
    /** Converts contract Change struct to TypeScript Change interface. */
    parseChange(result) {
        return {
            version: Number(result.version),
            dataHash: result.dataHash,
            timestamp: Number(result.timestamp),
            actor: result.actor,
            changeType: Number(result.changeType),
        };
    }
}
export { ChangeType };
