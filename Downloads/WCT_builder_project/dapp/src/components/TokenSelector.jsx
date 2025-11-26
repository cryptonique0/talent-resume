import React, { useMemo } from 'react'

export default function TokenSelector({ tokens, value, onChange, allowCustom = true }) {
  const entries = useMemo(
    () => Object.entries(tokens).filter(([_, t]) => !!t.address),
    [tokens]
  )

  return (
    <div style={{ marginTop: 16 }}>
      <label style={{ display: 'block', marginBottom: 4 }}>Select token</label>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc' }}
      >
        <option value="">-- choose --</option>
        {entries.map(([key, t]) => (
          <option key={key} value={t.address}>
            {t.symbolHint || key}
          </option>
        ))}
      </select>
      {allowCustom && (
        <div style={{ marginTop: 8 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Or custom ERC20 address</label>
          <input
            type="text"
            placeholder="0x..."
            onChange={(e) => onChange(e.target.value)}
            style={{ width: '100%', maxWidth: 480, padding: 6, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </div>
      )}
    </div>
  )
}
