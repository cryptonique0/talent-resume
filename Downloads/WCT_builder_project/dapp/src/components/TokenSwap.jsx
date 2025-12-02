import { useState } from 'react';
import { useAccount, useNetwork, useContractWrite, useBalance } from 'wagmi';
import { parseUnits, formatUnits } from 'ethers';
import { TOKENS } from '../config/tokens';

const MENTO_EXCHANGE_ABI = [
  {
    inputs: [
      { name: 'sellAmount', type: 'uint256' },
      { name: 'minBuyAmount', type: 'uint256' },
      { name: 'sellGold', type: 'bool' }
    ],
    name: 'exchange',
    outputs: [{ name: 'buyAmount', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

// Mento Exchange contracts for Celo stable swaps
const EXCHANGES = {
  42220: { // Celo Mainnet
    cUSD: '0x67316300f17f063085Ca8bCa4bd3f7a5a3C66275',
    cEUR: '0xE383394B913d7302c49F794C7d3243c429d53D1d',
    cREAL: '0x9380fA34Fd9e4Fd14c06305fd7B6199089eD4eb9'
  },
  44787: { // Alfajores Testnet
    cUSD: '0x67316300f17f063085Ca8bCa4bd3f7a5a3C66275',
    cEUR: '0xE383394B913d7302c49F794C7d3243c429d53D1d',
    cREAL: '0x9380fA34Fd9e4Fd14c06305fd7B6199089eD4eb9'
  }
};

export default function TokenSwap() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const [fromToken, setFromToken] = useState('CELO');
  const [toToken, setToToken] = useState('cUSD');
  const [amount, setAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');

  const { data: fromBalance } = useBalance({
    address,
    token: fromToken === 'CELO' ? undefined : TOKENS[`${fromToken}_MAINNET`]?.address,
    watch: true
  });

  const isCeloNetwork = chain?.id === 42220 || chain?.id === 44787;
  const celoTokens = ['CELO', 'cUSD', 'cEUR', 'cREAL'];

  const handleSwap = async () => {
    if (!amount || !isConnected || !isCeloNetwork) return;
    
    // Simple swap logic - in production, integrate with Mento or Ubeswap
    console.log('Swapping', amount, fromToken, 'to', toToken);
  };

  const handleFlip = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  const estimatedOutput = amount ? (parseFloat(amount) * 0.998).toFixed(4) : '0';

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '16px',
      padding: '24px',
      maxWidth: '480px',
      margin: '20px auto',
      boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ margin: '0 0 20px 0', color: 'white', fontSize: '24px' }}>
        🔄 Token Swap
      </h2>

      {!isConnected ? (
        <p style={{ color: 'rgba(255,255,255,0.9)', textAlign: 'center' }}>
          Connect your wallet to swap tokens
        </p>
      ) : !isCeloNetwork ? (
        <p style={{ 
          color: '#ffd700', 
          background: 'rgba(255,215,0,0.1)', 
          padding: '12px', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          ⚠️ Switch to Celo or Alfajores network to swap
        </p>
      ) : (
        <>
          {/* From Token */}
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px', color: '#666' }}>From</label>
              <span style={{ fontSize: '12px', color: '#999' }}>
                Balance: {fromBalance ? formatUnits(fromBalance.value, fromBalance.decimals).slice(0, 8) : '0'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                style={{
                  flex: 1,
                  border: 'none',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  background: 'transparent',
                  outline: 'none'
                }}
              />
              <select
                value={fromToken}
                onChange={(e) => setFromToken(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                {celoTokens.map(token => (
                  <option key={token} value={token}>{token}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Flip Button */}
          <div style={{ textAlign: 'center', margin: '-6px 0' }}>
            <button
              onClick={handleFlip}
              style={{
                background: 'white',
                border: '4px solid #667eea',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                fontSize: '18px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              ⇅
            </button>
          </div>

          {/* To Token */}
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <div style={{ marginBottom: '8px' }}>
              <label style={{ fontSize: '14px', color: '#666' }}>To (estimated)</label>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ flex: 1, fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
                {estimatedOutput}
              </div>
              <select
                value={toToken}
                onChange={(e) => setToToken(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                {celoTokens.map(token => (
                  <option key={token} value={token}>{token}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Details */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px',
            color: 'white',
            fontSize: '14px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>Slippage Tolerance</span>
              <input
                type="number"
                value={slippage}
                onChange={(e) => setSlippage(e.target.value)}
                style={{
                  width: '60px',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  border: 'none',
                  textAlign: 'right'
                }}
              />
              <span>%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Network Fee</span>
              <span>~$0.001</span>
            </div>
          </div>

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            disabled={!amount || parseFloat(amount) <= 0 || fromToken === toToken}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              border: 'none',
              background: fromToken === toToken || !amount ? '#ccc' : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: fromToken === toToken || !amount ? 'not-allowed' : 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => {
              if (fromToken !== toToken && amount) {
                e.target.style.transform = 'scale(1.02)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          >
            {fromToken === toToken ? 'Select Different Tokens' : 
             !amount ? 'Enter Amount' : 'Swap Tokens'}
          </button>

          <p style={{ 
            marginTop: '12px', 
            fontSize: '12px', 
            color: 'rgba(255,255,255,0.7)',
            textAlign: 'center'
          }}>
            💡 Powered by Mento Protocol on Celo
          </p>
        </>
      )}
    </div>
  );
}
