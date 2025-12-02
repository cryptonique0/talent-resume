import { useState, useEffect } from 'react';
import { useNetwork } from 'wagmi';

export default function GasTracker() {
  const { chain } = useNetwork();
  const [gasPrice, setGasPrice] = useState({
    slow: { price: 15, time: '~5 min' },
    standard: { price: 25, time: '~2 min' },
    fast: { price: 35, time: '~30 sec' }
  });
  const [selectedSpeed, setSelectedSpeed] = useState('standard');
  const [estimatedCost, setEstimatedCost] = useState(0);

  // Mock gas price updates - in production, use Etherscan/Polygonscan API
  useEffect(() => {
    const interval = setInterval(() => {
      const variance = Math.random() * 10 - 5;
      setGasPrice({
        slow: { price: Math.max(10, 15 + variance), time: '~5 min' },
        standard: { price: Math.max(15, 25 + variance), time: '~2 min' },
        fast: { price: Math.max(20, 35 + variance), time: '~30 sec' }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Calculate estimated cost for common operations
  const operations = {
    'ETH Transfer': 21000,
    'ERC20 Transfer': 65000,
    'Token Swap': 150000,
    'NFT Mint': 100000,
    'Contract Deploy': 500000
  };

  const calculateCost = (gasLimit, speed) => {
    const gasPriceGwei = gasPrice[speed].price;
    const costEth = (gasLimit * gasPriceGwei) / 1e9;
    const costUsd = costEth * 2000; // Mock ETH price
    return { eth: costEth.toFixed(6), usd: costUsd.toFixed(2) };
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '16px',
      padding: '24px',
      maxWidth: '700px',
      margin: '20px auto',
      boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ margin: '0 0 8px 0', color: 'white', fontSize: '24px' }}>
        ⛽ Gas Tracker
      </h2>
      <p style={{ margin: '0 0 20px 0', color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
        Real-time gas prices on {chain?.name || 'network'}
      </p>

      {/* Gas Price Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        marginBottom: '20px'
      }}>
        {Object.entries(gasPrice).map(([speed, data]) => (
          <div
            key={speed}
            onClick={() => setSelectedSpeed(speed)}
            style={{
              background: selectedSpeed === speed ? 'white' : 'rgba(255,255,255,0.9)',
              borderRadius: '12px',
              padding: '16px',
              cursor: 'pointer',
              border: selectedSpeed === speed ? '3px solid #667eea' : 'none',
              transition: 'all 0.2s',
              transform: selectedSpeed === speed ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            <div style={{
              fontSize: '12px',
              color: '#666',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              {speed}
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: selectedSpeed === speed ? '#667eea' : '#333',
              marginBottom: '4px'
            }}>
              {data.price.toFixed(1)}
            </div>
            <div style={{ fontSize: '11px', color: '#999' }}>
              Gwei • {data.time}
            </div>
          </div>
        ))}
      </div>

      {/* Cost Estimator */}
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#333' }}>
          Estimated Transaction Costs
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {Object.entries(operations).map(([operation, gasLimit]) => {
            const cost = calculateCost(gasLimit, selectedSpeed);
            return (
              <div
                key={operation}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  background: '#f8f9fa',
                  borderRadius: '8px'
                }}
              >
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '2px' }}>
                    {operation}
                  </div>
                  <div style={{ fontSize: '11px', color: '#999' }}>
                    {gasLimit.toLocaleString()} gas
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#667eea' }}>
                    ${cost.usd}
                  </div>
                  <div style={{ fontSize: '11px', color: '#999' }}>
                    {cost.eth} ETH
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gas Price History Chart (simplified) */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '16px',
        marginTop: '16px',
        color: 'white'
      }}>
        <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '12px' }}>
          24H Average: {((gasPrice.slow.price + gasPrice.standard.price + gasPrice.fast.price) / 3).toFixed(1)} Gwei
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.3)', borderRadius: '2px', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: '60%',
              background: 'white',
              borderRadius: '2px'
            }} />
          </div>
          <span style={{ fontSize: '12px', opacity: 0.8 }}>Avg trend ↗</span>
        </div>
      </div>

      <p style={{
        marginTop: '16px',
        fontSize: '12px',
        color: 'rgba(255,255,255,0.7)',
        textAlign: 'center',
        margin: '16px 0 0 0'
      }}>
        💡 Gas prices update every 5 seconds
      </p>
    </div>
  );
}
