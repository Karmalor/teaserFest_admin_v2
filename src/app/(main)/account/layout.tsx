import { Protect, useOrganizationList } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const AccountLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Protect
      condition={(has) =>
        has({ role: "org:admin" }) || has({ role: "org:billing_manager" })
      }
      fallback={
        <p className="flex items-center justify-center mt-16">
          You are not allowed to see this section.
        </p>
      }
    >
      {children}
    </Protect>
  );
};

export default AccountLayout;
