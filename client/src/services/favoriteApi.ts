import api from "./api";

interface listing {
  id: string;
  title: string;
  description: string;
  price: number;
  condition: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  categoryId: string;
}
interface GetFavoritesResponse {
  status: string;
  results: number;
  data: {
    favorites: listing[];
  };
}
export const favoriteApi = {
  getFavorites: async (): Promise<GetFavoritesResponse> => {
    const response = await api.get("/favorites/getFavorites");
    return response.data;
  },
  toggleFavorite: async (listingId: string): Promise<{ status: string; message: string }> => {
    const response = await api.post(`/favorites/toggleFavorite/${listingId}`);
    return response.data;
  }
};
