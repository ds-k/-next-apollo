import { useSession } from "next-auth/react";

import Link from "next/link";
import Image from "next/image";
import React from "react";

const Nav = () => {
  const { data: session } = useSession();
  return (
    <header className="w-full h-20 ">
      <div className="fixed h-20 z-40 w-full flex justify-between backdrop-blur-[20px] backdrop-saturate-150 bg-white/50 dark:bg-[#0D0D1050]">
        <nav className="w-full max-w-[75ch] m-auto flex px-5 justify-between items-center ">
          <Link href="/">Daeseong Kim</Link>
          <Link href="/radix">Radix</Link>
          <Link href="/headless-ui">HeadlessUi</Link>
          {session ? (
            <Link href="/login" className="flex flex-row items-center gap-x-2">
              <Image
                src={session.user?.image}
                width={32}
                height={32}
                alt={session.user?.name}
                style={{ objectFit: "fill", width: 32, height: 32 }}
                className="rounded-full"
              ></Image>
              <div className="font-bold ">{session.user?.name}</div>
            </Link>
          ) : (
            <Link href="/login">login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Nav;
