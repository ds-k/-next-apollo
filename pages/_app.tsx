import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "@/components/Nav";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/lib/apolloClient";

import { SessionProvider } from "next-auth/react";
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <>
      <SessionProvider session={session}>
        <ApolloProvider client={apolloClient}>
          {/* <ClientOnly> */}
          <Nav />
          <Component {...pageProps} />
          {/* </ClientOnly> */}
        </ApolloProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
