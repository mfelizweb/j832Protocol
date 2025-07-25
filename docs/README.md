 # J832 Protocol SDK

**Enterprise-grade blockchain audit trails and multi-admin governance — easy integration for any system.**

[![npm version](https://img.shields.io/npm/v/@j832/sdk.svg)](https://npmjs.com/package/@j832/sdk)
[![Build Status](https://img.shields.io/github/actions/workflow/status/mfeliz1997/j832-sdk/main.yml)](https://github.com/mfeliz1997/j832-sdk/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## Features

- Immutable audit trails for any entity, resource, or process
- Multi-admin, on-chain approval workflow (add/remove/transfer)
- Tamper-proof, public or private by design (hash-only storage)
- Pagination, status management, and role verification
- Works with any EVM-compatible chain

---

## Installation

npm install @j832/sdk

Quick Start

import { J832, ChangeType } from '@j832/sdk';

const sdk = new J832({
providerUrl: process.env.J832_PROVIDER_URL!,
contractAddress: process.env.J832_CONTRACT_ADDRESS!,
privateKey: process.env.J832_SIGNER_KEY, // Only for write actions
});

---

## Usage Examples

---

# Create a Resource
 await sdk.createResource({ resourceId: 'HR_PAYROLL', enforceUniqueness: true });

## Register a Change

import { keccak256, toUtf8Bytes } from 'ethers';

const data = JSON.stringify({ employeeId: 123, bonus: 500 });
const dataHash = keccak256(toUtf8Bytes(data));

await sdk.registerChange({
resourceId: 'HR_PAYROLL',
dataHash,
changeType: ChangeType.UPDATE,
});

---

## Query Audit Trail

const latest = await sdk.getLatestChange('HR_PAYROLL');
const total = await sdk.getVersionCount('HR_PAYROLL');
const history = await sdk.getHistoryRange('HR_PAYROLL', 0, total);

---

## . Multi-Admin Governance

await sdk.proposeAddAdmin('HR_PAYROLL', '0xNewAdmin...');
await sdk.approveAddAdmin('HR_PAYROLL');
await sdk.proposeRemoveAdmin('HR_PAYROLL', '0xOldAdmin...');
await sdk.approveRemoveAdmin('HR_PAYROLL');

---

## Status and Uniqueness

await sdk.setResourceActiveStatus('HR_PAYROLL', false);
const active = await sdk.isResourceActive('HR_PAYROLL');
const uniqueness = await sdk.isUniquenessEnforced('HR_PAYROLL');

---

## Admin & Owner Query

const admins = await sdk.getAdmins('HR_PAYROLL');
const owner = await sdk.getResourceOwner('HR_PAYROLL');

---

## API Reference (Summary)

constructor(config: J832Config) — Create SDK instance

createResource({ resourceId, enforceUniqueness })

registerChange({ resourceId, dataHash, changeType })

getLatestChange(resourceId)

getHistoryRange(resourceId, start, count)

getVersionCount(resourceId)

getAdmins(resourceId)

proposeAddAdmin(resourceId, newAdmin)

approveAddAdmin(resourceId)

proposeRemoveAdmin(resourceId, adminToRemove)

approveRemoveAdmin(resourceId)

proposeTransferOwnership(resourceId, newOwner)

approveTransferOwnership(resourceId)

setResourceActiveStatus(resourceId, active)

isResourceActive(resourceId)

isUniquenessEnforced(resourceId)

setUniqueness(resourceId, enforceUniqueness)

isAdmin(resourceId, address)

getResourceOwner(resourceId)

## See full documentation: docs/README.md

## Security Best Practices

NEVER commit private keys or secrets to any repository.

All write actions (createResource, registerChange, admin proposals) must be server-side.

Always pre-hash sensitive data off-chain; never send raw confidential data to the blockchain.

Monitor your RPC endpoint and contract address for changes.

## Audit transaction receipts for every call; handle failures gracefully.

## License

## MIT

## Documentation

Getting Started

API Reference

Governance

## Security

## FAQ

J832 Protocol SDK is open-source, designed for enterprise-grade audit and compliance, and extensible for any regulated industry.

Contributions, bug reports, and security reviews welcome!

```

```