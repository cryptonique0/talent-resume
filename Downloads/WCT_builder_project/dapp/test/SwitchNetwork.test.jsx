import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'

vi.mock('wagmi', () => ({
  useNetwork: () => ({ chain: { id: 1, name: 'Ethereum' } }),
  useSwitchNetwork: () => ({ switchNetworkAsync: vi.fn(), isLoading: false, error: null, pendingChainId: undefined })
}))

import SwitchNetwork from '../src/components/SwitchNetwork'

describe('SwitchNetwork', () => {
  it('renders current network and switch button', () => {
    render(<SwitchNetwork />)
    expect(screen.getByText(/Current network:/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Switch Network/i })).toBeInTheDocument()
  })
})
