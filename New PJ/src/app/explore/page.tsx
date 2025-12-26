'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { SkeletonCard } from '@/components/Skeleton';
import { truncateAddress } from '@/lib/format';

interface SearchResult {
  address: string;
  name: string;
  bio: string;
  reputation: number;
  credentialCount: number;
  achievementCount: number;
}

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResults([]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Talent
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover professionals, view their credentials, and connect with top talent
            from around the world
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="Search by name, address, or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card padding="sm">
            <div className="flex flex-wrap gap-4">
              <button className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
                All Talent
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                Developers
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                Designers
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                Writers
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                Top Rated
              </button>
            </div>
          </Card>
        </motion.div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          ) : results.length > 0 ? (
            results.map((result, i) => (
              <motion.div
                key={result.address}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {result.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {truncateAddress(result.address)}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      {result.bio}
                    </p>
                    <div className="flex justify-center gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">
                          {result.reputation}
                        </div>
                        <div className="text-gray-500">Reputation</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">
                          {result.credentialCount}
                        </div>
                        <div className="text-gray-500">Credentials</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">
                No results found. Try a different search term.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
