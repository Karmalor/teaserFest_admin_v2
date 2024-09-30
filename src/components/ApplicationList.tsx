"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

let fullfilled = false;
let promise: Promise<void> | null = null;

const useTimeout = (ms: number) => {
  if (!fullfilled) {
    throw (promise ||= new Promise((res) => {
      setTimeout(() => {
        fullfilled = true;
        res();
      }, ms);
    }));
  }
};
const ApplicationList = ({ applications }: { applications: any }) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  useTimeout(2000);

  return (
    <div>
      {applications.map((application: any, index: number) => (
        <div
          key={index}
          className="flex flex-row gap-4 p-2 items-center justify-between "
        >
          <div className="flex flex-row gap-4 p-2">
            {application.applicantResponse.stageName ? (
              <h1 className="text-start">
                {application.applicantResponse.stageName}
              </h1>
            ) : (
              "..."
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApplicationList;
