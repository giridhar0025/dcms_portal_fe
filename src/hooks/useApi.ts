import { useCallback, useState } from 'react';
import axios from '../api/axiosInstance';

export interface UseApiOptions<TRequest, TResponse> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  body?: TRequest;
  onSuccess?: (data: TResponse) => void;
}

export interface UseApiReturn<TResponse> {
  exec: () => Promise<void>;
  data: TResponse | null;
  loading: boolean;
  error: string | null;
}

export function useApi<TRequest = unknown, TResponse = unknown>(
  options: UseApiOptions<TRequest, TResponse>
): UseApiReturn<TResponse> {
  const [data, setData] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exec = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.request<TResponse>({
        method: options.method,
        url: options.url,
        data: options.body
      });
      setData(response.data);
      options.onSuccess?.(response.data);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Error';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [options]);

  return { exec, data, loading, error };
}

export default useApi;
