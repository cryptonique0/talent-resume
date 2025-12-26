/**
 * String manipulation and formatting utilities
 */

/**
 * Capitalize first letter of string
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Convert to Title Case
 */
export const toTitleCase = (str: string): string => {
  return str
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
};

/**
 * Convert to camelCase
 */
export const toCamelCase = (str: string): string => {
  return str
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .reduce((acc, word, i) => {
      if (i === 0) return word.toLowerCase();
      return acc + capitalize(word);
    }, '');
};

/**
 * Convert to snake_case
 */
export const toSnakeCase = (str: string): string => {
  return str
    .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .toLowerCase();
};

/**
 * Reverse string
 */
export const reverseString = (str: string): string => {
  return str.split('').reverse().join('');
};

/**
 * Check if string is palindrome
 */
export const isPalindrome = (str: string): boolean => {
  const cleaned = str.toLowerCase().replace(/[^\w]/g, '');
  return cleaned === reverseString(cleaned);
};

/**
 * Truncate string with ellipsis
 */
export const truncate = (str: string, length: number, suffix: string = '...'): string => {
  if (str.length <= length) return str;
  return str.slice(0, length - suffix.length) + suffix;
};

/**
 * Repeat string
 */
export const repeatString = (str: string, times: number): string => {
  return str.repeat(times);
};

/**
 * Pad string
 */
export const padString = (str: string, length: number, char: string = ' ', side: 'left' | 'right' | 'both' = 'right'): string => {
  const padding = Math.max(0, length - str.length);
  const padChar = char.repeat(padding);

  if (side === 'left') return padChar + str;
  if (side === 'right') return str + padChar;

  const leftPad = Math.floor(padding / 2);
  const rightPad = padding - leftPad;
  return char.repeat(leftPad) + str + char.repeat(rightPad);
};

/**
 * Count occurrences of substring
 */
export const countOccurrences = (str: string, search: string): number => {
  return str.split(search).length - 1;
};

/**
 * Extract numbers from string
 */
export const extractNumbers = (str: string): number[] => {
  const matches = str.match(/\d+/g);
  return matches ? matches.map(Number) : [];
};

/**
 * Check if string contains only letters
 */
export const isAlpha = (str: string): boolean => {
  return /^[a-zA-Z]+$/.test(str);
};

/**
 * Check if string contains only numbers
 */
export const isNumeric = (str: string): boolean => {
  return /^\d+$/.test(str);
};

/**
 * Check if string is alphanumeric
 */
export const isAlphanumeric = (str: string): boolean => {
  return /^[a-zA-Z0-9]+$/.test(str);
};
