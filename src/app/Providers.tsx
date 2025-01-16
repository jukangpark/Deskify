"use client";

import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

// import { ThemeProvider } from "next-themes";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1분
            retry: 1,
            refetchOnWindowFocus: false, // 창 포커스시 자동 리페치 비활성화
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <div>{children}</div>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} /> {/* 개발 도구 */}
    </QueryClientProvider>
  );
};

export default Providers;
