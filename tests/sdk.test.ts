import { describe, it } from 'node:test';
import { J832, ChangeType } from '../src';
import { keccak256, toUtf8Bytes } from 'ethers';

const providerUrl = process.env.J832_PROVIDER_URL!;
const contractAddress = process.env.J832_CONTRACT_ADDRESS!;
const privateKey = process.env.J832_SIGNER_KEY!;

// Set up resource id for testing (use a unique one per test run to avoid conflicts)
const testResource = `test_resource_${Date.now()}`; 

// Compute a hash for testing
const testDataHash = keccak256(toUtf8Bytes('example data'));

describe('J832 Protocol SDK', () => {
  let sdk: J832;

  beforeAll(() => {
    sdk = new J832({
      providerUrl,
      contractAddress,
      privateKey,
    });
  });

  it('should create a new resource', async () => {
    const receipt = await sdk.createResource({ resourceId: testResource, enforceUniqueness: true });
    expect(receipt.status).toBe(1);
  });

  it('should register a change', async () => {
    const receipt = await sdk.registerChange({
      resourceId: testResource,
      dataHash: testDataHash,
      changeType: ChangeType.CREATE,
    });
    expect(receipt.status).toBe(1);
  });

  it('should get the latest change', async () => {
    const change = await sdk.getLatestChange(testResource);
    expect(change).toHaveProperty('version');
    expect(change.dataHash).toBe(testDataHash);
  });

  it('should get the full change history', async () => {
    const count = await sdk.getVersionCount(testResource);
    const history = await sdk.getHistoryRange(testResource, 0, count);
    expect(history.length).toBeGreaterThanOrEqual(1);
  });

  // Puedes agregar más tests para otros métodos clave (admins, proposals, status, etc.)
});
function beforeAll(arg0: () => void) {
    throw new Error('Function not implemented.');
}

