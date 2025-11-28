# WCT Builder Project - Troubleshooting Guide

## Common Issues and Solutions

### Installation Issues

**Problem: npm install fails**
```bash
# Solution: Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Problem: Hardhat compilation fails**
```bash
# Solution: Install dependencies and try again
cd dapp
npm install --save-dev @nomicfoundation/hardhat-toolbox
npx hardhat clean
npx hardhat compile
```

### Deployment Issues

**Problem: Insufficient funds for deployment**
- Get testnet ETH from Sepolia faucets:
  - https://sepoliafaucet.com/
  - https://www.alchemy.com/faucets/ethereum-sepolia
  - https://faucet.quicknode.com/ethereum/sepolia

**Problem: RPC errors or timeouts**
- Use a reliable RPC provider (Infura, Alchemy, QuickNode)
- Check your API rate limits
- Try a different RPC endpoint

**Problem: Contract verification fails**
- Ensure Etherscan API key is correct
- Wait 1-2 minutes after deployment before verifying
- Make sure you're using the correct network

### Frontend Issues

**Problem: Wallet not connecting**
- Make sure you have MetaMask or compatible wallet installed
- Check that you're on the correct network (Sepolia)
- Clear browser cache and reload

**Problem: Transaction fails**
- Ensure wallet has sufficient ETH for gas
- Check that contract address is correct
- Verify you're connected to the right network

### Contract Interaction Issues

**Problem: "Nothing to claim" error**
- The claim function requires the owner to set claimable amount first
- Use the owner account to call `setClaimable(userAddress, amount)`

**Problem: "Only owner" error**
- Mint and setClaimable functions are restricted to contract owner
- Connect with the deployer wallet

## Getting Help

1. Check the [quickstart guide](dapp/docs/quickstart.md)
2. Review [CONTRIBUTING.md](CONTRIBUTING.md)
3. Open an issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Error messages and logs
   - Your environment (Node version, OS)

## Useful Commands

```bash
# Check Node and npm versions
node --version
npm --version

# View Hardhat tasks
npx hardhat help

# Run Hardhat console
npx hardhat console --network sepolia

# Check contract code on Etherscan
# Visit: https://sepolia.etherscan.io/address/YOUR_CONTRACT_ADDRESS

# View transaction on explorer
# Visit: https://sepolia.etherscan.io/tx/YOUR_TX_HASH
```
