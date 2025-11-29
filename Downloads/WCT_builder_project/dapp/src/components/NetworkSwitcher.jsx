import React from 'react'
import { useSwitchNetwork, useNetwork } from 'wagmi'

const SUPPORTED_NETWORKS = {
  1: { name: 'Ethereum', icon: '⟠' },
  11155111: { name: 'Sepolia', icon: '🔧' },
  137: { name: 'Polygon', icon: '💜' },
  42161: { name: 'Arbitrum', icon: '🔵' },
  10: { name: 'Optimism', icon: '🔴' }
}

export default function NetworkSwitcher() {
  const { chain } = useNetwork()
  const { chains, switchNetwork, isLoading } = useSwitchNetwork()

  if (!chain) return null

  const isSupported = SUPPORTED_NETWORKS[chain.id]
  
  return (
    <div style={{
      padding: 16,
      borderRadius: 8,
      background: isSupported ? '#f0fdf4' : '#fef2f2',
      border: `2px solid ${isSupported ? '#10b981' : '#ef4444'}`,
      marginBottom: 16
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
            {isSupported ? '✅' : '⚠️'} Current Network
          </div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>
            {SUPPORTED_NETWORKS[chain.id]?.icon || '❓'} {chain.name}
          </div>
        </div>

        {!isSupported && (
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 12, color: '#dc2626', marginBottom: 8 }}>
              Please switch to a supported network
            </div>
            <select
              onChange={(e) => switchNetwork?.(Number(e.target.value))}
              disabled={isLoading}
              style={{
                padding: '8px 12px',
                borderRadius: 6,
                border: '2px solid #10b981',
                background: '#fff',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <option value="">Select Network</option>
              {chains.map((network) => (
                <option key={network.id} value={network.id}>
                  {SUPPORTED_NETWORKS[network.id]?.icon} {network.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {isLoading && (
        <div style={{
          marginTop: 12,
          padding: 8,
          background: '#fef3c7',
          borderRadius: 6,
          fontSize: 14,
          textAlign: 'center'
        }}>
          ⏳ Switching network... Please confirm in your wallet
        </div>
      )}

      <details style={{ marginTop: 12, fontSize: 12 }}>
        <summary style={{ cursor: 'pointer', color: '#6b7280' }}>
          Supported Networks
        </summary>
        <ul style={{ marginTop: 8, paddingLeft: 20, color: '#6b7280' }}>
          {Object.entries(SUPPORTED_NETWORKS).map(([id, net]) => (
            <li key={id}>{net.icon} {net.name}</li>
          ))}
        </ul>
      </details>
    </div>
  )
}
