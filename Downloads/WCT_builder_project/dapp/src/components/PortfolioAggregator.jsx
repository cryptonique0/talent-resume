import { useState, useEffect } from 'react';
import { useAccount, useBalance, useNetwork } from 'wagmi';
import { formatUnits } from 'ethers';
import { celo, alfajores } from '../config/chains';

const SUPPORTED_CHAINS = [
  { id: 1, name: 'Ethereum', symbol: 'ETH' },
  { id: 137, name: 'Polygon', symbol: 'MATIC' },
  { id: 42161, name: 'Arbitrum', symbol: 'ETH' },
  { id: 42220, name: 'Celo', symbol: 'CELO' },
  { id: 44787, name: 'Alfajores', symbol: 'CELO' },
  { id: 11155111, name: 'Sepolia', symbol: 'ETH' }
];

export default function PortfolioAggregator() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const [portfolioData, setPortfolioData] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  // Mock price data - in production, fetch from CoinGecko or similar
  const prices = {
    ETH: 2000,
    MATIC: 0.85,
    CELO: 0.65,
    cUSD: 1.0,
    cEUR: 1.08,
    cREAL: 0.20
  };

  const { data: currentBalance } = useBalance({
    address,
    watch: true
  });

  useEffect(() => {
    if (!isConnected || !currentBalance) return;

    // Simulate multi-chain portfolio
    const mockPortfolio = SUPPORTED_CHAINS.map(supportedChain => {
      const isCurrentChain = chain?.id === supportedChain.id;
      const balance = isCurrentChain 
        ? parseFloat(formatUnits(currentBalance.value, currentBalance.decimals))
        : Math.random() * 5; // Mock balance for other chains

      const price = prices[supportedChain.symbol] || 0;
      const value = balance * price;

      return {
        chain: supportedChain.name,
        symbol: supportedChain.symbol,
        balance: balance.toFixed(4),
        price: price,
        value: value.toFixed(2),
        change24h: (Math.random() * 20 - 10).toFixed(2) // Random -10% to +10%
      };
    });

    setPortfolioData(mockPortfolio);
    setTotalValue(mockPortfolio.reduce((sum, item) => sum + parseFloat(item.value), 0));
  }, [isConnected, currentBalance, chain]);

  if (!isConnected) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        padding: '24px',
        margin: '20px auto',
        maxWidth: '800px',
        color: 'white',
        textAlign: 'center'
      }}>
        <h2>💼 Portfolio Overview</h2>
        <p>Connect your wallet to view your multi-chain portfolio</p>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '16px',
      padding: '24px',
      margin: '20px auto',
      maxWidth: '800px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ margin: '0 0 20px 0', color: 'white', fontSize: '24px' }}>
        💼 Multi-Chain Portfolio
      </h2>

      {/* Total Value Card */}
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
          Total Portfolio Value
        </div>
        <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
          ${totalValue.toFixed(2)}
        </div>
        <div style={{ fontSize: '14px', color: '#22c55e' }}>
          ↑ +5.2% (24h)
        </div>
      </div>

      {/* Chain Breakdown */}
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '16px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#333' }}>
          Assets by Chain
        </h3>
        <div style={{ display: 'grid', gap: '12px' }}>
          {portfolioData.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                background: chain?.id === SUPPORTED_CHAINS[index].id ? '#f0f9ff' : '#f8f9fa',
                borderRadius: '8px',
                border: chain?.id === SUPPORTED_CHAINS[index].id ? '2px solid #667eea' : 'none'
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', color: '#333' }}>
                  {item.chain}
                  {chain?.id === SUPPORTED_CHAINS[index].id && 
                    <span style={{ marginLeft: '8px', fontSize: '12px', color: '#667eea' }}>● Connected</span>
                  }
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {item.balance} {item.symbol}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'bold', color: '#333' }}>
                  ${item.value}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: parseFloat(item.change24h) >= 0 ? '#22c55e' : '#ef4444'
                }}>
                  {parseFloat(item.change24h) >= 0 ? '↑' : '↓'} {Math.abs(item.change24h)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '8px',
          padding: '12px',
          color: 'white',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
            {portfolioData.length}
          </div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Chains</div>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '8px',
          padding: '12px',
          color: 'white',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
            {portfolioData.filter(p => parseFloat(p.balance) > 0).length}
          </div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Active</div>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '8px',
          padding: '12px',
          color: 'white',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
            ${(totalValue / portfolioData.length).toFixed(0)}
          </div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Avg/Chain</div>
        </div>
      </div>

      <p style={{
        marginTop: '16px',
        fontSize: '12px',
        color: 'rgba(255,255,255,0.7)',
        textAlign: 'center'
      }}>
        💡 Switch networks to see real balances across chains
      </p>
    </div>
  );
}
