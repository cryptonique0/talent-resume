import { useState, useEffect } from 'react';
import { API_ENDPOINTS, fetcher } from '../config/api';

/**
 * Custom hook to fetch gas prices for a given chain
 * @param {number} chainId - Chain ID
 * @returns {Object} - Gas prices for slow, standard, and fast speeds
 */
export const useGasPrice = (chainId) => {
  const [gasPrices, setGasPrices] = useState({
    slow: null,
    standard: null,
    fast: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    if (!chainId) {
      setLoading(false);
      return;
    }

    const fetchGasPrice = async () => {
      try {
        setLoading(true);
        setError(null);

        let data;
        
        // Different APIs for different chains
        switch (chainId) {
          case 1: // Ethereum
            data = await fetcher(`${API_ENDPOINTS.ETHERSCAN_GAS}`);
            if (data && data.result) {
              setGasPrices({
                slow: Math.round(data.result.SafeGasPrice),
                standard: Math.round(data.result.ProposeGasPrice),
                fast: Math.round(data.result.FastGasPrice)
              });
            }
            break;
            
          case 137: // Polygon
            data = await fetcher(`${API_ENDPOINTS.POLYGONSCAN_GAS}`);
            if (data && data.result) {
              setGasPrices({
                slow: Math.round(data.result.SafeGasPrice),
                standard: Math.round(data.result.ProposeGasPrice),
                fast: Math.round(data.result.FastGasPrice)
              });
            }
            break;
            
          case 42220: // Celo
          case 44787: // Alfajores
            data = await fetcher(`${API_ENDPOINTS.CELOSCAN_GAS}`);
            if (data && data.result) {
              setGasPrices({
                slow: Math.round(data.result.SafeGasPrice),
                standard: Math.round(data.result.ProposeGasPrice),
                fast: Math.round(data.result.FastGasPrice)
              });
            }
            break;
            
          default:
            // Fallback to mock data for unsupported chains
            throw new Error(`Gas API not available for chain ${chainId}`);
        }
        
        setLastUpdate(new Date());
      } catch (err) {
        console.error('Error fetching gas prices:', err);
        setError(err.message);
        
        // Use mock data on error
        const baseGas = chainId === 1 ? 30 : 20; // Higher for Ethereum
        setGasPrices({
          slow: baseGas,
          standard: baseGas + 10,
          fast: baseGas + 20
        });
        setLastUpdate(new Date());
      } finally {
        setLoading(false);
      }
    };

    fetchGasPrice();

    // Update gas prices every 10 seconds
    const interval = setInterval(fetchGasPrice, 10000);

    return () => clearInterval(interval);
  }, [chainId]);

  return { gasPrices, loading, error, lastUpdate };
};

/**
 * Hook to estimate gas cost for a transaction
 * @param {number} chainId - Chain ID
 * @param {number} gasLimit - Estimated gas limit
 * @param {string} speed - 'slow', 'standard', or 'fast'
 * @returns {Object} - Estimated cost in native token and USD
 */
export const useGasCost = (chainId, gasLimit, speed = 'standard') => {
  const { gasPrices, loading } = useGasPrice(chainId);
  const [cost, setCost] = useState(null);
  const [costUSD, setCostUSD] = useState(null);

  useEffect(() => {
    if (!gasPrices[speed] || !gasLimit) {
      return;
    }

    const calculateCost = async () => {
      try {
        // Calculate gas cost in native token
        const gasPrice = gasPrices[speed];
        const costInGwei = gasPrice * gasLimit;
        const costInEth = costInGwei / 1e9; // Convert Gwei to ETH
        
        setCost(costInEth);

        // Get native token price in USD
        const nativeToken = getNativeTokenSymbol(chainId);
        const priceData = await fetcher(
          `${API_ENDPOINTS.COINGECKO}/simple/price?ids=${nativeToken}&vs_currencies=usd`
        );
        
        if (priceData && priceData[nativeToken]) {
          const tokenPriceUSD = priceData[nativeToken].usd;
          setCostUSD(costInEth * tokenPriceUSD);
        }
      } catch (err) {
        console.error('Error calculating gas cost:', err);
        // Use mock USD price
        setCostUSD(cost * 2000); // Assume ~$2000 per ETH
      }
    };

    calculateCost();
  }, [gasPrices, gasLimit, speed, chainId]);

  return { cost, costUSD, loading };
};

/**
 * Hook to get optimal gas settings based on priority
 * @param {number} chainId - Chain ID
 * @param {string} priority - 'low', 'medium', or 'high'
 * @returns {Object} - Recommended gas settings
 */
export const useOptimalGas = (chainId, priority = 'medium') => {
  const { gasPrices, loading, error } = useGasPrice(chainId);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    if (!gasPrices.standard) {
      return;
    }

    const priorityMap = {
      low: 'slow',
      medium: 'standard',
      high: 'fast'
    };

    const speed = priorityMap[priority] || 'standard';
    const gasPrice = gasPrices[speed];

    // Calculate max priority fee and max fee for EIP-1559
    const maxPriorityFeePerGas = Math.ceil(gasPrice * 0.1); // 10% tip
    const maxFeePerGas = gasPrice + maxPriorityFeePerGas;

    setSettings({
      gasPrice,
      maxPriorityFeePerGas,
      maxFeePerGas,
      speed,
      estimatedTime: getEstimatedTime(speed)
    });
  }, [gasPrices, priority]);

  return { settings, loading, error };
};

// Helper functions
function getNativeTokenSymbol(chainId) {
  const tokenMap = {
    1: 'ethereum',
    137: 'matic-network',
    42161: 'ethereum',
    10: 'ethereum',
    42220: 'celo',
    44787: 'celo',
    56: 'binancecoin',
    43114: 'avalanche-2'
  };
  
  return tokenMap[chainId] || 'ethereum';
}

function getEstimatedTime(speed) {
  const timeMap = {
    slow: '5-10 minutes',
    standard: '2-5 minutes',
    fast: '< 2 minutes'
  };
  
  return timeMap[speed] || '2-5 minutes';
}
