import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="text-primary min-h-screen max-w-screen bg-background py-[10px] px-5 flex flex-col items-center">
        <Component {...pageProps} />
        <Analytics />
      </main>
    </QueryClientProvider>
  );
}
