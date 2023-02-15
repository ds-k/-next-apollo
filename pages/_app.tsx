import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "@/components/Nav";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/lib/apolloClient";
import ClientOnly from "@/components/ClientOnly";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <ClientOnly>
          <Nav />
          <Component {...pageProps} />
        </ClientOnly>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
