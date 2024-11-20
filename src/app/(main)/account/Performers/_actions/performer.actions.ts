"use server";

import { db } from "@/db";
import { formSubmissionsTable, SelectFormSubmission } from "@/db/schema";
import { applicantResponse } from "@/types";
import { eq } from "drizzle-orm";

export async function UpdateApplicationById(
  id: SelectFormSubmission["uuid"],
  showcaseArray: string[]
) {
  await db
    .update(formSubmissionsTable)
    .set({
      showcases: showcaseArray,
    })
    .where(eq(formSubmissionsTable.uuid, id));
}
