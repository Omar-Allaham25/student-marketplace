import type { ConversationListingPreview } from "./listing";

export interface ChatMessage {
  id: string;
  content: string;
  isRead: boolean;
  isDeleted: boolean;
  createdAt: string;
  conversationId: string;
  senderID: string;
}

export interface ChatParticipant {
  id: string;
  name: string;
  avatarUrl: string | null;
}

export interface Conversation {
  id: string;
  buyerId: string;
  sellerId: string;
  listingId: string;
  createdAt: string;
  UpdatedAt: string;
}

export interface InboxConversation extends Conversation {
  listing: ConversationListingPreview;
  buyer: ChatParticipant;
  seller: ChatParticipant;
  message: ChatMessage[];
}

export interface ConversationWithMessages extends Conversation {
  message: ChatMessage[];
}

export interface SendMessageRequest {
  listingId: string;
  content: string;
}

export interface SendMessageResponse {
  status: string;
  data: ChatMessage & { conversation: Conversation };
}

export interface GetInboxResponse {
  status: string;
  data: InboxConversation[];
}

export interface GetConversationResponse {
  status: string;
  data: ConversationWithMessages | null;
}

export interface GetConversationMessagesResponse {
  status: string;
  data: ChatMessage[];
}

export interface DeleteMessageRequest {
  messageId: string;
}

export interface DeleteMessageResponse {
  status: string;
  message: string;
}
