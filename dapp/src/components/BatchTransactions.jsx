import { useState } from 'react';
import { useAccount } from 'wagmi';

export default function BatchTransactions() {
  const { address } = useAccount();
  const [transactions, setTransactions] = useState([
    { id: 1, to: '', amount: '', token: 'CELO', note: '' }
  ]);
  const [savedBatches, setSavedBatches] = useState([
    {
      id: 1,
      name: 'Monthly Payroll',
      txCount: 15,
      totalValue: '45,000',
      token: 'cUSD',
      created: '2024-11-28'
    },
    {
      id: 2,
      name: 'Airdrop Round 1',
      txCount: 150,
      totalValue: '10,000',
      token: 'CELO',
      created: '2024-11-25'
    }
  ]);

  const tokens = ['CELO', 'cUSD', 'cEUR', 'ETH', 'USDC'];

  const addTransaction = () => {
    setTransactions([
      ...transactions,
      { id: Date.now(), to: '', amount: '', token: 'CELO', note: '' }
    ]);
  };

  const removeTransaction = (id) => {
    if (transactions.length === 1) {
      alert('Must have at least one transaction');
      return;
    }
    setTransactions(transactions.filter(tx => tx.id !== id));
  };

  const updateTransaction = (id, field, value) => {
    setTransactions(
      transactions.map(tx =>
        tx.id === id ? { ...tx, [field]: value } : tx
      )
    );
  };

  const calculateTotal = () => {
    return transactions.reduce((sum, tx) => {
      return sum + (parseFloat(tx.amount) || 0);
    }, 0);
  };

  const handleExecute = () => {
    const validTxs = transactions.filter(tx => tx.to && tx.amount);
    if (validTxs.length === 0) {
      alert('Please add at least one valid transaction');
      return;
    }
    alert(`Executing ${validTxs.length} transactions with total value ${calculateTotal()} tokens`);
  };

  const handleSaveBatch = () => {
    const name = prompt('Enter batch name:');
    if (name) {
      alert(`Batch "${name}" saved for future use`);
    }
  };

  const handleLoadBatch = (batch) => {
    alert(`Loading batch: ${batch.name}`);
  };

  if (!address) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        borderRadius: '16px',
        padding: '40px',
        textAlign: 'center',
        color: 'white',
        maxWidth: '900px',
        margin: '20px auto'
      }}>
        <h2 style={{ margin: '0 0 12px 0' }}>⚡ Batch Transactions</h2>
        <p style={{ margin: 0 }}>Connect wallet to send multiple transactions at once</p>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      borderRadius: '16px',
      padding: '24px',
      maxWidth: '1000px',
      margin: '20px auto',
      boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ margin: '0 0 8px 0', color: 'white', fontSize: '24px' }}>
        ⚡ Batch Transaction Executor
      </h2>
      <p style={{ margin: '0 0 20px 0', color: 'rgba(255,255,255,0.95)', fontSize: '14px' }}>
        Send multiple transactions in one click - save time and gas
      </p>

      {/* Stats */}
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
            Transactions
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4facfe' }}>
            {transactions.length}
          </div>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
            Total Value
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4facfe' }}>
            {calculateTotal().toFixed(2)}
          </div>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
            Est. Gas Saved
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>
            ~{(transactions.length * 0.002).toFixed(3)} ETH
          </div>
        </div>
      </div>

      {/* Transaction Builder */}
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '16px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#333' }}>
          Build Batch
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {transactions.map((tx, index) => (
            <div
              key={tx.id}
              style={{
                background: '#f8f9fa',
                borderRadius: '10px',
                padding: '16px',
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr auto',
                gap: '12px',
                alignItems: 'center'
              }}
            >
              <input
                type="text"
                value={tx.to}
                onChange={(e) => updateTransaction(tx.id, 'to', e.target.value)}
                placeholder="Recipient address"
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  fontSize: '13px',
                  fontFamily: 'monospace'
                }}
              />
              <input
                type="number"
                value={tx.amount}
                onChange={(e) => updateTransaction(tx.id, 'amount', e.target.value)}
                placeholder="Amount"
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  fontSize: '13px'
                }}
              />
              <select
                value={tx.token}
                onChange={(e) => updateTransaction(tx.id, 'token', e.target.value)}
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                {tokens.map(token => (
                  <option key={token} value={token}>{token}</option>
                ))}
              </select>
              <button
                onClick={() => removeTransaction(tx.id)}
                style={{
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addTransaction}
          style={{
            width: '100%',
            background: '#e5e7eb',
            color: '#333',
            border: '2px dashed #cbd5e1',
            padding: '12px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '12px',
            fontSize: '14px'
          }}
        >
          + Add Transaction
        </button>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <button
          onClick={handleExecute}
          style={{
            flex: 2,
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white',
            border: 'none',
            padding: '14px',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Execute Batch
        </button>
        <button
          onClick={handleSaveBatch}
          style={{
            flex: 1,
            background: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '14px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Save Batch
        </button>
      </div>

      {/* Saved Batches */}
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#333' }}>
          Saved Batches
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {savedBatches.map(batch => (
            <div
              key={batch.id}
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
                <div style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '4px' }}>
                  {batch.name}
                </div>
                <div style={{ fontSize: '13px', color: '#666' }}>
                  {batch.txCount} transactions • {batch.totalValue} {batch.token}
                </div>
                <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
                  Created {batch.created}
                </div>
              </div>
              <button
                onClick={() => handleLoadBatch(batch)}
                style={{
                  background: '#4facfe',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                Load
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
