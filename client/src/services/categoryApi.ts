import api from "./api";
import type {
  CategoryIdRequest,
  CategoryMutationRequest,
  CategoryResponse,
  GetCategoriesResponse,
} from "../types/category";

export const categoryApi = {
  getAll: async (): Promise<GetCategoriesResponse> => {
    const response = await api.get<GetCategoriesResponse>("/category/getAll");
    return response.data;
  },

  create: async (name: string): Promise<CategoryResponse> => {
    const response = await api.post<CategoryResponse>("/category/create", { name });
    return response.data;
  },

  update: async (data: CategoryMutationRequest): Promise<CategoryResponse> => {
    const response = await api.patch<CategoryResponse>(
      `/category/modify/${data.id}`,
      { name: data.name },
    );
    return response.data;
  },

  remove: async (data: CategoryIdRequest): Promise<CategoryResponse> => {
    const response = await api.delete<CategoryResponse>(`/category/delete/${data.id}`);
    return response.data;
  },
};
