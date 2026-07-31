import { includes } from "zod";
import prisma from "../lib/prisma";
import { AppError } from "../utils/appError";

export const createMeassage = async (
  senderId: string,
  content: string,
  listingId: string,
) => {
  const listing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
    select: {
      userId: true,
      status: true,
    },
  });
  if (!listing) throw new AppError("Listing not found", 404);
  if (listing.status !== "active")
    throw new AppError("Listing is no longer active", 400);
  if (listing.userId === senderId)
    throw new AppError("You cannot message yourself", 400);

  let conversation = await prisma.conversation.findUnique({
    where: {
      listingId_buyerId: {
        listingId,
        buyerId: senderId,
      },
    },
  });
  if (!conversation) {
    conversation = await prisma.conversation.create({
      data: {
        buyerId: senderId,
        sellerId: listing.userId,
        listingId: listingId,
      },
    });
    const message = await prisma.message.create({
      data: {
        content,
        conversationId: conversation.id,
        senderID: senderId,
      },
    });
    return message;
  }
};
export const deleteMessage = async (messageId: string, userId: string) => {
  const message = await prisma.message.findUnique({
    where: { id: messageId },
  });
  if (!message) throw new AppError("Message not found", 404);
  if (message.senderID !== userId)
    throw new AppError("You can only delete your own messages", 403);
  return await prisma.message.update({
    where: { id: messageId },
    data: { isDeleted: true },
  });
};

export const checkingConversation = async (
  senderId: string,
  listingId: string,
) => {
  const conversation = await prisma.conversation.findUnique({
    where: { listingId_buyerId: { listingId, buyerId: senderId } },
    include: {
      message: { orderBy: { createdAt: "asc" } },
    },
  });
  if (!conversation) return null;
  const messages = await conversation.message.map((msg) => {
    msg.isDeleted ? { ...msg, content: "This message was deleted" } : msg;
  });
  return { ...conversation, message: messages };
};

export const getUserInbox = async (userId: string) => {
  const conversations = await prisma.conversation.findMany({
    where: {
      OR: [{ buyerId: userId }, { sellerId: userId }],
    },
    include: {
      listing: { select: { id: true, title: true, images: { take: 1 } } },
      buyer: { select: { id: true, name: true, avatarUrl: true } },
      seller: { select: { id: true, name: true, avatarUrl: true } },
      message: { orderBy: { createdAt: "desc" }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getConversationMessages = async (
  conversationId: string,
  userId: string,
) => {
  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
    include: {
      message: { orderBy: { createdAt: "asc" } },
    },
  });
  if (!conversation) throw new AppError("Conversation not found", 404);
  if (conversation.buyerId !== userId && conversation.sellerId !== userId)
    throw new AppError("You do not have permission to view this chat", 403);

  const formattedMessages = conversation.message.map((msg) => {
    msg.isDeleted ? "This message was deleted" : msg;
  });
  return formattedMessages;
};

export const markMessagesAsRead = async (
  conversationId: string,
  senderId: string,
) => {
  return await prisma.message.updateMany({
    where: {
      conversationId: conversationId,
      senderID: { not: senderId },
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });
};
