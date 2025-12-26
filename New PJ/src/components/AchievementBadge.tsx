'use client';

import { motion } from 'framer-motion';

interface AchievementBadgeProps {
  title: string;
  description: string;
  unlockedAt: number;
  verified: boolean;
}

const badgeGradients = [
  'from-purple-500 to-pink-500',
  'from-blue-500 to-cyan-500',
  'from-green-500 to-emerald-500',
  'from-orange-500 to-red-500',
  'from-yellow-500 to-amber-500',
];

export function AchievementBadge({
  title,
  description,
  unlockedAt,
  verified,
}: AchievementBadgeProps) {
  const gradientIndex = Math.floor(Math.random() * badgeGradients.length);
  const gradient = badgeGradients[gradientIndex];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, rotate: 2 }}
      viewport={{ once: true }}
      className="glass-effect p-4 rounded-xl text-center cursor-pointer"
    >
      <div className={`w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
        <span className="text-3xl">🏆</span>
      </div>
      
      <h4 className="font-bold text-sm mb-1">{title}</h4>
      <p className="text-xs text-gray-400 mb-2 line-clamp-2">{description}</p>
      
      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
        <span>{new Date(unlockedAt * 1000).toLocaleDateString()}</span>
        {verified && (
          <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </motion.div>
  );
}
