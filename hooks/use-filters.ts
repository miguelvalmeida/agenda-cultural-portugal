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
    console.log("[useFilters] setParams called with:", newParams);

    const params = new URLSearchParams(searchParams.toString());

    for (const { name, value } of newParams) {
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
    }

    console.log("[useFilters] Starting transition...");

    startTransition(() => {
      console.log("[useFilters] Transition callback executing");
      setOptimisticParams(params);
      console.log("[useFilters] Optimistic params set");
      console.log(
        "[useFilters] Pushing URL:",
        `${pathname}?${params.toString()}`
      );
      router.push(`${pathname}?${params.toString()}`);
      console.log("[useFilters] Router.push completed");
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
