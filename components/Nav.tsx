import dayjs from "dayjs";
import React from "react";

const Nav = () => {
  return (
    <header className="w-full h-20 ">
      <div className="fixed h-20 z-40 w-full flex justify-between backdrop-blur-[20px] backdrop-saturate-150 bg-white/50 dark:bg-[#0D0D1050]">
        <nav className="w-full max-w-[75ch] m-auto flex px-5 justify-between items-center ">
          <a href="/">Daeseong Kim</a>
          <a href="/posts">Posts</a>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
