# API Reference

The J832 Protocol SDK exposes all core functions of the smart contract, with TypeScript types for strict and safe integration.

---

## Class: J832

### constructor(config: J832Config)

Creates a new SDK instance.

**Parameters:**

| Name           | Type    | Description                                            |
|----------------|---------|--------------------------------------------------------|
| providerUrl    | string  | EVM RPC URL (Infura, Alchemy, QuickNode, etc.)        |
| contractAddress| string  | Deployed J832 Protocol contract address                |
| privateKey     | string? | Private key for signing transactions (optional, required for write actions) |

---

## Methods

### async createResource({ resourceId, enforceUniqueness })

Creates a new resource on-chain.

**Parameters:**

| Name              | Type    | Description                       |
|-------------------|---------|-----------------------------------|
| resourceId        | string  | Unique resource identifier        |
| enforceUniqueness | boolean | Enforce uniqueness of data hashes |

**Returns:** Transaction receipt

---

### async registerChange({ resourceId, dataHash, changeType })

Registers a change for a resource.

**Parameters:**

| Name        | Type       | Description                                     |
|-------------|------------|-------------------------------------------------|
| resourceId  | string     | Resource identifier                             |
| dataHash    | string     | Hash (bytes32) of the change data               |
| changeType  | ChangeType | Enum: CREATE, UPDATE, DELETE, TRANSFER, AUDIT   |

**Returns:** Transaction receipt

---

### async getLatestChange(resourceId)

Gets the latest change for a resource.

**Parameters:**

| Name        | Type   | Description          |
|-------------|--------|----------------------|
| resourceId  | string | Resource identifier  |

**Returns:** `Change` object

---

### async getHistoryRange(resourceId, start, count)

Gets a paginated slice of the change history for a resource.

**Parameters:**

| Name        | Type   | Description                    |
|-------------|--------|--------------------------------|
| resourceId  | string | Resource identifier            |
| start       | number | Start index (0-based)          |
| count       | number | Max records to return          |

**Returns:** `Change[]` array

---

### async getVersionCount(resourceId)

Returns the total number of changes for a resource.

**Parameters:**

| Name        | Type   | Description          |
|-------------|--------|----------------------|
| resourceId  | string | Resource identifier  |

**Returns:** `number`

---

### async getAdmins(resourceId)

Returns all admin addresses for a resource.

**Parameters:**

| Name        | Type   | Description          |
|-------------|--------|----------------------|
| resourceId  | string | Resource identifier  |

**Returns:** `string[]` (addresses)

---

### async proposeAddAdmin(resourceId, newAdmin)

Proposes to add a new admin (requires majority approval).

**Parameters:**

| Name        | Type   | Description              |
|-------------|--------|--------------------------|
| resourceId  | string | Resource identifier      |
| newAdmin    | string | Address to add as admin  |

---

### async approveAddAdmin(resourceId)

Approves the current add-admin proposal.

**Parameters:**

| Name        | Type   | Description          |
|-------------|--------|----------------------|
| resourceId  | string | Resource identifier  |

---

### async proposeRemoveAdmin(resourceId, adminToRemove)

Proposes to remove an admin (requires majority approval).

**Parameters:**

| Name           | Type   | Description              |
|----------------|--------|--------------------------|
| resourceId     | string | Resource identifier      |
| adminToRemove  | string | Address to remove        |

---

### async approveRemoveAdmin(resourceId)

Approves the current remove-admin proposal.

**Parameters:**

| Name        | Type   | Description          |
|-------------|--------|----------------------|
| resourceId  | string | Resource identifier  |

---

### async proposeTransferOwnership(resourceId, newOwner)

Proposes to transfer ownership of a resource.

**Parameters:**

| Name        | Type   | Description               |
|-------------|--------|---------------------------|
| resourceId  | string | Resource identifier       |
| newOwner    | string | Address for new ownership |

---

### async approveTransferOwnership(resourceId)

Approves the current transfer ownership proposal.

**Parameters:**

| Name        | Type   | Description          |
|-------------|--------|----------------------|
| resourceId  | string | Resource identifier  |

---

### async setResourceActiveStatus(resourceId, active)

Archive (deactivate) or reactivate a resource.

**Parameters:**

| Name        | Type    | Description                     |
|-------------|---------|---------------------------------|
| resourceId  | string  | Resource identifier             |
| active      | boolean | `true` = activate, `false` = archive |

---

### async isResourceActive(resourceId)

Checks if a resource is active.

**Parameters:**

| Name        | Type   | Description          |
|-------------|--------|----------------------|
| resourceId  | string | Resource identifier  |

**Returns:** `boolean`

---

### async isUniquenessEnforced(resourceId)

Checks if uniqueness is enforced for a resource.

**Parameters:**

| Name        | Type   | Description          |
|-------------|--------|----------------------|
| resourceId  | string | Resource identifier  |

**Returns:** `boolean`

---

### async setUniqueness(resourceId, enforceUniqueness)

Sets the uniqueness enforcement for a resource.

**Parameters:**

| Name              | Type    | Description                      |
|-------------------|---------|----------------------------------|
| resourceId        | string  | Resource identifier              |
| enforceUniqueness | boolean | Enable/disable uniqueness        |

---

### async isAdmin(resourceId, address)

Checks if an address is admin for a resource.

**Parameters:**

| Name        | Type   | Description          |
|-------------|--------|----------------------|
| resourceId  | string | Resource identifier  |
| address     | string | Address to check     |

**Returns:** `boolean`

---

### async getResourceOwner(resourceId)

Returns the owner address for a resource.

**Parameters:**

| Name        | Type   | Description          |
|-------------|--------|----------------------|
| resourceId  | string | Resource identifier  |

**Returns:** `string` (address)

---

## Types

### ChangeType (enum)

| Value     | Description       |
|-----------|------------------|
| CREATE    | 0 — Create       |
| UPDATE    | 1 — Update       |
| DELETE    | 2 — Delete       |
| TRANSFER  | 3 — Transfer     |
| AUDIT     | 4 — Audit        |

---

### Change (interface)

| Field      | Type        | Description                |
|------------|-------------|----------------------------|
| version    | number      | Version number             |
| dataHash   | string      | Data hash (bytes32)        |
| timestamp  | number      | Unix timestamp             |
| actor      | string      | Address who made the change|
| changeType | ChangeType  | Type of the change         |

---

## Errors

- Most methods will throw if called with invalid parameters or if the underlying smart contract rejects the transaction.
- Always catch and handle errors in production integrations.

---

**See also:**  
- [Getting Started](getting-started.md)  
- [Governance](governance.md)  
- [Security](security.md)
