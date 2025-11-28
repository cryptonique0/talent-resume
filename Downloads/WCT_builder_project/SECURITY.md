# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly:

1. **DO NOT** open a public issue
2. Email the maintainers directly (see GitHub profile)
3. Provide detailed information:
   - Type of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will respond within 48 hours and work with you to address the issue.

## Security Best Practices

### For Contributors

- Never commit private keys, API keys, or secrets
- Use `.env.example` as a template, never `.env`
- Review code for common vulnerabilities before submitting PRs
- Keep dependencies up to date
- Use `npm audit` to check for known vulnerabilities

### For Users

- Never share your private keys with anyone
- Use hardware wallets for large amounts
- Verify contract addresses before interacting
- Start with small amounts on testnets
- Keep your wallet software updated

### Smart Contract Security

- This is a demo project for educational purposes
- Contracts are not audited
- Do NOT use in production without a professional audit
- Test thoroughly on testnets before any mainnet deployment

## Secure Development

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix

# For security patches that may break functionality
npm audit fix --force
```

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Security Features

- Environment variable management for secrets
- Read-only frontend operations (except explicit transactions)
- Network validation before transactions
- Wallet confirmation required for all transactions
- No private key storage in code or config files

## Acknowledgments

We appreciate responsible disclosure. Contributors who report valid security issues will be acknowledged in our security advisories.
