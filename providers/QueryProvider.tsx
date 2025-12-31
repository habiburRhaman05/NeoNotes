// components/providers/QueryProvider.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // useState ব্যবহার করা হয় যাতে প্রতি রেন্ডারে নতুন ক্লায়েন্ট তৈরি না হয়
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // ১ মিনিট পর্যন্ত ডেটা 'fresh' থাকবে
            gcTime: 10 * 60 * 1000, // ১০ মিনিট পর ক্যাশ ক্লিন করবে
            retry: 1, // এরর হলে একবার রিট্রাই করবে
            refetchOnWindowFocus: false, // ট্যাব সুইচ করলে অটো ফেচ হবে না (অপশনাল)
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Devtools শুধু ডেভেলপমেন্ট মোডে দেখাবে */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}