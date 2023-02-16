/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";

type Tag = {
  name: string;
  post: Post[];
};

type Post = {
  _id: string;
  title: string;
  author: {
    name: string;
  };
  body: string;
  image: string;
  tags: { data: Tag[] };
};

interface Props {
  posts: {
    data: Post[];
  };
}

const Posts = ({ posts }: Props) => {
  const { data: postList } = posts;
  return (
    <div className="grid grid-cols-3 gap-6 mt-4">
      {postList.map((post) => {
        return (
          <Link
            href={`/post/${post._id}`}
            key={post._id}
            className="flex flex-col w-full "
          >
            <div className="h-32 overflow-hidden rounded-md">
              <img src={post.image} alt={post.body} />
            </div>
            <h1>{post.title}</h1>
            <h3>{post.body}</h3>
          </Link>
        );
      })}
    </div>
  );
};

export default Posts;
