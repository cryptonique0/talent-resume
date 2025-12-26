import { Web3Provider } from '@/providers/Web3Provider';
import { ConnectWallet } from '@/components/ConnectWallet';
import Link from 'next/link';
import '@/styles/globals.css';

export const metadata = {
  title: 'Talent Resume - On-Chain Professional Profiles',
  description: 'Build your verified, tamper-proof resume on the blockchain with Talent Protocol integration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>
          <div className="min-h-screen">
            {/* Header */}
            <header className="glass-effect sticky top-0 z-50 border-b border-white/10">
              <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl">📄</span>
                    <span className="text-xl font-bold text-gradient">
                      Talent Resume
                    </span>
                  </Link>
                  
                  <nav className="hidden md:flex items-center gap-6">
                    <Link href="/explore" className="hover:text-blue-400 transition-colors">
                      Explore
                    </Link>
                    <Link href="/leaderboard" className="hover:text-blue-400 transition-colors">
                      Leaderboard
                    </Link>
                    <Link href="/edit" className="hover:text-blue-400 transition-colors">
                      Edit Profile
                    </Link>
                  </nav>
                  
                  <ConnectWallet />
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>

            {/* Footer */}
            <footer className="glass-effect mt-20 border-t border-white/10">
              <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="font-bold mb-3">Talent Resume</h3>
                    <p className="text-sm text-gray-400">
                      Building the future of professional credentials on Base blockchain.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-3">Resources</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li><a href="https://docs.base.org" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Base Docs</a></li>
                      <li><a href="https://talentprotocol.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Talent Protocol</a></li>
                      <li><a href="https://github.com/cryptonique0/talent-resume" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">GitHub</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold mb-3">Network</h3>
                    <p className="text-sm text-gray-400">Base Mainnet (Chain ID: 8453)</p>
                    <p className="text-xs text-gray-500 mt-2">Powered by IPFS & Talent Protocol</p>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
                  © 2025 Talent Resume. Built with ❤️ on Base.
                </div>
              </div>
            </footer>
          </div>
        </Web3Provider>
      </body>
    </html>
  );
}
