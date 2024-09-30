"use server";

import { db } from "@/db";
import { handleError } from "../utils";
import { marketingPostTable, SelectMarketingPost } from "@/db/schema";
import { CreateMarketingPostParams } from "@/types";
import { eq } from "drizzle-orm";

export async function createMarketingPost(formData: CreateMarketingPostParams) {
  await db.insert(marketingPostTable).values(formData);
}

export async function getMarketingPostByDate(date: any): Promise<Array<{}>> {
  return db
    .select()
    .from(marketingPostTable)
    .where(eq(marketingPostTable.date, date));
}

export async function getAllMarketingPosts(): Promise<Array<{}>> {
  return db.select().from(marketingPostTable);
}
