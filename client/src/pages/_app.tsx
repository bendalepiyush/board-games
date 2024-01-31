import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Saira_Condensed } from "next/font/google";
import { AuthProvider } from "@/context/auth";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/apollo";

const saira = Saira_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={saira.className}>
      <ApolloProvider client={apolloClient}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ApolloProvider>
    </main>
  );
}
