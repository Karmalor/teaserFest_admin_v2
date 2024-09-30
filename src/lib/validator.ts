import * as z from "zod";

export const PostScheduler = z.object({
  imageUrl: z.string().optional(),
  copy: z.string().optional(),
  date: z.string(),
});
