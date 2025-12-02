// API configuration for external services

export const API_CONFIG = {
  // Price APIs
  coingecko: {
    baseUrl: 'https://api.coingecko.com/api/v3',
    endpoints: {
      price: '/simple/price',
      chart: '/coins/{id}/market_chart'
    }
  },

  // NFT APIs
  alchemy: {
    baseUrl: 'https://eth-mainnet.g.alchemy.com/v2',
    apiKey: process.env.VITE_ALCHEMY_API_KEY || ''
  },

  moralis: {
    baseUrl: 'https://deep-index.moralis.io/api/v2',
    apiKey: process.env.VITE_MORALIS_API_KEY || ''
  },

  // ENS
  ens: {
    baseUrl: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens'
  },

  // Gas trackers
  etherscan: {
    baseUrl: 'https://api.etherscan.io/api',
    apiKey: process.env.VITE_ETHERSCAN_API_KEY || ''
  },

  polygonscan: {
    baseUrl: 'https://api.polygonscan.com/api',
    apiKey: process.env.VITE_POLYGONSCAN_API_KEY || ''
  },

  celoscan: {
    baseUrl: 'https://api.celoscan.io/api',
    apiKey: process.env.VITE_CELOSCAN_API_KEY || ''
  },

  // DeFi protocols
  uniswap: {
    baseUrl: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'
  },

  aave: {
    baseUrl: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3'
  },

  // Bridge APIs
  allbridge: {
    baseUrl: 'https://core.api.allbridge.io'
  },

  celer: {
    baseUrl: 'https://cbridge-prod2.celer.network'
  }
};

// Request helpers
export const fetcher = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
};

// Cache helper
const cache = new Map();
const CACHE_DURATION = 60000; // 1 minute

export const cachedFetcher = async (url, options = {}) => {
  const cacheKey = `${url}-${JSON.stringify(options)}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const data = await fetcher(url, options);
  cache.set(cacheKey, { data, timestamp: Date.now() });
  return data;
};
