import api from "./api";
import type { ListingCard, ListingDetail } from "../types/listing";

export interface GetListingsRequest {
  page?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
  categoryId?: string;
}

export interface GetListingsResponse {
  status: string;
  resultLength: number;
  pagination: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    limit: number;
  };
  data: ListingCard[];
}

export interface GetListingByIdRequest {
  id: string;
}
export interface GetListingByIdResponse {
  status: string;
  data: ListingDetail;
}

export interface ListingMutationResponse {
  status: string;
  data: ListingCard;
  message?: string;
}

export const listingsApi = {
  getListingss: async (
    GetListingsData: GetListingsRequest,
  ): Promise<GetListingsResponse> => {
    const response = await api.get<GetListingsResponse>("/listings/getListings", {
      params: GetListingsData,
    });
    return response.data;
  },
  getListingById: async (data:GetListingByIdRequest): Promise<GetListingByIdResponse> => {
    const response = await api.get<GetListingByIdResponse>(`/listings/getListing/${data.id}`);
    return response.data;
  },
  createListing: async (formData: FormData): Promise<ListingMutationResponse> => {
    const response = await api.post<ListingMutationResponse>("/listings/createListing", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
