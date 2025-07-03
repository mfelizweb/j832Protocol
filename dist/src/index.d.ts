export interface J832Config {
    providerUrl: string;
    contractAddress: string;
    privateKey?: string;
    apiKey?: string;
}
export declare class J832 {
    private provider;
    private contract;
    private apiKey?;
    constructor(config: J832Config);
    logChange(params: {
        hash: string;
        metadata?: Record<string, any>;
    }): Promise<void>;
    getChangeById(changeId: string): Promise<void>;
}
