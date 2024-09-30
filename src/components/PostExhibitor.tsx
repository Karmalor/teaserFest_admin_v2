import { db } from "@/db";
import { formSubmissionsTable } from "@/db/schema";
import React from "react";

interface Application {
  uuid: string;
  applicantResponse:
    | {
        nameOfAct?: string;
      }
    | unknown;
  applicationSubmitted: boolean | null;
  submittedAt: string | null;
}

const PostExhibitor = async () => {
  const applications: Application[] = await db

    .select()
    .from(formSubmissionsTable)
    .orderBy(formSubmissionsTable.createdAt);

  if (!applications) {
    throw new Error("Applications not found");
  }
  return (
    <div className="">
      <h1>{applications[0].submittedAt}</h1>
    </div>
  );
};

export default PostExhibitor;
