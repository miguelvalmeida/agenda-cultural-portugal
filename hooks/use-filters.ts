"use client";

import { useOptimistic, useTransition } from "react";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";

export function useFilters() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [optimisticParams, setOptimisticParams] = useOptimistic<
    URLSearchParams | ReadonlyURLSearchParams
  >(searchParams);

  const setParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    startTransition(() => {
      setOptimisticParams(params);
      router.push(`?${params.toString()}`);
    });
  };

  const clearAllParams = () => {
    const params = new URLSearchParams();

    startTransition(() => {
      setOptimisticParams(params);
      router.push(`?${params.toString()}`);
    });
  };

  return {
    optimisticParams,
    setParams,
    clearAllParams,
    isPending,
  };
}
