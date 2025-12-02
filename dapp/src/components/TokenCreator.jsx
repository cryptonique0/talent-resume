import { useState } from 'react';
import { useAccount } from 'wagmi';

export default function TokenCreator() {
  const { address } = useAccount();
  const [step, setStep] = useState(1);
  const [tokenData, setTokenData] = useState({
    name: '',
    symbol: '',
    decimals: '18',
    totalSupply: '',
    tokenType: 'standard',
    features: {
      mintable: false,
      burnable: false,
      pausable: false,
      taxable: false
    },
    taxRate: '0'
  });

  const tokenTypes = [
    { id: 'standard', name: 'Standard ERC20', description: 'Basic fungible token' },
    { id: 'deflationary', name: 'Deflationary', description: 'Burns tokens on transfer' },
    { id: 'reflection', name: 'Reflection', description: 'Rewards holders automatically' },
    { id: 'liquidity', name: 'Liquidity Generation', description: 'Auto-adds to liquidity' }
  ];

  const handleFeatureToggle = (feature) => {
    setTokenData({
      ...tokenData,
      features: {
        ...tokenData.features,
        [feature]: !tokenData.features[feature]
      }
    });
  };

  const handleDeploy = () => {
    if (!tokenData.name || !tokenData.symbol || !tokenData.totalSupply) {
      alert('Please fill all required fields');
      return;
    }
    alert(`Deploying ${tokenData.name} (${tokenData.symbol}) with ${tokenData.totalSupply} tokens`);
  };

  const calculateGasCost = () => {
    let baseGas = 1200000;
    if (tokenData.features.mintable) baseGas += 100000;
    if (tokenData.features.burnable) baseGas += 80000;
    if (tokenData.features.pausable) baseGas += 120000;
    if (tokenData.features.taxable) baseGas += 150000;
    return baseGas;
  };

  const estimatedCost = ((calculateGasCost() * 30) / 1e9 * 2000).toFixed(2);

  if (!address) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        borderRadius: '16px',
        padding: '40px',
        textAlign: 'center',
        color: 'white',
        maxWidth: '800px',
        margin: '20px auto'
      }}>
        <h2 style={{ margin: '0 0 12px 0' }}>🪙 Token Creator</h2>
        <p style={{ margin: 0 }}>Connect wallet to create your own token</p>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      borderRadius: '16px',
      padding: '24px',
      maxWidth: '800px',
      margin: '20px auto',
      boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ margin: '0 0 8px 0', color: 'white', fontSize: '24px' }}>
        🪙 Token Creator Wizard
      </h2>
      <p style={{ margin: '0 0 20px 0', color: 'rgba(255,255,255,0.95)', fontSize: '14px' }}>
        Create your ERC20 token in minutes - no coding required
      </p>

      {/* Progress Steps */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '24px',
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '12px',
        padding: '16px'
      }}>
        {['Basic Info', 'Token Type', 'Features', 'Review'].map((label, idx) => (
          <div
            key={idx}
            style={{
              flex: 1,
              textAlign: 'center',
              color: 'white',
              opacity: step >= idx + 1 ? 1 : 0.5
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: step >= idx + 1 ? 'white' : 'transparent',
              color: step >= idx + 1 ? '#fa709a' : 'white',
              border: '2px solid white',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              {idx + 1}
            </div>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '12px',
        padding: '24px',
        minHeight: '400px'
      }}>
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#333' }}>
              Basic Token Information
            </h3>
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333'
              }}>
                Token Name *
              </label>
              <input
                type="text"
                value={tokenData.name}
                onChange={(e) => setTokenData({ ...tokenData, name: e.target.value })}
                placeholder="e.g., My Awesome Token"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333'
              }}>
                Token Symbol *
              </label>
              <input
                type="text"
                value={tokenData.symbol}
                onChange={(e) => setTokenData({ ...tokenData, symbol: e.target.value.toUpperCase() })}
                placeholder="e.g., MAT"
                maxLength={10}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333'
              }}>
                Total Supply *
              </label>
              <input
                type="number"
                value={tokenData.totalSupply}
                onChange={(e) => setTokenData({ ...tokenData, totalSupply: e.target.value })}
                placeholder="e.g., 1000000"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333'
              }}>
                Decimals
              </label>
              <select
                value={tokenData.decimals}
                onChange={(e) => setTokenData({ ...tokenData, decimals: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                <option value="18">18 (Standard)</option>
                <option value="6">6 (USDC-style)</option>
                <option value="8">8 (Bitcoin-style)</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 2: Token Type */}
        {step === 2 && (
          <div>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#333' }}>
              Choose Token Type
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {tokenTypes.map(type => (
                <div
                  key={type.id}
                  onClick={() => setTokenData({ ...tokenData, tokenType: type.id })}
                  style={{
                    background: tokenData.tokenType === type.id ? '#fee140' : '#f8f9fa',
                    border: tokenData.tokenType === type.id ? '2px solid #fa709a' : '2px solid transparent',
                    borderRadius: '12px',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{
                    fontWeight: 'bold',
                    fontSize: '16px',
                    marginBottom: '4px',
                    color: '#333'
                  }}>
                    {type.name}
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    {type.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Features */}
        {step === 3 && (
          <div>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#333' }}>
              Advanced Features
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {Object.entries({
                mintable: 'Allow minting new tokens after deployment',
                burnable: 'Allow token holders to burn their tokens',
                pausable: 'Ability to pause all token transfers',
                taxable: 'Apply tax on transfers (for rewards/liquidity)'
              }).map(([key, description]) => (
                <div
                  key={key}
                  style={{
                    background: '#f8f9fa',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontWeight: 'bold',
                      fontSize: '15px',
                      marginBottom: '4px',
                      textTransform: 'capitalize'
                    }}>
                      {key}
                    </div>
                    <div style={{ fontSize: '13px', color: '#666' }}>
                      {description}
                    </div>
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={tokenData.features[key]}
                      onChange={() => handleFeatureToggle(key)}
                      style={{
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer'
                      }}
                    />
                  </label>
                </div>
              ))}

              {tokenData.features.taxable && (
                <div style={{
                  background: '#fff3cd',
                  borderRadius: '8px',
                  padding: '16px',
                  border: '1px solid #ffc107'
                }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="25"
                    value={tokenData.taxRate}
                    onChange={(e) => setTokenData({ ...tokenData, taxRate: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: '1px solid #ddd',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#333' }}>
              Review & Deploy
            </h3>
            <div style={{
              background: '#f8f9fa',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666' }}>Token Name:</span>
                <span style={{ fontWeight: 'bold' }}>{tokenData.name}</span>
              </div>
              <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666' }}>Symbol:</span>
                <span style={{ fontWeight: 'bold' }}>{tokenData.symbol}</span>
              </div>
              <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666' }}>Total Supply:</span>
                <span style={{ fontWeight: 'bold' }}>
                  {parseInt(tokenData.totalSupply).toLocaleString()} tokens
                </span>
              </div>
              <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666' }}>Decimals:</span>
                <span style={{ fontWeight: 'bold' }}>{tokenData.decimals}</span>
              </div>
              <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666' }}>Token Type:</span>
                <span style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                  {tokenData.tokenType}
                </span>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ color: '#666', marginBottom: '8px' }}>Features:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {Object.entries(tokenData.features)
                    .filter(([_, enabled]) => enabled)
                    .map(([feature]) => (
                      <span
                        key={feature}
                        style={{
                          background: '#fa709a',
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          textTransform: 'capitalize'
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  {Object.values(tokenData.features).every(v => !v) && (
                    <span style={{ color: '#999', fontSize: '13px' }}>None selected</span>
                  )}
                </div>
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              padding: '20px',
              color: 'white',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                Estimated Deployment Cost
              </div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>
                ${estimatedCost}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>
                ~{calculateGasCost().toLocaleString()} gas at 30 gwei
              </div>
            </div>

            <button
              onClick={handleDeploy}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                color: 'white',
                border: 'none',
                padding: '16px',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Deploy Token Contract
            </button>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '24px',
          paddingTop: '24px',
          borderTop: '1px solid #e5e7eb'
        }}>
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              style={{
                background: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '10px 24px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              ← Back
            </button>
          )}
          {step < 4 && (
            <button
              onClick={() => setStep(step + 1)}
              style={{
                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                color: 'white',
                border: 'none',
                padding: '10px 24px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginLeft: 'auto'
              }}
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
