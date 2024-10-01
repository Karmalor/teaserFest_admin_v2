import * as z from "zod";

export const PostScheduler = z.object({
  imageUrl: z.string(),
  copy: z.string(),
  date: z.string(),
});
