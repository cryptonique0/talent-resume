import { useState } from 'react';
import { useAccount } from 'wagmi';

export default function ProfitLossCalculator() {
  const { address } = useAccount();
  const [positions, setPositions] = useState([
    {
      id: 1,
      token: 'CELO',
      buyPrice: 0.65,
      currentPrice: 0.75,
      amount: 1000,
      timestamp: '2024-01-15'
    },
    {
      id: 2,
      token: 'ETH',
      buyPrice: 1800,
      currentPrice: 2000,
      amount: 5,
      timestamp: '2024-02-01'
    },
    {
      id: 3,
      token: 'cUSD',
      buyPrice: 1.0,
      currentPrice: 1.0,
      amount: 5000,
      timestamp: '2024-03-10'
    }
  ]);

  const [newPosition, setNewPosition] = useState({
    token: '',
    buyPrice: '',
    currentPrice: '',
    amount: ''
  });

  const calculatePL = (position) => {
    const invested = position.buyPrice * position.amount;
    const currentValue = position.currentPrice * position.amount;
    const profitLoss = currentValue - invested;
    const percentage = ((profitLoss / invested) * 100).toFixed(2);
    return { profitLoss, percentage, invested, currentValue };
  };

  const addPosition = () => {
    if (!newPosition.token || !newPosition.buyPrice || !newPosition.currentPrice || !newPosition.amount) {
      alert('Please fill all fields');
      return;
    }

    const position = {
      id: Date.now(),
      token: newPosition.token,
      buyPrice: parseFloat(newPosition.buyPrice),
      currentPrice: parseFloat(newPosition.currentPrice),
      amount: parseFloat(newPosition.amount),
      timestamp: new Date().toISOString().split('T')[0]
    };

    setPositions([...positions, position]);
    setNewPosition({ token: '', buyPrice: '', currentPrice: '', amount: '' });
  };

  const deletePosition = (id) => {
    setPositions(positions.filter(p => p.id !== id));
  };

  const totalStats = positions.reduce((acc, position) => {
    const pl = calculatePL(position);
    return {
      invested: acc.invested + pl.invested,
      currentValue: acc.currentValue + pl.currentValue,
      profitLoss: acc.profitLoss + pl.profitLoss
    };
  }, { invested: 0, currentValue: 0, profitLoss: 0 });

  const totalPercentage = totalStats.invested > 0
    ? ((totalStats.profitLoss / totalStats.invested) * 100).toFixed(2)
    : 0;

  if (!address) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        borderRadius: '16px',
        padding: '40px',
        textAlign: 'center',
        color: 'white',
        maxWidth: '800px',
        margin: '20px auto'
      }}>
        <h2 style={{ margin: '0 0 12px 0' }}>💰 P/L Calculator</h2>
        <p style={{ margin: 0 }}>Connect wallet to track your profit and loss</p>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      borderRadius: '16px',
      padding: '24px',
      maxWidth: '900px',
      margin: '20px auto',
      boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ margin: '0 0 8px 0', color: 'white', fontSize: '24px' }}>
        💰 Profit/Loss Calculator
      </h2>
      <p style={{ margin: '0 0 20px 0', color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
        Track your portfolio performance
      </p>

      {/* Total Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
            Total Invested
          </div>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#333' }}>
            ${totalStats.invested.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
            Current Value
          </div>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#333' }}>
            ${totalStats.currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
            Total P/L
          </div>
          <div style={{
            fontSize: '22px',
            fontWeight: 'bold',
            color: totalStats.profitLoss >= 0 ? '#10b981' : '#ef4444'
          }}>
            {totalStats.profitLoss >= 0 ? '+' : ''}${totalStats.profitLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div style={{
            fontSize: '13px',
            color: totalStats.profitLoss >= 0 ? '#10b981' : '#ef4444',
            fontWeight: 'bold'
          }}>
            {totalPercentage >= 0 ? '+' : ''}{totalPercentage}%
          </div>
        </div>
      </div>

      {/* Add Position Form */}
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#333' }}>
          Add Position
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
          <input
            type="text"
            placeholder="Token (e.g., BTC)"
            value={newPosition.token}
            onChange={(e) => setNewPosition({ ...newPosition, token: e.target.value })}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '14px'
            }}
          />
          <input
            type="number"
            placeholder="Buy Price"
            value={newPosition.buyPrice}
            onChange={(e) => setNewPosition({ ...newPosition, buyPrice: e.target.value })}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '14px'
            }}
          />
          <input
            type="number"
            placeholder="Current Price"
            value={newPosition.currentPrice}
            onChange={(e) => setNewPosition({ ...newPosition, currentPrice: e.target.value })}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '14px'
            }}
          />
          <input
            type="number"
            placeholder="Amount"
            value={newPosition.amount}
            onChange={(e) => setNewPosition({ ...newPosition, amount: e.target.value })}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '14px'
            }}
          />
          <button
            onClick={addPosition}
            style={{
              background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
              color: 'white',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Add Position
          </button>
        </div>
      </div>

      {/* Positions List */}
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#333' }}>
          Your Positions ({positions.length})
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {positions.map(position => {
            const pl = calculatePL(position);
            return (
              <div
                key={position.id}
                style={{
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  padding: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>
                    {position.amount} {position.token}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    Bought on {position.timestamp}
                  </div>
                </div>

                <div style={{ flex: 1, minWidth: '150px' }}>
                  <div style={{ fontSize: '12px', color: '#666' }}>Buy / Current</div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    ${position.buyPrice} / ${position.currentPrice}
                  </div>
                </div>

                <div style={{ flex: 1, minWidth: '150px' }}>
                  <div style={{ fontSize: '12px', color: '#666' }}>Invested / Value</div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    ${pl.invested.toFixed(2)} / ${pl.currentValue.toFixed(2)}
                  </div>
                </div>

                <div style={{ flex: 1, minWidth: '120px', textAlign: 'right' }}>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: pl.profitLoss >= 0 ? '#10b981' : '#ef4444'
                  }}>
                    {pl.profitLoss >= 0 ? '+' : ''}${pl.profitLoss.toFixed(2)}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: pl.profitLoss >= 0 ? '#10b981' : '#ef4444'
                  }}>
                    {pl.percentage >= 0 ? '+' : ''}{pl.percentage}%
                  </div>
                </div>

                <button
                  onClick={() => deletePosition(position.id)}
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
