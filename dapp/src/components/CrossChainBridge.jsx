import { useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';

export default function CrossChainBridge() {
  const { address } = useAccount();
  const { chain } = useNetwork();

  const [fromChain, setFromChain] = useState('ethereum');
  const [toChain, setToChain] = useState('celo');
  const [token, setToken] = useState('ETH');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const chains = [
    { id: 'ethereum', name: 'Ethereum', color: '#627eea' },
    { id: 'celo', name: 'Celo', color: '#35d07f' },
    { id: 'polygon', name: 'Polygon', color: '#8247e5' },
    { id: 'arbitrum', name: 'Arbitrum', color: '#28a0f0' },
    { id: 'optimism', name: 'Optimism', color: '#ff0420' },
    { id: 'avalanche', name: 'Avalanche', color: '#e84142' }
  ];

  const tokens = ['ETH', 'USDC', 'USDT', 'DAI', 'WETH'];

  const [bridgeHistory] = useState([
    {
      id: 1,
      from: 'Ethereum',
      to: 'Celo',
      token: 'ETH',
      amount: 0.5,
      status: 'completed',
      timestamp: '2024-11-15 14:23',
      txHash: '0xabc...123'
    },
    {
      id: 2,
      from: 'Polygon',
      to: 'Ethereum',
      token: 'USDC',
      amount: 1000,
      status: 'pending',
      timestamp: '2024-11-20 09:15',
      txHash: '0xdef...456'
    }
  ]);

  const estimatedFee = amount ? (parseFloat(amount) * 0.001).toFixed(6) : '0';
  const estimatedTime = '5-15 minutes';

  const handleBridge = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    if (fromChain === toChain) {
      alert('Source and destination chains must be different');
      return;
    }
    alert(`Bridging ${amount} ${token} from ${fromChain} to ${toChain}`);
  };

  const swapChains = () => {
    const temp = fromChain;
    setFromChain(toChain);
    setToChain(temp);
  };

  if (!address) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        padding: '40px',
        textAlign: 'center',
        color: 'white',
        maxWidth: '900px',
        margin: '20px auto'
      }}>
        <h2 style={{ margin: '0 0 12px 0' }}>🌉 Cross-Chain Bridge</h2>
        <p style={{ margin: 0 }}>Connect wallet to bridge assets across chains</p>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '16px',
      padding: '24px',
      maxWidth: '800px',
      margin: '20px auto',
      boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ margin: '0 0 8px 0', color: 'white', fontSize: '24px' }}>
        🌉 Cross-Chain Bridge
      </h2>
      <p style={{ margin: '0 0 20px 0', color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
        Transfer assets seamlessly between blockchains
      </p>

      {/* Bridge Interface */}
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '12px',
        padding: '24px'
      }}>
        {/* From Chain */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#333'
          }}>
            From
          </label>
          <select
            value={fromChain}
            onChange={(e) => setFromChain(e.target.value)}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '10px',
              border: '2px solid #e5e7eb',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              background: 'white'
            }}
          >
            {chains.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
          <button
            onClick={swapChains}
            style={{
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ⇅
          </button>
        </div>

        {/* To Chain */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#333'
          }}>
            To
          </label>
          <select
            value={toChain}
            onChange={(e) => setToChain(e.target.value)}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '10px',
              border: '2px solid #e5e7eb',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              background: 'white'
            }}
          >
            {chains.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Token Selection */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#333'
          }}>
            Token
          </label>
          <select
            value={token}
            onChange={(e) => setToken(e.target.value)}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '10px',
              border: '2px solid #e5e7eb',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              background: 'white'
            }}
          >
            {tokens.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Amount Input */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#333'
          }}>
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '10px',
              border: '2px solid #e5e7eb',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Recipient (Optional) */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#333'
          }}>
            Recipient (Optional)
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder={address || '0x...'}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '10px',
              border: '2px solid #e5e7eb',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Bridge Details */}
        {amount && parseFloat(amount) > 0 && (
          <div style={{
            background: '#f8f9fa',
            borderRadius: '10px',
            padding: '16px',
            marginBottom: '20px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              <span style={{ color: '#666' }}>Estimated Fee:</span>
              <span style={{ fontWeight: 'bold' }}>{estimatedFee} {token}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              <span style={{ color: '#666' }}>You'll Receive:</span>
              <span style={{ fontWeight: 'bold' }}>
                {(parseFloat(amount) - parseFloat(estimatedFee)).toFixed(6)} {token}
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '14px'
            }}>
              <span style={{ color: '#666' }}>Estimated Time:</span>
              <span style={{ fontWeight: 'bold' }}>{estimatedTime}</span>
            </div>
          </div>
        )}

        {/* Bridge Button */}
        <button
          onClick={handleBridge}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '16px',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Bridge Assets
        </button>
      </div>

      {/* Bridge History */}
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '12px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#333' }}>
          Bridge History
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {bridgeHistory.map(tx => (
            <div
              key={tx.id}
              style={{
                background: '#f8f9fa',
                borderRadius: '8px',
                padding: '14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px'
              }}
            >
              <div style={{ flex: 1, minWidth: '150px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>
                  {tx.amount} {tx.token}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {tx.from} → {tx.to}
                </div>
              </div>
              <div style={{ flex: 1, minWidth: '120px', textAlign: 'right' }}>
                <div style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  background: tx.status === 'completed' ? '#d1fae5' : '#fef3c7',
                  color: tx.status === 'completed' ? '#065f46' : '#92400e'
                }}>
                  {tx.status}
                </div>
                <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>
                  {tx.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
