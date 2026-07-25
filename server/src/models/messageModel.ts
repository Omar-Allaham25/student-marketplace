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
export const getAllInboxConversations = async (userId: string) => {
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
