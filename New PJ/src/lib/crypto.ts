/**
 * Crypto and Web3 utility functions
 */

/**
 * Validate Ethereum address
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Compare addresses (case-insensitive)
 */
export function addressesEqual(addr1: string, addr2: string): boolean {
  return addr1.toLowerCase() === addr2.toLowerCase();
}

/**
 * Convert hex to decimal
 */
export function hexToDecimal(hex: string): number {
  return parseInt(hex, 16);
}

/**
 * Convert decimal to hex
 */
export function decimalToHex(num: number): string {
  return '0x' + num.toString(16);
}

/**
 * Get chain name from chain ID
 */
export function getChainName(chainId: number): string {
  const chains: Record<number, string> = {
    1: 'Ethereum Mainnet',
    5: 'Goerli',
    11155111: 'Sepolia',
    8453: 'Base Mainnet',
    84532: 'Base Sepolia',
  };
  return chains[chainId] || `Chain ${chainId}`;
}

/**
 * Get block explorer URL for address
 */
export function getBlockExplorerUrl(chainId: number, address: string): string {
  const explorers: Record<number, string> = {
    1: 'https://etherscan.io',
    5: 'https://goerli.etherscan.io',
    11155111: 'https://sepolia.etherscan.io',
    8453: 'https://basescan.org',
    84532: 'https://sepolia.basescan.org',
  };
  const baseUrl = explorers[chainId] || 'https://etherscan.io';
  return `${baseUrl}/address/${address}`;
}

/**
 * Get block explorer URL for transaction
 */
export function getTxExplorerUrl(chainId: number, txHash: string): string {
  const explorers: Record<number, string> = {
    1: 'https://etherscan.io',
    5: 'https://goerli.etherscan.io',
    11155111: 'https://sepolia.etherscan.io',
    8453: 'https://basescan.org',
    84532: 'https://sepolia.basescan.org',
  };
  const baseUrl = explorers[chainId] || 'https://etherscan.io';
  return `${baseUrl}/tx/${txHash}`;
}

/**
 * Generate random hex string
 */
export function randomHex(length: number = 32): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return '0x' + Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Hash string to hex (simple, not cryptographically secure)
 */
export function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return '0x' + Math.abs(hash).toString(16).padStart(8, '0');
}

/**
 * Check if string is valid transaction hash
 */
export function isValidTxHash(hash: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(hash);
}

/**
 * Format wei to ether (simplified, for display only)
 */
export function weiToEther(wei: string | bigint): string {
  const weiNum = typeof wei === 'string' ? BigInt(wei) : wei;
  const ether = Number(weiNum) / 1e18;
  return ether.toFixed(4);
}

/**
 * Format ether to wei (simplified)
 */
export function etherToWei(ether: string | number): bigint {
  const etherNum = typeof ether === 'string' ? parseFloat(ether) : ether;
  return BigInt(Math.floor(etherNum * 1e18));
}
