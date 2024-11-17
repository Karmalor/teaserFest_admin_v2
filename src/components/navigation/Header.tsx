"use client";

// import SlickButton from "@/components/custom/SlickButton";
import { Button } from "/Users/lukasgonzales/Projects/Code/Next/ai-formbuilder/components/ui/button.jsx";
import {
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  UserButton,
  useClerk,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import BackButton from "./BackButton";
import HomeButton from "./HomeButton";
import { LuMail } from "react-icons/lu";

function Header() {
  const { user, isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const path = usePathname();

  return (
    <>
      {isSignedIn ? (
        <div className="flex items-center justify-between mx-4 py-2 z-50">
          <div className="flex items-center justify-between gap-2 m- z-50 ">
            <BackButton />
            <HomeButton />
          </div>
          <div className="flex items-center justify-between gap-4 m-4 z-50 ">
            <a href="mailto: info@teaserfest.com">
              <LuMail />
            </a>
            <UserButton />
            <OrganizationSwitcher />
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between m-4 z-50 ">
            <div className="flex items-center justify-between gap-2 m-4 z-50 ">
              <BackButton />
              <HomeButton />
            </div>
            <div className="flex items-center justify-between gap-4 m-4 z-50 ">
              <a href="mailto: info@teaserfest.com">
                <LuMail />
              </a>
              <button onClick={() => openSignIn()}>Sign In</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Header;
