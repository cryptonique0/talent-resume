'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'achievement' | 'credential' | 'experience';
  verified?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
}

const typeColors = {
  achievement: 'from-yellow-500 to-orange-500',
  credential: 'from-blue-500 to-purple-500',
  experience: 'from-green-500 to-teal-500',
};

const typeIcons = {
  achievement: '🏆',
  credential: '📜',
  experience: '💼',
};

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="timeline relative">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
        >
          <div className="timeline-content glass-effect p-6 rounded-xl">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{typeIcons[item.type]}</span>
                <h3 className="text-lg font-bold">{item.title}</h3>
                {item.verified && (
                  <svg
                    className="w-5 h-5 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm text-gray-400">{item.date}</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {item.description}
            </p>
            <div className={`mt-3 h-1 w-20 rounded-full bg-gradient-to-r ${typeColors[item.type]}`} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
