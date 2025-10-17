import { generateKeyPair, exportJWK, exportPKCS8 } from 'jose';
import fs from 'fs/promises';

/**
 * Generate keys for RS256 and write:
 *  - jwks.json
 *  - .well-known/jwks.json
 *  - private.pem  (DO NOT COMMIT)
 *
 * Fixes "CryptoKey is not extractable" by setting extractable: true.
 * Tested on Node 20/22.
 */
const { publicKey, privateKey } = await generateKeyPair('RS256', {
  // Needed to export private key material in WebCrypto runtimes (Node 20+ ESM path)
  extractable: true,
  // Set explicit size for consistency
  modulusLength: 2048,
});

const jwk = await exportJWK(publicKey);
jwk.use = 'sig';
jwk.kid = 'fortress-key-1';
jwk.alg = 'RS256';

await fs.mkdir('.well-known', { recursive: true });
const jwks = JSON.stringify({ keys: [jwk] }, null, 2);
await fs.writeFile('jwks.json', jwks);
await fs.writeFile('.well-known/jwks.json', jwks);

// Export private key (PEM, PKCS#8) — keep this SECRET
const pkcs8 = await exportPKCS8(privateKey);
await fs.writeFile('private.pem', pkcs8);

console.log('✅ Created jwks.json, .well-known/jwks.json, and private.pem');
