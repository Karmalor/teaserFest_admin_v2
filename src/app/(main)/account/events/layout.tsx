"use client";

import SideNavEvents from "@/components/sideNavEvents";
import { SignedIn } from "@clerk/nextjs";
import React from "react";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="md:w-64 fixed">
        <SideNavEvents />
      </div>
      <div className="md:ml-64">{children}</div>
    </div>
  );
}

export default DashboardLayout;
