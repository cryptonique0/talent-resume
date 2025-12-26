import { isAddress, getAddress } from 'viem';

/**
 * Validate if a string is a valid Ethereum address
 */
export const isValidAddress = (address: string): boolean => {
  try {
    return isAddress(address);
  } catch {
    return false;
  }
};

/**
 * Normalize Ethereum address to checksum format
 */
export const toChecksumAddress = (address: string): string => {
  try {
    return getAddress(address);
  } catch {
    return address;
  }
};

/**
 * Compare two addresses (case-insensitive)
 */
export const addressesEqual = (addr1: string, addr2: string): boolean => {
  try {
    return getAddress(addr1) === getAddress(addr2);
  } catch {
    return addr1.toLowerCase() === addr2.toLowerCase();
  }
};

/**
 * Convert bytes to hex string
 */
export const bytesToHex = (bytes: Uint8Array): string => {
  return '0x' + Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
};

/**
 * Convert hex string to bytes
 */
export const hexToBytes = (hex: string): Uint8Array => {
  const cleanHex = hex.startsWith('0x') ? hex.slice(2) : hex;
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < cleanHex.length; i += 2) {
    bytes[i / 2] = parseInt(cleanHex.substr(i, 2), 16);
  }
  return bytes;
};

/**
 * Encode text to hex
 */
export const textToHex = (text: string): string => {
  return '0x' + Buffer.from(text).toString('hex');
};

/**
 * Decode hex to text
 */
export const hexToText = (hex: string): string => {
  const cleanHex = hex.startsWith('0x') ? hex.slice(2) : hex;
  return Buffer.from(cleanHex, 'hex').toString('utf8');
};

/**
 * Sign a message hash (for frontend display purposes)
 * Note: Actual signing should be done through wallet provider
 */
export const createMessageHash = (message: string): string => {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  // This is a placeholder - actual signing requires wallet
  return '0x' + Array.from(new Uint8Array(32))
    .map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, '0'))
    .join('');
};
