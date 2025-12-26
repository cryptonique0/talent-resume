/**
 * Math utilities for calculations and BigInt handling
 */

/**
 * Convert string number to BigInt safely
 */
export const toBigInt = (value: string | number | bigint): bigint => {
  if (typeof value === 'bigint') return value;
  if (typeof value === 'number') return BigInt(Math.floor(value));
  try {
    return BigInt(value);
  } catch {
    return BigInt(0);
  }
};

/**
 * Convert BigInt to readable string with units
 */
export const formatBigInt = (value: bigint, decimals: number = 18): string => {
  const divisor = BigInt(10 ** decimals);
  const whole = value / divisor;
  const fraction = value % divisor;

  if (fraction === 0n) return whole.toString();

  const fractionStr = fraction.toString().padStart(decimals, '0');
  return `${whole}.${fractionStr}`;
};

/**
 * Calculate percentage
 */
export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return (value / total) * 100;
};

/**
 * Round to decimal places
 */
export const round = (value: number, decimals: number = 0): number => {
  return Number(`${Math.round(Number(`${value}e${decimals}`))}e-${decimals}`);
};

/**
 * Floor division
 */
export const floorDivide = (a: number, b: number): number => {
  if (b === 0) return 0;
  return Math.floor(a / b);
};

/**
 * Check if number is even
 */
export const isEven = (num: number): boolean => {
  return num % 2 === 0;
};

/**
 * Check if number is odd
 */
export const isOdd = (num: number): boolean => {
  return num % 2 !== 0;
};

/**
 * Get random number in range
 */
export const randomInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Calculate average of numbers
 */
export const average = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
};

/**
 * Find min value in array
 */
export const min = (numbers: number[]): number => {
  return Math.min(...numbers);
};

/**
 * Find max value in array
 */
export const max = (numbers: number[]): number => {
  return Math.max(...numbers);
};

/**
 * Clamp number between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

/**
 * Linear interpolation
 */
export const lerp = (start: number, end: number, t: number): number => {
  return start + (end - start) * clamp(t, 0, 1);
};
