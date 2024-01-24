import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Saira_Condensed } from "next/font/google";
import { Amplify } from "aws-amplify";
import awsmobile from "@/aws-exports";
import AuthProvider from "@/provider/auth";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/apollo";
import io from "socket.io-client";

import { useEffect } from "react";
import useDocumentVisibility from "@/js/documentVisibility";

const saira = Saira_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

Amplify.configure(awsmobile);

export default function App({ Component, pageProps }: AppProps) {
  const documentVisibility = useDocumentVisibility();

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_NODE_SERVER_URL);
    const socket = io("http://localhost:4000", {
      query: {
        userId: "1",
      },
    });

    return () => {
      socket.disconnect();
    };
  }, [documentVisibility]);

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
