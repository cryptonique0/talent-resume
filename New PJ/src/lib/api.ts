import axios, { AxiosError, AxiosInstance } from 'axios';

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
  message?: string;
}

export interface ApiConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

class ApiClient {
  private instance: AxiosInstance;

  constructor(config: ApiConfig = {}) {
    this.instance = axios.create({
      baseURL: config.baseURL || '/api',
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    // Response interceptor for error handling
    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        console.error('API Error:', error.message);
        return Promise.reject(error);
      }
    );
  }

  async get<T = any>(url: string, config?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.get<T>(url, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async post<T = any>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.post<T>(url, data, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async put<T = any>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.put<T>(url, data, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async patch<T = any>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.patch<T>(url, data, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async delete<T = any>(url: string, config?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.delete<T>(url, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: any): ApiResponse {
    const axiosError = error as AxiosError;
    return {
      error: axiosError.message || 'Unknown error',
      status: axiosError.status || 500,
      message: (axiosError.response?.data as any)?.message || 'An error occurred',
    };
  }
}

export const apiClient = new ApiClient();
export default ApiClient;
