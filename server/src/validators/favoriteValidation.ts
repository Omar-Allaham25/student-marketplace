import { z } from "zod";

export const favoriteSchema = z.object({
  params: z.object({
    listingId: z.string().uuid("Invalid listingId format"),
  }),
});
