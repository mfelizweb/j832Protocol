export declare enum ChangeType {
    CREATE = 0,
    UPDATE = 1,
    DELETE = 2,
    TRANSFER = 3,
    AUDIT = 4
}
export interface Change {
    version: number;
    dataHash: string;
    timestamp: number;
    actor: string;
    changeType: ChangeType;
}
