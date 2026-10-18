import api from "./api";
import type { FavoriteListing } from "../types/listing";

export interface GetFavoritesResponse {
  status: string;
  results: number;
  data: {
    favorites: FavoriteListing[];
  };
}

export interface ToggleFavoriteResponse {
  status: string;
  data: {
    status: "added" | "removed";
    message: string;
  };
}
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
