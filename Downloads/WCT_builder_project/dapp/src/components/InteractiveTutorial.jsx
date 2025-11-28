import React, { useState } from 'react'
import { useAccount } from 'wagmi'

export default function InteractiveTutorial() {
  const { isConnected } = useAccount()
  const [step, setStep] = useState(0)

  const steps = [
    {
      title: '👋 Welcome!',
      description: 'This tutorial will guide you through using this WalletConnect demo dApp.',
      action: 'Start Tutorial'
    },
    {
      title: '🔌 Connect Your Wallet',
      description: 'Click the "Connect Wallet" button to connect your Web3 wallet (MetaMask, WalletConnect, etc.)',
      highlight: !isConnected,
      action: isConnected ? 'Next Step' : 'Waiting...'
    },
    {
      title: '🔄 Switch Networks',
      description: 'Make sure you\'re on the correct network (Sepolia testnet recommended for testing).',
      action: 'Next Step'
    },
    {
      title: '💰 Check Token Balance',
      description: 'Select a token from the dropdown to view your balance. Need testnet tokens? Use a faucet!',
      action: 'Next Step'
    },
    {
      title: '🎁 Try a Transaction',
      description: 'Test the Claim button or Transfer tokens to experience blockchain transactions.',
      action: 'Next Step'
    },
    {
      title: '✅ You\'re Done!',
      description: 'Great job! You now know how to interact with this dApp. Share it with friends!',
      action: 'Restart Tutorial'
    }
  ]

  const currentStep = steps[step]

  const handleNext = () => {
    if (step === steps.length - 1) {
      setStep(0)
    } else if (!currentStep.highlight || isConnected) {
      setStep(step + 1)
    }
  }

  const handleClose = () => {
    setStep(0)
  }

  if (step === 0 && isConnected) {
    return null
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      maxWidth: 360,
      padding: 20,
      borderRadius: 12,
      background: '#fff',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      border: '2px solid #3b82f6',
      zIndex: 1000,
      animation: 'slideIn 0.3s ease-out'
    }}>
      <button
        onClick={handleClose}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          background: 'none',
          border: 'none',
          fontSize: 20,
          cursor: 'pointer',
          color: '#666'
        }}
      >
        ×
      </button>

      <div style={{ marginBottom: 4, color: '#3b82f6', fontSize: 12, fontWeight: 600 }}>
        Step {step + 1} of {steps.length}
      </div>

      <h3 style={{ margin: '8px 0', fontSize: 18, fontWeight: 700 }}>
        {currentStep.title}
      </h3>

      <p style={{ margin: '12px 0', fontSize: 14, color: '#666', lineHeight: 1.5 }}>
        {currentStep.description}
      </p>

      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <button
          onClick={handleNext}
          disabled={currentStep.highlight && !isConnected}
          style={{
            flex: 1,
            padding: '10px 20px',
            borderRadius: 8,
            background: (currentStep.highlight && !isConnected) ? '#ccc' : '#3b82f6',
            color: '#fff',
            border: 'none',
            fontWeight: 600,
            cursor: (currentStep.highlight && !isConnected) ? 'not-allowed' : 'pointer',
            fontSize: 14
          }}
        >
          {currentStep.action}
        </button>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: 4, 
        marginTop: 12,
        justifyContent: 'center'
      }}>
        {steps.map((_, i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: i === step ? '#3b82f6' : '#ddd'
            }}
          />
        ))}
      </div>

      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  )
}
