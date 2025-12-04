import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

const FlashLoan = () => {
  const { address } = useAccount();
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('DAI');
  const [targetAction, setTargetAction] = useState('arbitrage');
  const [loading, setLoading] = useState(false);
  const [loanHistory, setLoanHistory] = useState([]);
  const [simulationResult, setSimulationResult] = useState(null);

  const tokens = [
    { symbol: 'DAI', maxLoan: 50000000, fee: 0.09 },
    { symbol: 'USDC', maxLoan: 50000000, fee: 0.09 },
    { symbol: 'USDT', maxLoan: 50000000, fee: 0.09 },
    { symbol: 'WETH', maxLoan: 10000, fee: 0.09 },
    { symbol: 'WBTC', maxLoan: 500, fee: 0.09 }
  ];

  const actions = [
    { id: 'arbitrage', name: 'Arbitrage Trading', desc: 'Exploit price differences across DEXs' },
    { id: 'liquidation', name: 'Liquidation', desc: 'Liquidate undercollateralized positions' },
    { id: 'collateral-swap', name: 'Collateral Swap', desc: 'Swap collateral without closing position' },
    { id: 'self-liquidation', name: 'Self-Liquidation', desc: 'Close your own position efficiently' }
  ];

  useEffect(() => {
    if (address) {
      // Mock history
      setLoanHistory([
        {
          id: 1,
          token: 'DAI',
          amount: 100000,
          action: 'arbitrage',
          profit: 523.45,
          timestamp: Date.now() - 3600000,
          txHash: '0xabc...'
        },
        {
          id: 2,
          token: 'USDC',
          amount: 50000,
          action: 'liquidation',
          profit: 1250.30,
          timestamp: Date.now() - 7200000,
          txHash: '0xdef...'
        }
      ]);
    }
  }, [address]);

  const simulateFlashLoan = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const loanAmount = parseFloat(amount);
    const token = tokens.find(t => t.symbol === selectedToken);
    const fee = (loanAmount * token.fee) / 100;

    // Simulate different profitability scenarios
    let estimatedProfit = 0;
    if (targetAction === 'arbitrage') {
      estimatedProfit = loanAmount * 0.015; // 1.5% profit
    } else if (targetAction === 'liquidation') {
      estimatedProfit = loanAmount * 0.08; // 8% liquidation bonus
    } else if (targetAction === 'collateral-swap') {
      estimatedProfit = loanAmount * 0.005; // 0.5% efficiency gain
    } else {
      estimatedProfit = loanAmount * 0.02; // 2% self-liquidation savings
    }

    const netProfit = estimatedProfit - fee;
    const gasEstimate = 0.15; // ETH
    const finalProfit = netProfit - (gasEstimate * 2300); // Assume ETH at $2300

    setSimulationResult({
      loanAmount,
      fee,
      estimatedProfit,
      netProfit,
      gasEstimate,
      finalProfit,
      profitable: finalProfit > 0
    });
  };

  const executeFlashLoan = async () => {
    if (!address || !amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const loanAmount = parseFloat(amount);
    const token = tokens.find(t => t.symbol === selectedToken);

    if (loanAmount > token.maxLoan) {
      alert(`Maximum loan for ${selectedToken} is ${token.maxLoan.toLocaleString()}`);
      return;
    }

    if (!simulationResult?.profitable) {
      const confirmed = window.confirm(
        'Warning: Simulation shows this flash loan may not be profitable. Continue anyway?'
      );
      if (!confirmed) return;
    }

    setLoading(true);
    try {
      // Simulate flash loan execution
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const profit = simulationResult?.finalProfit || 0;
      alert(`Flash loan executed successfully!\nProfit: $${profit.toFixed(2)}`);
      
      // Add to history
      setLoanHistory([
        {
          id: Date.now(),
          token: selectedToken,
          amount: loanAmount,
          action: targetAction,
          profit: profit,
          timestamp: Date.now(),
          txHash: '0x' + Math.random().toString(16).substr(2, 8) + '...'
        },
        ...loanHistory
      ]);

      setAmount('');
      setSimulationResult(null);
    } catch (error) {
      alert('Flash loan failed: ' + error.message);
    } finally {
      setLoading(false);
    }
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
        <h2 style={{ marginBottom: '1rem' }}>Flash Loans ⚡</h2>
        <p>Please connect your wallet to execute flash loans</p>
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
        Flash Loans ⚡
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '2rem' }}>
        Borrow millions without collateral, execute strategies, and repay in one transaction
      </p>

      {/* Stats */}
      {loanHistory.length > 0 && (
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
              Total Loans
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
              {loanHistory.length}
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.95)',
            padding: '1rem',
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.25rem' }}>
              Total Profit
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
              ${loanHistory.reduce((sum, loan) => sum + loan.profit, 0).toFixed(2)}
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.95)',
            padding: '1rem',
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.25rem' }}>
              Success Rate
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
              {((loanHistory.filter(l => l.profit > 0).length / loanHistory.length) * 100).toFixed(0)}%
            </div>
          </div>
        </div>
      )}

      {/* Flash Loan Form */}
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Execute Flash Loan</h3>

        {/* Token Selection */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
            Select Token
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {tokens.map(token => (
              <button
                key={token.symbol}
                onClick={() => setSelectedToken(token.symbol)}
                style={{
                  padding: '0.5rem 1rem',
                  background: selectedToken === token.symbol ? '#667eea' : '#f3f4f6',
                  color: selectedToken === token.symbol ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                {token.symbol}
              </button>
            ))}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
            Max: {tokens.find(t => t.symbol === selectedToken)?.maxLoan.toLocaleString()} {selectedToken} • Fee: {tokens.find(t => t.symbol === selectedToken)?.fee}%
          </div>
        </div>

        {/* Amount Input */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
            Loan Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`Enter amount in ${selectedToken}`}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />
        </div>

        {/* Action Selection */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
            Target Action
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {actions.map(action => (
              <button
                key={action.id}
                onClick={() => setTargetAction(action.id)}
                style={{
                  padding: '1rem',
                  background: targetAction === action.id ? '#667eea' : '#f3f4f6',
                  color: targetAction === action.id ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '8px',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{action.name}</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>{action.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Simulation */}
        {simulationResult && (
          <div style={{
            background: simulationResult.profitable ? '#d1fae5' : '#fee2e2',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#333' }}>
              Simulation Results {simulationResult.profitable ? '✅' : '⚠️'}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#333' }}>
              <div>Loan Amount: {simulationResult.loanAmount.toLocaleString()} {selectedToken}</div>
              <div>Fee (0.09%): {simulationResult.fee.toFixed(2)} {selectedToken}</div>
              <div>Estimated Profit: ${simulationResult.estimatedProfit.toFixed(2)}</div>
              <div>Gas Cost: ~{simulationResult.gasEstimate} ETH (${(simulationResult.gasEstimate * 2300).toFixed(2)})</div>
              <div style={{ fontWeight: 'bold', marginTop: '0.5rem', fontSize: '1rem' }}>
                Net Profit: ${simulationResult.finalProfit.toFixed(2)}
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <button
            onClick={simulateFlashLoan}
            style={{
              padding: '0.75rem',
              background: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Simulate
          </button>
          <button
            onClick={executeFlashLoan}
            disabled={loading}
            style={{
              padding: '0.75rem',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              opacity: loading ? 0.5 : 1
            }}
          >
            {loading ? 'Executing...' : 'Execute'}
          </button>
        </div>
      </div>

      {/* History */}
      {loanHistory.length > 0 && (
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          padding: '1.5rem',
          borderRadius: '12px'
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Recent Loans</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {loanHistory.map(loan => (
              <div
                key={loan.id}
                style={{
                  background: '#f3f4f6',
                  padding: '1rem',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                    {loan.amount.toLocaleString()} {loan.token}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    {actions.find(a => a.id === loan.action)?.name} • {new Date(loan.timestamp).toLocaleString()}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontWeight: 'bold',
                    color: loan.profit > 0 ? '#10b981' : '#ef4444'
                  }}>
                    {loan.profit > 0 ? '+' : ''}${loan.profit.toFixed(2)}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    {loan.txHash}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashLoan;
