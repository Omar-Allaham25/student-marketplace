import api from "./api";
import type {
  ListingMutationResponse,
  GetListingsRequest,
  GetListingsResponse,
  GetListingByIdRequest,
  GetListingByIdResponse,
  GetListingsByUserIdRequest,
  GetListingsByUserIdResponse,
  DeleteListingResponse,
  DeleteListingRequest,
} from "../types/listing";

export const listingsApi = {
  getListings: async (
    GetListingsData: GetListingsRequest,
  ): Promise<GetListingsResponse> => {
    const response = await api.get<GetListingsResponse>(
      "/listings/getListings",
      {
        params: GetListingsData,
      },
    );
    return response.data;
  },
  getListingById: async (
    data: GetListingByIdRequest,
  ): Promise<GetListingByIdResponse> => {
    const response = await api.get<GetListingByIdResponse>(
      `/listings/getListing/${data.id}`,
    );
    return response.data;
  },
  getListingsByUserId: async (
    data: GetListingsByUserIdRequest,
  ): Promise<GetListingsByUserIdResponse> => {
    const response = await api.get<GetListingsByUserIdResponse>(
      `/listings/getListingsByUserId/${data.userId}`,
    );
    return response.data;
  },
  updateListing: async (
    formData: FormData,
  ): Promise<ListingMutationResponse> => {
    const response = await api.patch<ListingMutationResponse>(
      `/listings/modifyListing`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },
  createListing: async (
    formData: FormData,
  ): Promise<ListingMutationResponse> => {
    const response = await api.post<ListingMutationResponse>(
      "/listings/createListing",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },
  deleteListing: async (
    data: DeleteListingRequest,
  ): Promise<DeleteListingResponse> => {
    const response = await api.delete<DeleteListingResponse>(
      `/listings/deleteListing/${data.id}`,
    );
    return response.data;
  },
};
