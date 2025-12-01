import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'

vi.mock('wagmi', () => ({
  useAccount: () => ({ isConnected: false }),
  useNetwork: () => ({ chain: null }),
  usePublicClient: () => ({ getBlockNumber: vi.fn() })
}))

import NetworkInfo from '../src/components/NetworkInfo'

describe('NetworkInfo', () => {
  it('renders null when not connected', () => {
    const { container } = render(<NetworkInfo />)
    expect(container.firstChild).toBeNull()
  })
})
