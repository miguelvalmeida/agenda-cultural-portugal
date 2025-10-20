"use client";

import { useOptimistic, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type FilterParamName = "cidade" | "categoria" | "data" | "pesquisa";

export function useFilters() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [optimisticParams, setOptimisticParams] =
    useOptimistic<URLSearchParams>(searchParams);

  const setParams = (
    newParams: { name: FilterParamName; value: string | null }[]
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    for (const { name, value } of newParams) {
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
    }

    const nextQuery = params.toString();
    const currentQuery = searchParams.toString();

    // Avoid no-op transitions when nothing changes
    if (nextQuery === currentQuery) {
      return;
    }

    startTransition(() => {
      setOptimisticParams(params);
      const url = nextQuery ? `${pathname}?${nextQuery}` : `${pathname}`;
      router.push(url);
    });
  };

  const clearAllParams = () => {
    setParams([
      { name: "cidade", value: null },
      { name: "categoria", value: null },
      { name: "data", value: null },
      { name: "pesquisa", value: null },
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
