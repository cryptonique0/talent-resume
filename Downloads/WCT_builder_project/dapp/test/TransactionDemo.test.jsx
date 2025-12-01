import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'

vi.mock('wagmi', () => ({
  useAccount: () => ({ address: undefined, isConnected: false }),
  usePublicClient: () => ({}),
  usePrepareContractWrite: () => ({ config: {}, error: null }),
  useContractWrite: () => ({ write: undefined, data: null, error: null, isLoading: false }),
  useWaitForTransaction: () => ({ isLoading: false, isSuccess: false })
}))

vi.mock('../src/components/Toast', () => ({
  useToast: () => ({
    info: () => {},
    success: () => {},
    error: () => {}
  })
}))

import TransactionDemo from '../src/components/TransactionDemo'

describe('TransactionDemo', () => {
  it.skip('renders nothing when not connected or tokenAddress missing', () => {
    const { container } = render(<TransactionDemo />)
    expect(container.firstChild).toBeNull()
  })
})
