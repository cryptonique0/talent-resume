import React from 'react'
import { useAccount, useBalance, useNetwork } from 'wagmi'

export default function WalletConnectionStatus() {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { data: balance } = useBalance({ address })

  if (!isConnected) return null

  return (
    <div style={{
      position: 'fixed',
      top: 16,
      right: 16,
      background: '#fff',
      border: '2px solid #10b981',
      borderRadius: 12,
      padding: '12px 16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      zIndex: 1000,
      minWidth: 280
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <div style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#10b981',
          animation: 'pulse 2s infinite'
        }} />
        <span style={{ fontSize: 14, fontWeight: 600, color: '#10b981' }}>
          Connected
        </span>
      </div>
      
      <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span>Address:</span>
          <span style={{ fontFamily: 'monospace', fontWeight: 500 }}>
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span>Network:</span>
          <span style={{ fontWeight: 500 }}>{chain?.name || 'Unknown'}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Balance:</span>
          <span style={{ fontWeight: 500 }}>
            {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : '...'}
          </span>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </div>
  )
}
