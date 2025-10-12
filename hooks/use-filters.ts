"use client";

import { useOptimistic, useTransition } from "react";
import {
  type ReadonlyURLSearchParams,
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

  const setParams = (newParams: { name: string; value: string | null }[]) => {
    const params = new URLSearchParams(searchParams.toString());

    for (const { name, value } of newParams) {
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
    }

    startTransition(() => {
      setOptimisticParams(params);
      router.push(`?${params.toString()}`);
    });
  };

  const clearAllParams = () => {
    setParams([
      { name: "city", value: null },
      { name: "category", value: null },
      { name: "date", value: null },
      { name: "search", value: null },
    ]);
  };

  return {
    searchParams,
    optimisticParams,
    setParams,
    clearAllParams,
    isPending,
  };
}
