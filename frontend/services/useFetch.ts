import { useEffect, useState, useCallback, useRef } from "react";

type AsyncFunction<A extends unknown[], T> = (...args: A) => Promise<T>;

const useFetch = <T, A extends unknown[] = []>(
  asyncFunction: AsyncFunction<A, T>,
  args?: A,
  shouldFetch = true,
  options: { autoFetch?: boolean; refreshInterval?: number } = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Store the latest function and args
  const functionRef = useRef(asyncFunction);
  const argsRef = useRef(args);

  // Update refs when dependencies change
  useEffect(() => {
    functionRef.current = asyncFunction;
    argsRef.current = args;
  }, [asyncFunction, args]);

  const fetchData = useCallback(async () => {
    // Use the latest args from ref
    const currentArgs = argsRef.current;

    if (!currentArgs || !shouldFetch) return;

    try {
      setLoading(true);
      setError(null);
      const result = await functionRef.current(...currentArgs);
      setData(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("An unknown error occurred"));
      }
    } finally {
      setLoading(false);
    }
  }, [shouldFetch]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  // Setup auto-fetching
  useEffect(() => {
    if (!options.autoFetch) return;

    fetchData(); // Initial fetch

    if (options.refreshInterval) {
      const intervalId = setInterval(fetchData, options.refreshInterval);
      return () => clearInterval(intervalId);
    }
  }, [fetchData, options.autoFetch, options.refreshInterval]);

  useEffect(() => {
    if (shouldFetch) {
      fetchData();
    } else {
      reset();
    }
  }, [fetchData, shouldFetch, reset]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    reset,
  } as const;
};

export default useFetch;
