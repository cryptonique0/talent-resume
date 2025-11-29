import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import TransactionHistory from './TransactionHistory'

describe('TransactionHistory', () => {
  it('renders nothing if no address', () => {
    // Mock wagmi hooks
    jest.mock('wagmi', () => ({ useAccount: () => ({ address: undefined }) }))
    render(<TransactionHistory />)
    expect(screen.queryByText(/Transaction History/i)).not.toBeInTheDocument()
  })
})
