# Deployment Guide

## Prerequisites

- Node.js 18+ and npm
- A wallet with testnet ETH (for Sepolia)
- RPC provider API key (Infura, Alchemy, or QuickNode)
- Etherscan API key (for verification)

## Quick Deploy to Sepolia

### 1. Setup Environment

Create `dapp/.env`:

```bash
DEPLOYER_PRIVATE_KEY=your_private_key_here
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
ETHERSCAN_API_KEY=your_etherscan_api_key
```

⚠️ **Security**: Never commit `.env` files. Use `.env.example` as a template.

### 2. Get Testnet ETH

Visit these faucets to get free Sepolia ETH:
- https://sepoliafaucet.com/
- https://www.alchemy.com/faucets/ethereum-sepolia
- https://faucet.quicknode.com/ethereum/sepolia

You'll need ~0.1 ETH for deployment and testing.

### 3. Install Dependencies

```bash
cd dapp
npm install
```

### 4. Compile Contracts

```bash
npx hardhat compile
```

Expected output: `Compiled X Solidity files successfully`

### 5. Deploy Contract

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

The script will:
- Deploy the Rewards contract
- Print the deployed address
- Save address to `.deploy_address`

Example output:
```
Deploying contracts with account: 0x...
Rewards deployed to: 0x1234...5678
Wrote deployed address to /path/to/.deploy_address
```

### 6. Verify on Etherscan

```bash
npx hardhat verify --network sepolia DEPLOYED_ADDRESS
```

Replace `DEPLOYED_ADDRESS` with the address from step 5.

Successful verification output:
```
Successfully verified contract Rewards on Etherscan.
https://sepolia.etherscan.io/address/0x...#code
```

## Deploy to Other Networks

### Polygon Mumbai

Update `hardhat.config.cjs`:

```javascript
mumbai: {
  url: process.env.MUMBAI_RPC_URL,
  accounts: [process.env.DEPLOYER_PRIVATE_KEY]
}
```

Deploy:
```bash
npx hardhat run scripts/deploy.js --network mumbai
```

### Local Hardhat Network

```bash
# Terminal 1: Start local node
npx hardhat node

# Terminal 2: Deploy
npx hardhat run scripts/deploy.js --network localhost
```

## Post-Deployment

### 1. Update Frontend Config

Add the deployed address to your frontend config:

```javascript
// dapp/src/config/contracts.js
export const REWARDS_ADDRESS = '0x...'
```

### 2. Test Contract Interaction

```bash
# Run the batch demo script
export RPC_URL="https://sepolia.infura.io/v3/YOUR_KEY"
export CONTRACT_ADDRESS="0x..."
export PRIVATE_KEYS="0xkey1,0xkey2"
node scripts/batchTxs.js
```

### 3. Frontend Deployment

#### Deploy to Netlify

```bash
cd dapp
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## Troubleshooting

### Insufficient Funds Error
- Ensure your wallet has enough testnet ETH
- Check balance: `npx hardhat run scripts/checkBalance.js --network sepolia`

### RPC Rate Limit
- Use a paid RPC provider for production
- Add delays between transactions
- Implement retry logic

### Verification Failed
- Wait 1-2 minutes after deployment
- Ensure correct network in command
- Check Etherscan API key is valid

### Gas Estimation Failed
- Check network congestion
- Increase gas limit in hardhat config
- Try again in a few minutes

## CI/CD Deployment

The repository includes a GitHub Action that automatically:
1. Compiles contracts on push to `main`
2. Deploys to Sepolia when secrets are configured
3. Verifies contracts on Etherscan
4. Uploads verification artifacts to releases

Configure these secrets in your GitHub repository:
- `DEPLOYER_PRIVATE_KEY`
- `SEPOLIA_RPC_URL`
- `ETHERSCAN_API_KEY`

## Best Practices

1. **Always test on testnets first**
2. **Use hardware wallets for mainnet**
3. **Audit contracts before mainnet deployment**
4. **Keep private keys secure (use `.env`, never commit)**
5. **Verify contracts for transparency**
6. **Document deployed addresses**
7. **Test all functions after deployment**

## Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [Etherscan Verification Guide](https://docs.etherscan.io/tutorials/verifying-contracts-programmatically)
- [Sepolia Faucets List](https://faucetlink.to/sepolia)
- [Gas Optimization Tips](./PERFORMANCE.md)
