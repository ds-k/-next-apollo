/* eslint-disable @next/next/no-img-element */
import { signIn, signOut, useSession } from "next-auth/react";

const Login = () => {
  const { data: session } = useSession();

  if (session) {
    const { user, expires } = session;

    return (
      <div className="flex flex-col items-center my-20 gap-y-4">
        <div>
          <img
            className="my-6 rounded-2xl w-60"
            src={user?.image}
            alt={user?.name}
          />
        </div>
        <h1 className="text-2xl font-bold">{user?.name}</h1>
        <h2 className="text-lg text-gray-600">{user?.email}</h2>
        <h3 className="text-lg text-gray-600">{expires}</h3>

        <button className="w-32 h-10 bg-slate-400" onClick={() => signOut()}>
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center my-20 gap-y-4">
      <button
        className="w-32 h-10 bg-green-400 rounded-md"
        onClick={() => signIn("naver")}
      >
        네이버
      </button>
      <button
        className="w-32 h-10 bg-yellow-400 rounded-md"
        onClick={() => signIn("kakao")}
      >
        카카오
      </button>
    </div>
  );
};

export default Login;
