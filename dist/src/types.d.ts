/** Enum representing change types in the Solidity contract */
export declare enum ChangeType {
    CREATE = 0,
    UPDATE = 1,
    DELETE = 2,
    TRANSFER = 3,
    AUDIT = 4
}
/** Change record structure matching Solidity */
export interface Change {
    version: number;
    dataHash: string;
    timestamp: number;
    actor: string;
    changeType: ChangeType;
}
