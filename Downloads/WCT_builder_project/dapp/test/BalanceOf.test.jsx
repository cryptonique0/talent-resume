import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'

vi.mock('wagmi', () => ({
  useAccount: () => ({ address: undefined, isConnected: false }),
  usePublicClient: () => ({ readContract: vi.fn() })
}))

import BalanceOf from '../src/components/BalanceOf'

describe('BalanceOf', () => {
  it('renders nothing when not connected', () => {
    const { container } = render(<BalanceOf tokenAddress="0x123" />)
    expect(container.firstChild).toBeNull()
  })
})
