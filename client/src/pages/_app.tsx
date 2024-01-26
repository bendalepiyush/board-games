import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Saira_Condensed } from "next/font/google";
import { Amplify } from "aws-amplify";
import awsmobile from "@/aws-exports";
import { AuthProvider } from "@/context/auth";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/apollo";
import AppHeader from "@/components/layout/app-header";

const saira = Saira_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={saira.className}>
      <ApolloProvider client={apolloClient}>
        <AuthProvider>
          <AppHeader />

          <Component {...pageProps} />
        </AuthProvider>
      </ApolloProvider>
    </main>
  );
}
