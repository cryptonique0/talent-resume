import { useState } from 'react';
import { useAccount } from 'wagmi';

export default function WalletAnalytics() {
  const { address } = useAccount();

  const analytics = {
    totalValue: 25430.50,
    change24h: 3.2,
    topHolding: 'CELO',
    transactionCount: 342,
    avgTxValue: 74.30,
    gasSpent: 125.45,
    profitLoss: 2340.20,
    winRate: 68.5
  };

  const holdings = [
    { token: 'CELO', value: 12500, percentage: 49.1, change: 5.2 },
    { token: 'ETH', value: 6200, percentage: 24.4, change: -1.8 },
    { token: 'cUSD', value: 4130, percentage: 16.2, change: 0.1 },
    { token: 'MATIC', value: 2600, percentage: 10.2, change: 8.4 }
  ];

  const transactionPatterns = [
    { type: 'Swaps', count: 145, percentage: 42.4 },
    { type: 'Transfers', count: 98, percentage: 28.7 },
    { type: 'Staking', count: 56, percentage: 16.4 },
    { type: 'NFT', count: 43, percentage: 12.6 }
  ];

  const monthlyActivity = [
    { month: 'Jul', txs: 28, volume: 5200 },
    { month: 'Aug', txs: 45, volume: 8100 },
    { month: 'Sep', txs: 52, volume: 9300 },
    { month: 'Oct', txs: 67, volume: 11800 },
    { month: 'Nov', txs: 89, volume: 15400 },
    { month: 'Dec', txs: 61, volume: 12200 }
  ];

  const maxVolume = Math.max(...monthlyActivity.map(m => m.volume));

  if (!address) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        padding: '40px',
        textAlign: 'center',
        color: 'white',
        maxWidth: '1000px',
        margin: '20px auto'
      }}>
        <h2 style={{ margin: '0 0 12px 0' }}>📊 Wallet Analytics</h2>
        <p style={{ margin: 0 }}>Connect wallet to view analytics</p>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '16px',
      padding: '24px',
      maxWidth: '1200px',
      margin: '20px auto',
      boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ margin: '0 0 8px 0', color: 'white', fontSize: '24px' }}>
        📊 Wallet Analytics Dashboard
      </h2>
      <p style={{ margin: '0 0 20px 0', color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
        Comprehensive insights into your wallet activity
      </p>

      {/* Key Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '18px'
        }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
            Total Portfolio Value
          </div>
          <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#667eea' }}>
            ${analytics.totalValue.toLocaleString()}
          </div>
          <div style={{
            fontSize: '13px',
            color: analytics.change24h >= 0 ? '#10b981' : '#ef4444',
            fontWeight: 'bold'
          }}>
            {analytics.change24h >= 0 ? '+' : ''}{analytics.change24h}% (24h)
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '18px'
        }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
            Total Transactions
          </div>
          <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#667eea' }}>
            {analytics.transactionCount}
          </div>
          <div style={{ fontSize: '13px', color: '#666' }}>
            Avg: ${analytics.avgTxValue}/tx
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '18px'
        }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
            Total P/L
          </div>
          <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#10b981' }}>
            +${analytics.profitLoss.toLocaleString()}
          </div>
          <div style={{ fontSize: '13px', color: '#10b981', fontWeight: 'bold' }}>
            {analytics.winRate}% win rate
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '18px'
        }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
            Gas Spent
          </div>
          <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#ef4444' }}>
            ${analytics.gasSpent}
          </div>
          <div style={{ fontSize: '13px', color: '#666' }}>
            All-time
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
        gap: '16px',
        marginBottom: '16px'
      }}>
        {/* Holdings Breakdown */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#333' }}>
            Portfolio Breakdown
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {holdings.map(holding => (
              <div key={holding.token}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  alignItems: 'center'
                }}>
                  <div>
                    <span style={{ fontWeight: 'bold', fontSize: '14px' }}>
                      {holding.token}
                    </span>
                    <span style={{
                      marginLeft: '8px',
                      fontSize: '12px',
                      color: holding.change >= 0 ? '#10b981' : '#ef4444',
                      fontWeight: 'bold'
                    }}>
                      {holding.change >= 0 ? '+' : ''}{holding.change}%
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                      ${holding.value.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '11px', color: '#999' }}>
                      {holding.percentage}%
                    </div>
                  </div>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: '#e5e7eb',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${holding.percentage}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction Patterns */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#333' }}>
            Transaction Patterns
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {transactionPatterns.map(pattern => (
              <div key={pattern.type}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px'
                }}>
                  <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    {pattern.type}
                  </span>
                  <span style={{ fontSize: '14px', color: '#666' }}>
                    {pattern.count} ({pattern.percentage}%)
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: '#e5e7eb',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${pattern.percentage}%`,
                    height: '100%',
                    background: '#764ba2'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Activity Chart */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#333' }}>
          6-Month Activity Overview
        </h3>
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-around',
          height: '200px',
          gap: '8px'
        }}>
          {monthlyActivity.map(month => (
            <div
              key={month.month}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                height: '100%'
              }}
            >
              <div style={{
                width: '100%',
                background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '6px 6px 0 0',
                height: `${(month.volume / maxVolume) * 100}%`,
                minHeight: '20px',
                position: 'relative',
                cursor: 'pointer',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              title={`$${month.volume.toLocaleString()} volume`}
              >
                <div style={{
                  position: 'absolute',
                  top: '-25px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  color: '#667eea',
                  whiteSpace: 'nowrap'
                }}>
                  {month.txs} txs
                </div>
              </div>
              <div style={{
                marginTop: '8px',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#666'
              }}>
                {month.month}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
