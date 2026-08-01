import { z } from "zod";

export const createMessageSchema = z.object({
  content: z.string({ message: "Content is required" }).max(300),
  listingId: z
    .string({ message: "Listing id is required" })
    .uuid({ message: "Listing id must be a valid UUID" }),
});

export const deleteMessageSchema = z.object({
  params: z.object({
    messageId: z
      .string({ message: "Message id is required" })
      .uuid({ message: "Message id must be a valid UUID" }),
  }),
});
export const getConversationMessagesSchema = z.object({
  query: z.object({
    conversationId: z
      .string({ message: "Conversation id is required" })
      .uuid({ message: "Conversation id must be a valid UUID" }),
  }),
});
