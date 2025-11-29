import React, { useEffect } from 'react'

export default function TransactionModal({ 
  isOpen, 
  onClose, 
  txHash, 
  status, 
  title = 'Transaction', 
  children 
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const getStatusColor = () => {
    switch (status) {
      case 'pending': return '#f59e0b'
      case 'success': return '#10b981'
      case 'error': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'pending': return '⏳'
      case 'success': return '✅'
      case 'error': return '❌'
      default: return '📝'
    }
  }

  const explorerUrl = txHash ? `https://sepolia.etherscan.io/tx/${txHash}` : null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(4px)'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          maxWidth: 500,
          width: '90%',
          maxHeight: '80vh',
          overflow: 'auto',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          padding: 24,
          borderBottom: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>{title}</h2>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 24,
                cursor: 'pointer',
                color: '#6b7280',
                padding: 0,
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
            >
              ✕
            </button>
          </div>
        </div>

        <div style={{ padding: 24 }}>
          {status && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: 16,
              background: `${getStatusColor()}10`,
              borderRadius: 8,
              marginBottom: 20
            }}>
              <div style={{ fontSize: 32 }}>{getStatusIcon()}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: getStatusColor(), textTransform: 'capitalize' }}>
                  {status}
                </div>
                {status === 'pending' && <div style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>
                  Waiting for confirmation...
                </div>}
                {status === 'success' && <div style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>
                  Transaction confirmed
                </div>}
                {status === 'error' && <div style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>
                  Transaction failed
                </div>}
              </div>
            </div>
          )}

          {txHash && (
            <div style={{
              padding: 16,
              background: '#f9fafb',
              borderRadius: 8,
              marginBottom: 20
            }}>
              <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8, fontWeight: 600 }}>
                Transaction Hash
              </div>
              <div style={{
                fontSize: 14,
                fontFamily: 'monospace',
                wordBreak: 'break-all',
                marginBottom: 12
              }}>
                {txHash}
              </div>
              {explorerUrl && (
                <a
                  href={explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 16px',
                    background: '#3b82f6',
                    color: '#fff',
                    borderRadius: 6,
                    textDecoration: 'none',
                    fontSize: 14,
                    fontWeight: 600
                  }}
                >
                  View on Etherscan →
                </a>
              )}
            </div>
          )}

          {children}
        </div>

        <div style={{
          padding: 24,
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 12
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              background: '#f3f4f6',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 600,
              color: '#374151'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
