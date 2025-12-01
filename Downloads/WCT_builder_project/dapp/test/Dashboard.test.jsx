import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'

vi.mock('wagmi', () => ({
  useAccount: () => ({ address: undefined, isConnected: false }),
  useBalance: () => ({ data: null }),
  usePublicClient: () => ({})
}))

import Dashboard from '../src/components/Dashboard'

describe('Dashboard', () => {
  it('prompts to connect when not connected', () => {
    render(<Dashboard />)
    expect(screen.getByText('Connect Your Wallet')).toBeInTheDocument()
  })
})
