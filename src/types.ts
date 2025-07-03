// src/types.ts

/** Enum representing change types in the Solidity contract */
export enum ChangeType {
  CREATE = 0,
  UPDATE = 1,
  DELETE = 2,
  TRANSFER = 3,
  AUDIT = 4,
}

/** Change record structure matching Solidity */
export interface Change {
  version: number;
  dataHash: string;   // bytes32 hex string
  timestamp: number;  // Unix epoch seconds
  actor: string;      // Ethereum address
  changeType: ChangeType;
}
