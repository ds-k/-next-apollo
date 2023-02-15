import { useMemo } from "react";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
  concat,
  ApolloLink,
} from "@apollo/client";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_FAUNA_DOMAIN,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const faunaKey = process.env.NEXT_PUBLIC_FAUNA_KEY;
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${faunaKey}`,
    },
  }));

  return forward(operation);
});

// * apolloClient를 만드는 함수
function createApolloClient() {
  return new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });
}

// * apolloClient를 초기화하는 함수
export function initializeApollo(
  initialState: NormalizedCacheObject | null = null
) {
  // * let으로 선언한 apolloClient가 undefined라면 ( === initalizeApollo가 한번도 호출된 적 없다면 )
  // * createApolloClient()를 통해 새로운 apolloClient를 만들고 할당
  const _apolloClient = apolloClient ?? createApolloClient();

  // * initailState가 있으면(cache를 넘겨받았다면) 기존 클라이언트 단의 apolloClient cache와
  // * 새롭게 넘겨받은 cache를 병합한다.
  if (initialState) {
    const existingCache = _apolloClient.extract();
    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    _apolloClient.cache.restore(data);
  }
  // * in server
  if (typeof window === "undefined") return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloStateAndReturnPageProps(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
