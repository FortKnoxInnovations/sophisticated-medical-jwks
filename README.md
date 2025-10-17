# JWKS Static Hosting Template (v3)

This version fixes the `CryptoKey is not extractable` error by passing
`extractable: true` to `generateKeyPair()` — required in WebCrypto-based
runtimes (e.g., Node 20/22 ESM).

## Quick Start

```bash
npm init -y
npm i jose

node generate-keys.mjs
# -> creates jwks.json, .well-known/jwks.json, private.pem
```

## Notes
- Do **NOT** commit `private.pem`.
- Host `jwks.json` and `.well-known/jwks.json` on GitHub/Cloudflare Pages.
- Point `keys.yourdomain.com` CNAME at the host and enable HTTPS.
