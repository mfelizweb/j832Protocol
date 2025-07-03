# Governance

J832 Protocol enables multi-admin resource management via on-chain proposals and majority approval for critical actions.

## Admin Proposal Flow

- **Propose**: Any admin can propose adding/removing an admin, or transferring ownership.
- **Approve**: Each admin can approve the proposal.
- **Execute**: Once majority approval is reached, the action is executed on-chain.

## API Methods

See [API Reference](api.md) for:

- `proposeAddAdmin`
- `approveAddAdmin`
- `proposeRemoveAdmin`
- `approveRemoveAdmin`
- `proposeTransferOwnership`
- `approveTransferOwnership`
