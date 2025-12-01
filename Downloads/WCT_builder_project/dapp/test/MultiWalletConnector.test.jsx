import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'

vi.mock('wagmi', () => {
  const connectors = [
    { id: 'meta', name: 'MetaMask', ready: true },
    { id: 'wc', name: 'WalletConnect', ready: true },
    { id: 'cb', name: 'Coinbase Wallet', ready: true }
  ]
  return {
    useAccount: () => ({ address: undefined, isConnected: false }),
    useDisconnect: () => ({ disconnect: vi.fn() }),
    useConnect: () => ({
      connect: vi.fn(),
      connectors,
      error: null,
      isLoading: false,
      pendingConnector: null
    })
  }
})

import MultiWalletConnector from '../src/components/MultiWalletConnector'

describe('MultiWalletConnector', () => {
  it('renders heading and wallet choices', () => {
    render(<MultiWalletConnector />)
    expect(screen.getByText('Connect Your Wallet')).toBeInTheDocument()
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })
})
