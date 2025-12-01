import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'

vi.mock('wagmi', () => ({
  useAccount: () => ({ address: undefined, isConnected: false }),
  useBalance: () => ({ data: null }),
  useNetwork: () => ({ chain: null })
}))

import WalletConnectionStatus from '../src/components/WalletConnectionStatus'

describe('WalletConnectionStatus', () => {
  it('renders nothing when not connected', () => {
    const { container } = render(<WalletConnectionStatus />)
    expect(container.firstChild).toBeNull()
  })
})
