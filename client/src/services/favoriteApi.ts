import api from "./api";
import type { GetFavoritesResponse, ToggleFavoriteResponse } from "../types/favorite";

export const favoriteApi = {
  getFavorites: async (): Promise<GetFavoritesResponse> => {
    const response = await api.get<GetFavoritesResponse>("/favorites/getFavorites");
    return response.data;
  },
  toggleFavorite: async (
    listingId: string,
  ): Promise<ToggleFavoriteResponse> => {
    const response = await api.post<ToggleFavoriteResponse>(`/favorites/toggleFavorite/${listingId}`);
    return response.data;
  },
};
