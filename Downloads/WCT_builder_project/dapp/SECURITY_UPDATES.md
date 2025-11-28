# Security Vulnerabilities - Fix Plan

## Current Issues
- 34 vulnerabilities (13 low, 3 moderate, 16 high, 2 critical)
- Deprecated WalletConnect v1 packages
- Outdated dependencies

## Action Items

### High Priority
1. Update deprecated WalletConnect packages to v2
2. Fix critical vulnerabilities
3. Update glob packages

### Plan
```bash
# Safe updates (non-breaking)
npm audit fix

# Manual updates for breaking changes
npm install @walletconnect/ethereum-provider@latest
npm install viem@latest
npm install wagmi@latest
```

## Migration Notes
- WalletConnect v1 → v2 migration in progress
- Some peer dependency warnings are expected
- Test thoroughly after updates
