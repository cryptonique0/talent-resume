import React from 'react'

export default function SocialShare() {
  const shareUrl = encodeURIComponent(window.location.href)
  const shareText = encodeURIComponent('Check out this WalletConnect demo dApp! 🚀')

  const socialLinks = [
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
      icon: '𝕏',
      color: '#1DA1F2'
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${shareUrl}&text=${shareText}`,
      icon: '✈️',
      color: '#0088cc'
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      icon: 'in',
      color: '#0077b5'
    },
    {
      name: 'Copy Link',
      url: '#',
      icon: '🔗',
      color: '#666',
      onClick: (e) => {
        e.preventDefault()
        navigator.clipboard.writeText(window.location.href).then(() => {
          alert('Link copied to clipboard!')
        }).catch(() => {
          alert('Failed to copy link')
        })
      }
    }
  ]

  return (
    <div style={{ 
      marginTop: 24, 
      padding: 16, 
      borderRadius: 8, 
      background: '#f9fafb',
      textAlign: 'center'
    }}>
      <h3 style={{ marginBottom: 12, fontSize: 16, fontWeight: 600 }}>
        Share this demo
      </h3>
      <div style={{ 
        display: 'flex', 
        gap: 12, 
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {socialLinks.map(link => (
          <a
            key={link.name}
            href={link.url}
            onClick={link.onClick}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              borderRadius: 6,
              background: '#fff',
              border: `1px solid ${link.color}`,
              color: link.color,
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 500,
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = link.color
              e.currentTarget.style.color = '#fff'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#fff'
              e.currentTarget.style.color = link.color
            }}
          >
            <span style={{ fontSize: 16 }}>{link.icon}</span>
            {link.name}
          </a>
        ))}
      </div>
    </div>
  )
}
