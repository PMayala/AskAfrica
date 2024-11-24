import Link from "next/link";
import Image from "next/image";

import Theme from "./Theme";
import MobileNav from "./MobileNav";
import GlobalSearch from "../search/GlobalSearch";

import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 sm:px-12 dark:shadow-none">
      <Link href="/" className="flex">
        <Image
          src="/assets/images/Cocoa Pod Fill.svg"
          width={35}
          height={20}
          alt="AskAfrika"
        />
        <p className="h1-bold ml-2 font-spaceGrotesk text-dark-100 max-sm:hidden dark:text-light-900">
          Ask<span className="text-primary-500 ">Africa</span>
        </p>
      </Link>
      <GlobalSearch />
      <div className="flex-between gap-5">
        <Theme />
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
