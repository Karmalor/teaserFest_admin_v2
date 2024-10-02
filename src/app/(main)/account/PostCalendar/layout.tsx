"use client";

import SideNav from "@/components/sideNav";
// import { SignedIn } from "@clerk/nextjs";
import React from "react";

function PostCalendarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="md:w-64 md:fixed">
        <SideNav />
      </div>
      <div className="md:ml-64">{children}</div>
    </div>
  );
}

export default PostCalendarLayout;
