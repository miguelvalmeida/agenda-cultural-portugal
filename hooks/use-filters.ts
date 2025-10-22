"use client";

import { useOptimistic, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type FilterParamName = "cidade" | "categoria" | "de" | "ate" | "pesquisa";

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

    startTransition(() => {
      setOptimisticParams(params);
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const clearAllParams = () => {
    setParams([
      { name: "cidade", value: null },
      { name: "categoria", value: null },
      { name: "de", value: null },
      { name: "ate", value: null },
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
