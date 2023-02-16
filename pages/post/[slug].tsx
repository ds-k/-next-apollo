/* eslint-disable @next/next/no-img-element */
import {
  addApolloStateAndReturnPageProps,
  initializeApollo,
} from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import React from "react";

const slug = ({ data }: any) => {
  const { findPostByID: post } = data;

  return (
    <div className="flex flex-col items-center pt-20">
      <div>
        <img className="my-6 w-60 " src={post.image} alt={post.id} />
      </div>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <h2 className="text-lg text-gray-600">{post.author.name}</h2>
      <main>{post.body}</main>
    </div>
  );
};

export async function getServerSideProps({ params }: any) {
  const { slug } = params;

  const apolloClient = initializeApollo();

  const GET_POST = gql`
    query GET_POST($id: ID!) {
      findPostByID(id: $id) {
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
  `;

  const { data } = await apolloClient.query({
    query: GET_POST,
    variables: {
      id: slug,
    },
  });
  return addApolloStateAndReturnPageProps(apolloClient, {
    props: {
      data,
    },
  });
}

export default slug;
