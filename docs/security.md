# Security Best Practices

- **Never commit private keys, mnemonics, or secrets to any repository.**
- All write actions (`createResource`, `registerChange`, proposals) must be backend/server-side.
- Always pre-hash sensitive data off-chain; never send raw confidential data to the blockchain.
- Monitor your RPC endpoint and contract address for changes.
- Audit transaction receipts for every call; handle failures gracefully.
- Use unique resource identifiers and track them securely off-chain.
