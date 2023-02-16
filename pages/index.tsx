/* eslint-disable @next/next/no-img-element */
import {
  initializeApollo,
  addApolloStateAndReturnPageProps,
} from "@/lib/apolloClient";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import Posts from "../components/Posts";

const GET_USER = gql`
  query User($id: ID!) {
    findUserByID(id: $id) {
      _id
      description
      name
      img
      birth
      posts {
        data {
          _id
          title
          author {
            name
          }
          body
          image
          tags {
            data {
              name
            }
          }
        }
      }
    }
  }
`;

export default function Home({ data: serverData }: any) {
  const { findUserByID: user } = serverData.data;
  const {
    loading,
    error,
    data: clientData,
    refetch,
  } = useQuery(GET_USER, {
    variables: {
      id: "355966977470104151",
    },
  });

  if (loading)
    return (
      <div className="flex items-center justify-center 100vh 100vw animate-pulse">
        loading...
      </div>
    );
  if (error) return <>{`Error! ${error.message}`}</>;
  const { findUserByID: clientUser } = clientData;
  return (
    <main className="w-full max-w-[75ch] m-auto flex px-5 justify-between items-center">
      <div className="flex flex-col">
        <img src={user.img} alt={user} />
        <div className="flex flex-col items-end mt-2">
          <h1 className="">{user.name}</h1>
          <h2>{user.description}</h2>
          {/* <button onClick={getDataFromClientQuery}>가져와임마</button> */}
        </div>
        <Posts posts={user.posts} />
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  const data = await apolloClient.query({
    query: GET_USER,
    variables: {
      id: "355966977470104151",
    },
  });
  return addApolloStateAndReturnPageProps(apolloClient, {
    props: {
      data,
    },
  });
}
