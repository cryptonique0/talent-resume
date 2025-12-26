import { BASESCAN_API_URL } from '@/lib/constants';

interface BaseScanResponse<T = any> {
  status: string; // '1' success, '0' error
  message: string;
  result: T;
}

const apiKey = process.env.BASESCAN_API_KEY || '';

const withKey = (url: string) => {
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}apikey=${apiKey}`;
};

export const getContractAbi = async (address: string): Promise<string | null> => {
  try {
    const url = withKey(
      `${BASESCAN_API_URL}?module=contract&action=getabi&address=${address}`
    );
    const res = await fetch(url, { next: { revalidate: 60 } });
    const json = (await res.json()) as BaseScanResponse<string>;
    if (json.status === '1' && json.result) {
      return json.result;
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const getTransactions = async (
  address: string,
  options: { page?: number; offset?: number; sort?: 'asc' | 'desc' } = {}
): Promise<any[] | null> => {
  const { page = 1, offset = 10, sort = 'desc' } = options;
  try {
    const url = withKey(
      `${BASESCAN_API_URL}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${page}&offset=${offset}&sort=${sort}`
    );
    const res = await fetch(url, { next: { revalidate: 30 } });
    const json = (await res.json()) as BaseScanResponse<any[]>;
    if (json.status === '1' && Array.isArray(json.result)) {
      return json.result;
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const isContractVerified = async (address: string): Promise<boolean> => {
  const abi = await getContractAbi(address);
  // If ABI is returned, contract is verified on BaseScan
  return !!abi;
};
