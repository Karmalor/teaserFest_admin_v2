"use client";

import SideNav from "@/components/sideNav";
// import { SignedIn } from "@clerk/nextjs";
import React from "react";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="md:w-64 fixed">
        <SideNav />
      </div>
      <div className="md:ml-64">{children}</div>
    </div>
  );
}

export default DashboardLayout;
