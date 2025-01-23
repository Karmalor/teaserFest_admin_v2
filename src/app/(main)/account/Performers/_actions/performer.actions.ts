"use server";

import { db } from "@/db";
import { formSubmissionsTable, SelectFormSubmission } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

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

export async function UpdateShowcaseOrderById(
  id: SelectFormSubmission["uuid"],
  order: number
) {
  await db
    .update(formSubmissionsTable)
    .set({
      order: order,
    })
    .where(eq(formSubmissionsTable.uuid, id));
}

export async function togglePerformerIsPaid(id: SelectFormSubmission["uuid"]) {
  const performer = await db
    .select()
    .from(formSubmissionsTable)
    .where(eq(formSubmissionsTable.uuid, id));

  await db
    .update(formSubmissionsTable)
    .set({
      isPaid: !performer[0].isPaid,
    })
    .where(eq(formSubmissionsTable.uuid, id));
}
