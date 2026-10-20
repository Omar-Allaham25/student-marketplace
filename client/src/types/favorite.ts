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
