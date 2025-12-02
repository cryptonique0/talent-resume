import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

const YieldFarming = () => {
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState('farms');
  const [farms, setFarms] = useState([]);
  const [userPositions, setUserPositions] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mock farm data
    setFarms([
      {
        id: 1,
        name: 'CELO-cUSD LP',
        pair: 'CELO/cUSD',
        protocol: 'Ubeswap',
        apy: 145.5,
        tvl: 2500000,
        rewardToken: 'UBE',
        dailyReward: 1200,
        multiplier: '5x',
        depositFee: 0,
        withdrawalFee: 0.1,
        logo: '🌾'
      },
      {
        id: 2,
        name: 'ETH-USDC LP',
        pair: 'ETH/USDC',
        protocol: 'SushiSwap',
        apy: 89.3,
        tvl: 5000000,
        rewardToken: 'SUSHI',
        dailyReward: 800,
        multiplier: '3x',
        depositFee: 0,
        withdrawalFee: 0.1,
        logo: '🍣'
      },
      {
        id: 3,
        name: 'cUSD-cEUR LP',
        pair: 'cUSD/cEUR',
        protocol: 'Symmetric',
        apy: 67.8,
        tvl: 1200000,
        rewardToken: 'SYMM',
        dailyReward: 500,
        multiplier: '2x',
        depositFee: 0,
        withdrawalFee: 0,
        logo: '⚖️'
      },
      {
        id: 4,
        name: 'MATIC-USDC LP',
        pair: 'MATIC/USDC',
        protocol: 'QuickSwap',
        apy: 112.4,
        tvl: 3500000,
        rewardToken: 'QUICK',
        dailyReward: 1500,
        multiplier: '4x',
        depositFee: 0,
        withdrawalFee: 0.1,
        logo: '⚡'
      },
      {
        id: 5,
        name: 'CELO Single Stake',
        pair: 'CELO',
        protocol: 'Moola',
        apy: 34.5,
        tvl: 8000000,
        rewardToken: 'MOO',
        dailyReward: 2000,
        multiplier: '1x',
        depositFee: 0,
        withdrawalFee: 0,
        logo: '🐮'
      }
    ]);

    // Mock user positions
    if (address) {
      setUserPositions([
        {
          farmId: 1,
          name: 'CELO-cUSD LP',
          staked: 5000,
          earned: 125.5,
          rewardToken: 'UBE',
          value: 5200,
          apy: 145.5
        },
        {
          farmId: 4,
          name: 'MATIC-USDC LP',
          staked: 2500,
          earned: 68.3,
          rewardToken: 'QUICK',
          value: 2580,
          apy: 112.4
        }
      ]);
    }
  }, [address]);

  const handleStake = async (farm) => {
    if (!address) return;
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      // Simulate staking
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`Successfully staked ${stakeAmount} ${farm.pair} LP tokens`);
      setStakeAmount('');
      setSelectedFarm(null);
    } catch (error) {
      alert('Staking failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUnstake = async (position) => {
    if (!address) return;

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`Successfully unstaked from ${position.name}`);
    } catch (error) {
      alert('Unstaking failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleHarvest = async (position) => {
    if (!address) return;

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert(`Harvested ${position.earned.toFixed(2)} ${position.rewardToken}`);
    } catch (error) {
      alert('Harvest failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCompound = async (position) => {
    if (!address) return;

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`Compounded rewards for ${position.name}`);
    } catch (error) {
      alert('Compound failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  if (!address) {
    return (
      <div style={{
        padding: '2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px',
        textAlign: 'center',
        color: 'white'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>Yield Farming 🌾</h2>
        <p>Please connect your wallet to start farming</p>
      </div>
    );
  }

  return (
    <div style={{
      padding: '2rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '12px'
    }}>
      <h2 style={{ color: 'white', marginBottom: '0.5rem' }}>
        Yield Farming 🌾
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '2rem' }}>
        Earn rewards by providing liquidity
      </p>

      {/* Summary Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          padding: '1rem',
          borderRadius: '8px'
        }}>
          <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.25rem' }}>
            Total Staked
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
            {formatCurrency(userPositions.reduce((sum, p) => sum + p.staked, 0))}
          </div>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.95)',
          padding: '1rem',
          borderRadius: '8px'
        }}>
          <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.25rem' }}>
            Total Earned
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
            {formatCurrency(userPositions.reduce((sum, p) => sum + p.earned, 0))}
          </div>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.95)',
          padding: '1rem',
          borderRadius: '8px'
        }}>
          <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.25rem' }}>
            Active Farms
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
            {userPositions.length}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setActiveTab('farms')}
          style={{
            flex: 1,
            padding: '0.75rem',
            background: activeTab === 'farms' ? 'white' : 'rgba(255,255,255,0.2)',
            color: activeTab === 'farms' ? '#667eea' : 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          All Farms ({farms.length})
        </button>
        <button
          onClick={() => setActiveTab('positions')}
          style={{
            flex: 1,
            padding: '0.75rem',
            background: activeTab === 'positions' ? 'white' : 'rgba(255,255,255,0.2)',
            color: activeTab === 'positions' ? '#667eea' : 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          My Positions ({userPositions.length})
        </button>
      </div>

      {/* Content */}
      {activeTab === 'farms' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {farms.map(farm => (
            <div
              key={farm.id}
              style={{
                background: 'rgba(255,255,255,0.95)',
                padding: '1.5rem',
                borderRadius: '8px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{farm.logo}</span>
                    <h3 style={{ margin: 0 }}>{farm.name}</h3>
                    <span style={{
                      background: '#667eea',
                      color: 'white',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}>
                      {farm.multiplier}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    {farm.protocol} • Daily: {farm.dailyReward} {farm.rewardToken}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#10b981' }}>
                    {farm.apy.toFixed(1)}%
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>APY</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>TVL</div>
                  <div style={{ fontWeight: 'bold' }}>{formatCurrency(farm.tvl)}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>Deposit Fee</div>
                  <div style={{ fontWeight: 'bold' }}>{farm.depositFee}%</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>Withdrawal Fee</div>
                  <div style={{ fontWeight: 'bold' }}>{farm.withdrawalFee}%</div>
                </div>
              </div>

              {selectedFarm?.id === farm.id ? (
                <div>
                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder="Amount to stake"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      marginBottom: '0.5rem'
                    }}
                  />
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleStake(farm)}
                      disabled={loading}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        background: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        opacity: loading ? 0.5 : 1
                      }}
                    >
                      {loading ? 'Staking...' : 'Confirm Stake'}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedFarm(null);
                        setStakeAmount('');
                      }}
                      style={{
                        padding: '0.75rem 1rem',
                        background: '#6b7280',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedFarm(farm)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Stake LP Tokens
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'positions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {userPositions.length === 0 ? (
            <div style={{
              background: 'rgba(255,255,255,0.95)',
              padding: '2rem',
              borderRadius: '8px',
              textAlign: 'center',
              color: '#666'
            }}>
              <p>You don't have any active positions yet.</p>
              <p>Start farming to earn rewards!</p>
            </div>
          ) : (
            userPositions.map((position, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  padding: '1.5rem',
                  borderRadius: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>{position.name}</h3>
                    <div style={{ fontSize: '0.875rem', color: '#666' }}>
                      APY: {position.apy.toFixed(1)}%
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
                      {formatCurrency(position.value)}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#666' }}>Total Value</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#666' }}>Staked</div>
                    <div style={{ fontWeight: 'bold' }}>{formatCurrency(position.staked)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#666' }}>Earned</div>
                    <div style={{ fontWeight: 'bold', color: '#10b981' }}>
                      {position.earned.toFixed(2)} {position.rewardToken}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleHarvest(position)}
                    disabled={loading}
                    style={{
                      padding: '0.75rem',
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      opacity: loading ? 0.5 : 1
                    }}
                  >
                    Harvest
                  </button>
                  <button
                    onClick={() => handleCompound(position)}
                    disabled={loading}
                    style={{
                      padding: '0.75rem',
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      opacity: loading ? 0.5 : 1
                    }}
                  >
                    Compound
                  </button>
                  <button
                    onClick={() => handleUnstake(position)}
                    disabled={loading}
                    style={{
                      padding: '0.75rem',
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      opacity: loading ? 0.5 : 1
                    }}
                  >
                    Unstake
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default YieldFarming;
