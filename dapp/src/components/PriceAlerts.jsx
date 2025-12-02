import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

const PriceAlerts = () => {
  const { address } = useAccount();
  const [alerts, setAlerts] = useState([]);
  const [newAlert, setNewAlert] = useState({
    token: 'CELO',
    condition: 'above',
    price: '',
    enabled: true
  });
  const [tokenPrices, setTokenPrices] = useState({});
  const [loading, setLoading] = useState(false);

  const tokens = [
    { symbol: 'CELO', name: 'Celo', icon: '🌿' },
    { symbol: 'ETH', name: 'Ethereum', icon: '💎' },
    { symbol: 'BTC', name: 'Bitcoin', icon: '₿' },
    { symbol: 'cUSD', name: 'Celo Dollar', icon: '💵' },
    { symbol: 'cEUR', name: 'Celo Euro', icon: '💶' },
    { symbol: 'MATIC', name: 'Polygon', icon: '⬡' }
  ];

  useEffect(() => {
    // Mock current prices
    setTokenPrices({
      CELO: 0.65,
      ETH: 2450.30,
      BTC: 43210.50,
      cUSD: 1.00,
      cEUR: 1.08,
      MATIC: 0.85
    });

    // Mock existing alerts
    if (address) {
      setAlerts([
        {
          id: 1,
          token: 'CELO',
          condition: 'above',
          targetPrice: 0.75,
          currentPrice: 0.65,
          enabled: true,
          triggered: false,
          createdAt: Math.floor(Date.now() / 1000) - 86400
        },
        {
          id: 2,
          token: 'ETH',
          condition: 'below',
          targetPrice: 2400,
          currentPrice: 2450.30,
          enabled: true,
          triggered: false,
          createdAt: Math.floor(Date.now() / 1000) - 172800
        },
        {
          id: 3,
          token: 'BTC',
          condition: 'above',
          targetPrice: 45000,
          currentPrice: 43210.50,
          enabled: false,
          triggered: false,
          createdAt: Math.floor(Date.now() / 1000) - 259200
        }
      ]);
    }

    // Simulate price updates
    const interval = setInterval(() => {
      setTokenPrices(prev => ({
        CELO: prev.CELO * (1 + (Math.random() - 0.5) * 0.02),
        ETH: prev.ETH * (1 + (Math.random() - 0.5) * 0.02),
        BTC: prev.BTC * (1 + (Math.random() - 0.5) * 0.02),
        cUSD: 1.00,
        cEUR: 1.08,
        MATIC: prev.MATIC * (1 + (Math.random() - 0.5) * 0.02)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [address]);

  const handleCreateAlert = async () => {
    if (!address) return;
    if (!newAlert.price || parseFloat(newAlert.price) <= 0) {
      alert('Please enter a valid price');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const alert = {
        id: Date.now(),
        token: newAlert.token,
        condition: newAlert.condition,
        targetPrice: parseFloat(newAlert.price),
        currentPrice: tokenPrices[newAlert.token],
        enabled: true,
        triggered: false,
        createdAt: Math.floor(Date.now() / 1000)
      };

      setAlerts(prev => [alert, ...prev]);
      setNewAlert({ token: 'CELO', condition: 'above', price: '', enabled: true });
      
      alert('Price alert created successfully!');
    } catch (error) {
      alert('Failed to create alert: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAlert = async (alertId) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, enabled: !alert.enabled } : alert
    ));
  };

  const handleDeleteAlert = async (alertId) => {
    if (!confirm('Are you sure you want to delete this alert?')) return;

    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const getDistanceToTarget = (alert) => {
    const current = tokenPrices[alert.token] || alert.currentPrice;
    const target = alert.targetPrice;
    const distance = ((target - current) / current) * 100;
    
    return {
      distance,
      percentage: Math.abs(distance).toFixed(2),
      direction: distance > 0 ? 'up' : 'down'
    };
  };

  const isAlertClose = (alert) => {
    const { percentage } = getDistanceToTarget(alert);
    return parseFloat(percentage) < 5;
  };

  const formatPrice = (price) => {
    if (price >= 1000) {
      return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${price.toFixed(4)}`;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  if (!address) {
    return (
      <div style={{
        padding: '2rem',
        background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
        borderRadius: '12px',
        textAlign: 'center',
        color: 'white'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>Price Alerts 🔔</h2>
        <p>Please connect your wallet to set up price alerts</p>
      </div>
    );
  }

  return (
    <div style={{
      padding: '2rem',
      background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
      borderRadius: '12px'
    }}>
      <h2 style={{ color: 'white', marginBottom: '0.5rem' }}>
        Price Alerts 🔔
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '2rem' }}>
        Get notified when tokens reach your target price
      </p>

      {/* Current Prices */}
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ margin: '0 0 1rem 0' }}>Current Prices</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem'
        }}>
          {tokens.map(token => (
            <div key={token.symbol} style={{
              background: '#f3f4f6',
              padding: '0.75rem',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
                {token.icon}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.25rem' }}>
                {token.symbol}
              </div>
              <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                {formatPrice(tokenPrices[token.symbol] || 0)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create New Alert */}
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ margin: '0 0 1rem 0' }}>Create New Alert</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr auto', gap: '0.75rem', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: '#666' }}>
              Token
            </label>
            <select
              value={newAlert.token}
              onChange={(e) => setNewAlert({ ...newAlert, token: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              {tokens.map(token => (
                <option key={token.symbol} value={token.symbol}>
                  {token.symbol}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: '#666' }}>
              Condition
            </label>
            <select
              value={newAlert.condition}
              onChange={(e) => setNewAlert({ ...newAlert, condition: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              <option value="above">Above</option>
              <option value="below">Below</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: '#666' }}>
              Target Price (USD)
            </label>
            <input
              type="number"
              step="0.01"
              value={newAlert.price}
              onChange={(e) => setNewAlert({ ...newAlert, price: e.target.value })}
              placeholder="0.00"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>

          <button
            onClick={handleCreateAlert}
            disabled={loading}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              opacity: loading ? 0.5 : 1,
              whiteSpace: 'nowrap'
            }}
          >
            {loading ? 'Creating...' : 'Create Alert'}
          </button>
        </div>
      </div>

      {/* Active Alerts */}
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        padding: '1.5rem',
        borderRadius: '12px'
      }}>
        <h3 style={{ margin: '0 0 1rem 0' }}>
          Active Alerts ({alerts.filter(a => a.enabled).length})
        </h3>

        {alerts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            color: '#666'
          }}>
            <p>No price alerts yet.</p>
            <p>Create one above to get started!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {alerts.map(alert => {
              const distance = getDistanceToTarget(alert);
              const isClose = isAlertClose(alert);
              const currentPrice = tokenPrices[alert.token] || alert.currentPrice;
              const tokenInfo = tokens.find(t => t.symbol === alert.token);

              return (
                <div
                  key={alert.id}
                  style={{
                    background: alert.enabled ? 'white' : '#f9fafb',
                    border: `2px solid ${isClose && alert.enabled ? '#fbbf24' : '#e5e7eb'}`,
                    padding: '1rem',
                    borderRadius: '8px',
                    opacity: alert.enabled ? 1 : 0.6
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>{tokenInfo?.icon}</span>
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>
                          {alert.token} {alert.condition === 'above' ? '↑' : '↓'} {formatPrice(alert.targetPrice)}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#666' }}>
                          Created {formatDate(alert.createdAt)}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleToggleAlert(alert.id)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: alert.enabled ? '#6b7280' : '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '0.875rem',
                          cursor: 'pointer'
                        }}
                      >
                        {alert.enabled ? 'Disable' : 'Enable'}
                      </button>
                      <button
                        onClick={() => handleDeleteAlert(alert.id)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '0.875rem',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '1rem',
                    padding: '0.75rem',
                    background: '#f3f4f6',
                    borderRadius: '6px'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.875rem', color: '#666' }}>Current Price</div>
                      <div style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>
                        {formatPrice(currentPrice)}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.875rem', color: '#666' }}>Target Price</div>
                      <div style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>
                        {formatPrice(alert.targetPrice)}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.875rem', color: '#666' }}>Distance</div>
                      <div style={{
                        fontWeight: 'bold',
                        fontSize: '1.125rem',
                        color: isClose ? '#f59e0b' : '#666'
                      }}>
                        {distance.percentage}% {distance.direction === 'up' ? '↑' : '↓'}
                      </div>
                    </div>
                  </div>

                  {isClose && alert.enabled && (
                    <div style={{
                      marginTop: '0.75rem',
                      padding: '0.75rem',
                      background: '#fef3c7',
                      borderRadius: '6px',
                      color: '#92400e',
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span>⚠️</span>
                      <span>Close to target! Only {distance.percentage}% away</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceAlerts;
