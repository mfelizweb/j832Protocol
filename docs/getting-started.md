# Getting Started

Welcome to the J832 Protocol SDK!  
This guide will help you install, configure, and use the SDK to interact with the J832 Protocol smart contract for secure, auditable, and tamper-proof blockchain logging.

---

## Installation

```bash
npm install @j832/sdk


Requirements
Node.js 18.x or newer

An EVM-compatible network (Polygon, Ethereum, etc.)

Access to a deployed J832 Protocol smart contract address

(Recommended) ethers.js for hash utilities

Configuration
You will need a few environment variables or configuration values for secure usage:

Variable	Description	Example
J832_PROVIDER_URL	RPC endpoint (Alchemy, Infura, etc.)	https://polygon-mumbai.g.alchemy.com/v2/yourkey
J832_CONTRACT_ADDRESS	Deployed J832 Protocol contract address	0xYourContractAddress
J832_SIGNER_KEY	Private key for signing transactions (testnet)	0xYourPrivateKey

Create a .env file in your project root (never commit private keys to your repository!):

env
Copiar
Editar
J832_PROVIDER_URL=https://polygon-mumbai.g.alchemy.com/v2/yourkey
J832_CONTRACT_ADDRESS=0xYourContractAddress
J832_SIGNER_KEY=0xYourPrivateKey
Basic Usage
Import the SDK
ts
Copiar
Editar
import { J832, ChangeType } from '@j832/sdk';
Initialize the SDK
ts
Copiar
Editar
const sdk = new J832({
  providerUrl: process.env.J832_PROVIDER_URL!,
  contractAddress: process.env.J832_CONTRACT_ADDRESS!,
  privateKey: process.env.J832_SIGNER_KEY, // Only for write actions
});
For read-only access (queries), privateKey is optional.

First Transaction: Create a Resource
ts
Copiar
Editar
await sdk.createResource({ resourceId: 'HR_PAYROLL', enforceUniqueness: true });
Register a Change (Audit Entry)
ts
Copiar
Editar
import { keccak256, toUtf8Bytes } from 'ethers';

// Example: hash any JSON or sensitive payload
const data = JSON.stringify({ employeeId: 123, bonus: 500 });
const dataHash = keccak256(toUtf8Bytes(data));

await sdk.registerChange({
  resourceId: 'HR_PAYROLL',
  dataHash,
  changeType: ChangeType.UPDATE,
});
Fetch Audit Trail
ts
Copiar
Editar
const latest = await sdk.getLatestChange('HR_PAYROLL');
const total = await sdk.getVersionCount('HR_PAYROLL');
const history = await sdk.getHistoryRange('HR_PAYROLL', 0, total);

console.log('Latest:', latest);
console.log('History:', history);
Multi-Admin Example
ts
Copiar
Editar
// Propose a new admin
await sdk.proposeAddAdmin('HR_PAYROLL', '0xNewAdminAddress');
// Approve as an admin (repeat from other admin addresses as needed)
await sdk.approveAddAdmin('HR_PAYROLL');
More Examples
See API Reference for every available method and advanced usage.

See Security for best practices on secrets and operations.

Need Help?
FAQ

Contact / Issues