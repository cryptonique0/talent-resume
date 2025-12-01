import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'

vi.mock('wagmi', () => ({
  useAccount: () => ({ address: undefined, isConnected: false }),
  usePublicClient: () => ({ getGasPrice: vi.fn() })
}))

import GasEstimator from '../src/components/GasEstimator'

describe('GasEstimator', () => {
  it('renders nothing when not connected', () => {
    const { container } = render(<GasEstimator contractAddress="0x123" />)
    expect(container.firstChild).toBeNull()
  })
})
