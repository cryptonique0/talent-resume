import { useState, useEffect } from 'react';
import { API_ENDPOINTS, fetcher } from '../config/api';

/**
 * Custom hook to resolve ENS names to addresses and vice versa
 * @param {string} input - ENS name or address
 * @param {boolean} reverse - Whether to do reverse lookup (address to ENS)
 * @returns {Object} - Resolved data and loading state
 */
export const useENS = (input, reverse = false) => {
  const [resolved, setResolved] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!input) {
      setLoading(false);
      setResolved(null);
      return;
    }

    const resolve = async () => {
      try {
        setLoading(true);
        setError(null);

        if (reverse) {
          // Reverse lookup: address to ENS name
          const url = `${API_ENDPOINTS.ENS}/reverse/${input}`;
          const data = await fetcher(url);
          
          if (data && data.name) {
            setResolved(data.name);
          } else {
            setResolved(null);
          }
        } else {
          // Forward lookup: ENS name to address
          const url = `${API_ENDPOINTS.ENS}/resolve/${input}`;
          const data = await fetcher(url);
          
          if (data && data.address) {
            setResolved(data.address);
          } else {
            setResolved(null);
          }
        }
      } catch (err) {
        console.error('ENS resolution error:', err);
        setError(err.message);
        setResolved(null);
      } finally {
        setLoading(false);
      }
    };

    // Debounce resolution
    const timeoutId = setTimeout(resolve, 500);

    return () => clearTimeout(timeoutId);
  }, [input, reverse]);

  return { resolved, loading, error };
};

/**
 * Hook to get ENS avatar for an address or ENS name
 * @param {string} addressOrName - Ethereum address or ENS name
 * @returns {Object} - Avatar URL and loading state
 */
export const useENSAvatar = (addressOrName) => {
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!addressOrName) {
      setLoading(false);
      return;
    }

    const fetchAvatar = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `${API_ENDPOINTS.ENS}/avatar/${addressOrName}`;
        const data = await fetcher(url);
        
        if (data && data.avatar) {
          setAvatar(data.avatar);
        } else {
          setAvatar(null);
        }
      } catch (err) {
        console.error('Error fetching ENS avatar:', err);
        setError(err.message);
        setAvatar(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAvatar();
  }, [addressOrName]);

  return { avatar, loading, error };
};

/**
 * Hook to get full ENS metadata (name, avatar, text records)
 * @param {string} addressOrName - Ethereum address or ENS name
 * @returns {Object} - ENS metadata and loading state
 */
export const useENSMetadata = (addressOrName) => {
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!addressOrName) {
      setLoading(false);
      return;
    }

    const fetchMetadata = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `${API_ENDPOINTS.ENS}/metadata/${addressOrName}`;
        const data = await fetcher(url);
        
        if (data) {
          setMetadata({
            name: data.name || null,
            avatar: data.avatar || null,
            description: data.description || null,
            email: data.email || null,
            url: data.url || null,
            twitter: data.twitter || null,
            github: data.github || null,
            discord: data.discord || null
          });
        } else {
          setMetadata(null);
        }
      } catch (err) {
        console.error('Error fetching ENS metadata:', err);
        setError(err.message);
        setMetadata(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [addressOrName]);

  return { metadata, loading, error };
};

/**
 * Hook to validate ENS name format
 * @param {string} name - ENS name to validate
 * @returns {boolean} - True if valid ENS name format
 */
export const useENSValidation = (name) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!name) {
      setIsValid(false);
      return;
    }

    // Check if name ends with .eth and contains only valid characters
    const ensRegex = /^[a-z0-9-]+\.eth$/;
    setIsValid(ensRegex.test(name.toLowerCase()));
  }, [name]);

  return isValid;
};

/**
 * Hook to check ENS name availability
 * @param {string} name - ENS name to check
 * @returns {Object} - Availability status and loading state
 */
export const useENSAvailability = (name) => {
  const [available, setAvailable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isValid = useENSValidation(name);

  useEffect(() => {
    if (!name || !isValid) {
      setAvailable(null);
      setLoading(false);
      return;
    }

    const checkAvailability = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `${API_ENDPOINTS.ENS}/available/${name}`;
        const data = await fetcher(url);
        
        setAvailable(data.available || false);
      } catch (err) {
        console.error('Error checking ENS availability:', err);
        setError(err.message);
        setAvailable(null);
      } finally {
        setLoading(false);
      }
    };

    // Debounce availability check
    const timeoutId = setTimeout(checkAvailability, 1000);

    return () => clearTimeout(timeoutId);
  }, [name, isValid]);

  return { available, loading, error, isValid };
};

/**
 * Hook to get ENS name expiry date
 * @param {string} name - ENS name
 * @returns {Object} - Expiry date and loading state
 */
export const useENSExpiry = (name) => {
  const [expiry, setExpiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!name) {
      setLoading(false);
      return;
    }

    const fetchExpiry = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `${API_ENDPOINTS.ENS}/expiry/${name}`;
        const data = await fetcher(url);
        
        if (data && data.expiry) {
          setExpiry({
            timestamp: data.expiry,
            date: new Date(data.expiry * 1000),
            isExpired: data.expiry < Date.now() / 1000,
            daysUntilExpiry: Math.ceil((data.expiry - Date.now() / 1000) / 86400)
          });
        } else {
          setExpiry(null);
        }
      } catch (err) {
        console.error('Error fetching ENS expiry:', err);
        setError(err.message);
        setExpiry(null);
      } finally {
        setLoading(false);
      }
    };

    fetchExpiry();
  }, [name]);

  return { expiry, loading, error };
};

/**
 * Utility function to format ENS name display
 * @param {string} addressOrName - Address or ENS name
 * @param {string} ensName - Resolved ENS name (if available)
 * @returns {string} - Formatted display string
 */
export const formatENSDisplay = (addressOrName, ensName) => {
  if (ensName) {
    return ensName;
  }
  
  if (addressOrName && addressOrName.startsWith('0x')) {
    // Shorten address
    return `${addressOrName.slice(0, 6)}...${addressOrName.slice(-4)}`;
  }
  
  return addressOrName;
};
