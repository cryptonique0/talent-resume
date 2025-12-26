/**
 * API utility functions and helpers
 */

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Fetch with error handling
 */
export async function fetchApi<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `API error: ${response.statusText}`,
        response.status,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error'
    );
  }
}

/**
 * POST request helper
 */
export async function postApi<T>(
  url: string,
  data: any,
  options?: RequestInit
): Promise<T> {
  return fetchApi<T>(url, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * PUT request helper
 */
export async function putApi<T>(
  url: string,
  data: any,
  options?: RequestInit
): Promise<T> {
  return fetchApi<T>(url, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * DELETE request helper
 */
export async function deleteApi<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  return fetchApi<T>(url, {
    ...options,
    method: 'DELETE',
  });
}

/**
 * Build URL with query parameters
 */
export function buildUrl(base: string, params?: Record<string, any>): string {
  if (!params) return base;

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${base}?${queryString}` : base;
}

/**
 * Retry failed requests with exponential backoff
 */
export async function fetchWithRetry<T>(
  url: string,
  options?: RequestInit,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fetchApi<T>(url, options);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      if (attempt < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError!;
}

/**
 * Debounced fetch function
 */
export function createDebouncedFetch(delay: number = 300) {
  let timeoutId: NodeJS.Timeout;

  return async function<T>(
    url: string,
    options?: RequestInit
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        try {
          const result = await fetchApi<T>(url, options);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };
}
