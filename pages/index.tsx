import {
  initializeApollo,
  addApolloStateAndReturnPageProps,
} from "@/lib/apolloClient";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import Posts from "../components/Posts";

const GET_USER = gql`
  query {
    findUserByID(id: "355966977470104151") {
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
  const { findUserByID: serverUser } = serverData.data;
  const { loading, error, data: clientData, refetch } = useQuery(GET_USER);

  // const getDataFromClientQuery = async () => {
  //   const data = await ApolloClient.query({ query: GET_USER });
  //   console.log(data);
  // };
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
        <img src={clientUser.img} alt="하이" />
        <div className="flex flex-col items-end mt-2">
          <h1 className="">{clientUser.name}</h1>
          <h2>{clientUser.description}</h2>
          {/* <button onClick={getDataFromClientQuery}>가져와임마</button> */}
        </div>
        <Posts posts={clientUser.posts} />
        하이
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  const data = await apolloClient.query({ query: GET_USER });
  console.log(data);
  return addApolloStateAndReturnPageProps(apolloClient, {
    props: {
      data,
    },
  });
}
