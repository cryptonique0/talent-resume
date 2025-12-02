import { useState } from 'react';
import { useAccount } from 'wagmi';
import QRCode from 'qrcode';

export default function QRCodePayment() {
  const { address, isConnected } = useAccount();
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('ETH');
  const [message, setMessage] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [showQR, setShowQR] = useState(false);

  const generateQRCode = async () => {
    if (!address) return;

    // Generate payment URI (EIP-681 format)
    // ethereum:<address>[@<chainId>][/<function_name>][?<parameters>]
    let paymentUri = `ethereum:${address}`;
    
    if (amount) {
      paymentUri += `?value=${parseFloat(amount) * 1e18}`; // Convert to wei
    }
    
    if (message) {
      paymentUri += amount ? `&` : `?`;
      paymentUri += `message=${encodeURIComponent(message)}`;
    }

    try {
      const qrUrl = await QRCode.toDataURL(paymentUri, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(qrUrl);
      setShowQR(true);
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  };

  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      alert('Address copied to clipboard!');
    }
  };

  const sharePayment = () => {
    const paymentLink = `ethereum:${address}${amount ? `?value=${parseFloat(amount) * 1e18}` : ''}`;
    if (navigator.share) {
      navigator.share({
        title: 'Payment Request',
        text: `Send ${amount || 'payment'} ${token} to ${address}`,
        url: paymentLink
      }).catch(() => {
        // Fallback to copy
        navigator.clipboard.writeText(paymentLink);
        alert('Payment link copied to clipboard!');
      });
    } else {
      navigator.clipboard.writeText(paymentLink);
      alert('Payment link copied to clipboard!');
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '16px',
      padding: '24px',
      maxWidth: '480px',
      margin: '20px auto',
      boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ margin: '0 0 20px 0', color: 'white', fontSize: '24px' }}>
        📱 Receive Payment
      </h2>

      {!isConnected ? (
        <p style={{ color: 'rgba(255,255,255,0.9)', textAlign: 'center' }}>
          Connect your wallet to generate payment QR code
        </p>
      ) : (
        <>
          {/* Address Display */}
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <label style={{ fontSize: '14px', color: '#666', display: 'block', marginBottom: '8px' }}>
              Your Address
            </label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <code style={{
                flex: 1,
                padding: '8px',
                background: '#f3f4f6',
                borderRadius: '6px',
                fontSize: '12px',
                wordBreak: 'break-all',
                fontFamily: 'monospace'
              }}>
                {address}
              </code>
              <button
                onClick={copyToClipboard}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  background: '#667eea',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
                title="Copy address"
              >
                📋
              </button>
            </div>
          </div>

          {/* Payment Details */}
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <label style={{ fontSize: '14px', color: '#666', display: 'block', marginBottom: '8px' }}>
              Amount (Optional)
            </label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  fontSize: '16px'
                }}
              />
              <select
                value={token}
                onChange={(e) => setToken(e.target.value)}
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                <option value="ETH">ETH</option>
                <option value="CELO">CELO</option>
                <option value="cUSD">cUSD</option>
                <option value="MATIC">MATIC</option>
              </select>
            </div>

            <label style={{ fontSize: '14px', color: '#666', display: 'block', marginBottom: '8px' }}>
              Message (Optional)
            </label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g., Coffee payment"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ddd',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* QR Code Display */}
          {showQR && qrCodeUrl && (
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              <img
                src={qrCodeUrl}
                alt="Payment QR Code"
                style={{
                  maxWidth: '100%',
                  borderRadius: '8px'
                }}
              />
              <p style={{ fontSize: '12px', color: '#666', marginTop: '12px', marginBottom: 0 }}>
                Scan with a Web3 wallet to send payment
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={generateQRCode}
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              {showQR ? '🔄 Regenerate QR' : '📱 Generate QR Code'}
            </button>
            <button
              onClick={sharePayment}
              style={{
                padding: '14px 20px',
                borderRadius: '12px',
                border: '2px solid white',
                background: 'transparent',
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'white';
                e.target.style.color = '#667eea';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = 'white';
              }}
            >
              🔗
            </button>
          </div>

          <p style={{
            marginTop: '16px',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.7)',
            textAlign: 'center'
          }}>
            💡 Share the QR code or link to receive payments instantly
          </p>
        </>
      )}
    </div>
  );
}
