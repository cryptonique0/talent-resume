import React, { useState } from 'react'
import { useAccount, useNetwork, usePublicClient } from 'wagmi'

export default function NetworkInfo() {
  const { isConnected } = useAccount()
  const { chain } = useNetwork()
  const publicClient = usePublicClient()
  const [blockNumber, setBlockNumber] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function readBlock() {
    setLoading(true)
    setError(null)
    try {
      const bn = await publicClient.getBlockNumber()
      setBlockNumber(bn)
    } catch (e) {
      setError(e?.message || String(e))
    } finally {
      setLoading(false)
    }
  }

  if (!isConnected) return null

  return (
    <div style={{ marginTop: 16 }}>
      <h3>Network</h3>
      <div>Chain: {chain?.name} (id: {chain?.id})</div>
      <div style={{ marginTop: 8 }}>
        <button onClick={readBlock} disabled={loading}>
          {loading ? 'Reading…' : 'Read current block number'}
        </button>
      </div>
      {blockNumber !== null && (
        <div style={{ marginTop: 8 }}>Current block: {blockNumber.toString()}</div>
      )}
      {error && (
        <div style={{ marginTop: 8, color: 'red' }}>Error: {error}</div>
      )}
    </div>
  )
}
