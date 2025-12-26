'use client';

import { motion } from 'framer-motion';

interface CredentialCardProps {
  credentialType: string;
  issuer: string;
  issuedDate: number;
  expiryDate?: number;
  proofUrl: string;
  verified: boolean;
  verificationCount: number;
}

export function CredentialCard({
  credentialType,
  issuer,
  issuedDate,
  expiryDate,
  proofUrl,
  verified,
  verificationCount,
}: CredentialCardProps) {
  const isExpired = expiryDate && expiryDate * 1000 < Date.now();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`glass-effect p-5 rounded-lg border-l-4 ${
        verified
          ? 'border-green-500'
          : isExpired
          ? 'border-red-500'
          : 'border-yellow-500'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-bold text-lg">{credentialType}</h4>
          <p className="text-sm text-gray-400">Issued by {issuer}</p>
        </div>
        {verified ? (
          <div className="flex items-center gap-1 bg-green-500/20 px-3 py-1 rounded-full">
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs text-green-400 font-semibold">Verified</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1 rounded-full">
            <span className="text-xs text-yellow-400 font-semibold">Pending</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-400">Issued:</span>
          <p className="font-medium">
            {new Date(issuedDate * 1000).toLocaleDateString()}
          </p>
        </div>
        {expiryDate && (
          <div>
            <span className="text-gray-400">Expires:</span>
            <p className={`font-medium ${isExpired ? 'text-red-400' : ''}`}>
              {new Date(expiryDate * 1000).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Verifications:</span>
          <span className="text-sm font-bold text-blue-400">{verificationCount}</span>
        </div>
        {proofUrl && (
          <a
            href={proofUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:text-blue-300 underline"
          >
            View Proof
          </a>
        )}
      </div>
    </motion.div>
  );
}
