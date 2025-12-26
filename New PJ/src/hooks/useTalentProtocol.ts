import { useState, useCallback } from 'react';
import { fetchTalentProtocolProfile, fetchAchievements, fetchCredentials } from '@/lib/talent-protocol';

export interface UseTalentProtocolState {
  profile: any | null;
  achievements: any[] | null;
  credentials: any[] | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook for Talent Protocol API operations
 */
export const useTalentProtocol = () => {
  const [state, setState] = useState<UseTalentProtocolState>({
    profile: null,
    achievements: null,
    credentials: null,
    loading: false,
    error: null,
  });

  const getProfile = useCallback(async (handle: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const profile = await fetchTalentProtocolProfile(handle);
      setState(prev => ({ ...prev, profile, loading: false }));
      return profile;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch profile';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      throw error;
    }
  }, []);

  const getAchievements = useCallback(async (handle: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const achievements = await fetchAchievements(handle);
      setState(prev => ({ ...prev, achievements, loading: false }));
      return achievements;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch achievements';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      throw error;
    }
  }, []);

  const getCredentials = useCallback(async (handle: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const credentials = await fetchCredentials(handle);
      setState(prev => ({ ...prev, credentials, loading: false }));
      return credentials;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch credentials';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      throw error;
    }
  }, []);

  return { ...state, getProfile, getAchievements, getCredentials };
};

export default useTalentProtocol;
