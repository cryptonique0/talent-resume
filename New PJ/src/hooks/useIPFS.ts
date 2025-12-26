import { useState, useCallback } from 'react';
import { uploadToIPFS, fetchFromIPFS } from '@/lib/ipfs';

export interface UseIPFSReturn {
  uploading: boolean;
  downloading: boolean;
  error: string | null;
  uploadFile: (file: File) => Promise<string | null>;
  uploadJSON: (data: any) => Promise<string | null>;
  fetchData: <T = any>(hash: string) => Promise<T | null>;
  clearError: () => void;
}

export function useIPFS(): UseIPFSReturn {
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(async (file: File): Promise<string | null> => {
    try {
      setUploading(true);
      setError(null);
      const hash = await uploadToIPFS(file);
      return hash;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to upload file';
      setError(message);
      return null;
    } finally {
      setUploading(false);
    }
  }, []);

  const uploadJSON = useCallback(async (data: any): Promise<string | null> => {
    try {
      setUploading(true);
      setError(null);
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      const file = new File([blob], 'data.json', { type: 'application/json' });
      const hash = await uploadToIPFS(file);
      return hash;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to upload JSON';
      setError(message);
      return null;
    } finally {
      setUploading(false);
    }
  }, []);

  const fetchData = useCallback(async <T = any>(hash: string): Promise<T | null> => {
    try {
      setDownloading(true);
      setError(null);
      const data = await fetchFromIPFS<T>(hash);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch data';
      setError(message);
      return null;
    } finally {
      setDownloading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    uploading,
    downloading,
    error,
    uploadFile,
    uploadJSON,
    fetchData,
    clearError,
  };
}
