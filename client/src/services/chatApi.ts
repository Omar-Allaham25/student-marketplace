import api from "./api";
import type {
  DeleteMessageRequest,
  DeleteMessageResponse,
  GetConversationMessagesResponse,
  GetConversationResponse,
  GetInboxResponse,
  SendMessageRequest,
  SendMessageResponse,
} from "../types/chat";

export const chatApi = {
  checkConversation: async (listingId: string): Promise<GetConversationResponse> => {
    const response = await api.get<GetConversationResponse>(
      `/message/conversation/${listingId}`,
    );
    return response.data;
  },

  sendMessage: async (data: SendMessageRequest): Promise<SendMessageResponse> => {
    const response = await api.post<SendMessageResponse>("/message/send", data);
    return response.data;
  },

  deleteMessage: async (
    data: DeleteMessageRequest,
  ): Promise<DeleteMessageResponse> => {
    const response = await api.delete<DeleteMessageResponse>(
      `/message/delete/${data.messageId}`,
    );
    return response.data;
  },

  getInbox: async (): Promise<GetInboxResponse> => {
    const response = await api.get<GetInboxResponse>("/message/inbox");
    return response.data;
  },

  getConversationMessages: async (
    conversationId: string,
  ): Promise<GetConversationMessagesResponse> => {
    const response = await api.get<GetConversationMessagesResponse>(
      `/message/conversation/${conversationId}`,
    );
    return response.data;
  },
};
