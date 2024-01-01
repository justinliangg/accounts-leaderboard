import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/common/Footer";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="text-primary min-h-screen max-w-screen bg-background py-[10px] pb-14 px-5 flex justify-center">
        <Component {...pageProps} />
        <Footer />
        <Analytics />
      </main>
    </QueryClientProvider>
  );
}
