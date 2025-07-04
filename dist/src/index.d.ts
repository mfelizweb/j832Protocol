import { ChangeType, Change } from './types';
export interface J832Config {
    providerUrl: string;
    contractAddress: string;
    privateKey?: string;
    apiKey?: string;
}
/**
 * J832 Protocol SDK — Professional audit, change tracking and multi-admin governance.
 * Connect to any deployed J832Protocol contract for global, tamper-proof audit trails.
 */
export declare class J832 {
    private provider;
    private contract;
    constructor(config: J832Config);
    /** Converts a string (or hex string) to bytes32 using keccak256 if needed. */
    private toBytes32;
    /**
     * Create a new resource on-chain. Only the first admin/owner can do this.
     * @param resourceId Unique resource string. (Will be hashed to bytes32)
     * @param enforceUniqueness If true, each dataHash must be unique for this resource.
     */
    createResource(params: {
        resourceId: string;
        enforceUniqueness?: boolean;
    }): Promise<any>;
    /**
     * Register a change for a resource.
     * @param resourceId Unique resource string (will be hashed)
     * @param dataHash Hex string (bytes32) or arbitrary string to hash as dataHash.
     * @param changeType ChangeType enum (CREATE, UPDATE, etc.)
     */
    registerChange(params: {
        resourceId: string;
        dataHash: string;
        changeType: ChangeType;
    }): Promise<any>;
    /**
     * Get the latest change for a resource.
     * @param resourceId Unique resource string (will be hashed)
     */
    getLatestChange(resourceId: string): Promise<Change>;
    /**
     * Get a paginated range of changes for a resource.
     * @param resourceId Unique resource string (will be hashed)
     * @param start Zero-based start index
     * @param count Number of changes to return
     */
    getHistoryRange(resourceId: string, start: number, count: number): Promise<Change[]>;
    /**
     * Get the number of changes/versions for a resource.
     */
    getVersionCount(resourceId: string): Promise<number>;
    /** Get all admin addresses for a resource. */
    getAdmins(resourceId: string): Promise<string[]>;
    /** Get number of admins for a resource. */
    getAdminCount(resourceId: string): Promise<number>;
    /** Propose adding a new admin (majority approval required). */
    proposeAddAdmin(resourceId: string, newAdmin: string): Promise<any>;
    /** Approve current add-admin proposal. */
    approveAddAdmin(resourceId: string): Promise<any>;
    /** Propose removing an admin (majority approval required). */
    proposeRemoveAdmin(resourceId: string, adminToRemove: string): Promise<any>;
    /** Approve current remove-admin proposal. */
    approveRemoveAdmin(resourceId: string): Promise<any>;
    /** Propose transferring resource ownership (majority approval required). */
    proposeTransferOwnership(resourceId: string, newOwner: string): Promise<any>;
    /** Approve current transfer ownership proposal. */
    approveTransferOwnership(resourceId: string): Promise<any>;
    /** Returns true if address is admin for a resource. */
    isAdmin(resourceId: string, address: string): Promise<boolean>;
    /** Get the owner of a resource. */
    getResourceOwner(resourceId: string): Promise<string>;
    /** Activate/Archive a resource (admin only). */
    setResourceActiveStatus(resourceId: string, active: boolean): Promise<any>;
    /** Check if resource is active (not archived). */
    isResourceActive(resourceId: string): Promise<boolean>;
    /** Check if uniqueness is enforced for a resource. */
    isUniquenessEnforced(resourceId: string): Promise<boolean>;
    /** Set (enforce or disable) uniqueness for a resource (admin only). */
    setUniqueness(resourceId: string, enforceUniqueness: boolean): Promise<any>;
    /** Returns true if the contract instance is using a signer (write access). */
    private hasSigner;
    /** Converts contract Change struct to TypeScript Change interface. */
    private parseChange;
}
export { ChangeType };
