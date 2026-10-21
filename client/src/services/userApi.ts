import api from "./api";
import type {
  GetAllUsersResponse,
  GetUserResponse,
  UpdateUserResponse,
  UserIdRequest,
  UserMessageResponse,
} from "../types/user";

export const userApi = {
  getMe: async (): Promise<GetUserResponse> => {
    const response = await api.get<GetUserResponse>("/user/me");
    return response.data;
  },

  getById: async (data: UserIdRequest): Promise<GetUserResponse> => {
    const response = await api.get<GetUserResponse>(`/user/${data.id}`);
    return response.data;
  },

  getAll: async (): Promise<GetAllUsersResponse> => {
    const response = await api.get<GetAllUsersResponse>("/user");
    return response.data;
  },

  update: async (formData: FormData): Promise<UpdateUserResponse> => {
    const response = await api.patch<UpdateUserResponse>("/user/update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  deactivate: async (): Promise<UserMessageResponse> => {
    const response = await api.delete<UserMessageResponse>("/user/delete");
    return response.data;
  },

  delete: async (data: UserIdRequest): Promise<UserMessageResponse> => {
    const response = await api.delete<UserMessageResponse>(`/user/delete/${data.id}`);
    return response.data;
  },
};
