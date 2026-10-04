import { z } from "zod";

/** UI-only contract; deliberately independent of persistence and business rules. */
export const placeholderSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  status: z.literal("planned"),
});
export type Placeholder = z.infer<typeof placeholderSchema>;
