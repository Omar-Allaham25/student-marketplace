export interface ListingImage {
  id: string;
  url: string;
  listingId: string;
}

export interface ListingCategory {
  id: string;
  name: string;
  slug: string;
}

export interface ListingSeller {
  id: string;
  name: string;
}

export interface ListingCore {
  id: string;
  title: string;
  description: string;
  price: number;
  condition: string;
  status: string;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ListingCard extends ListingCore {
  category: ListingCategory;
  images: ListingImage[];
  user: ListingSeller;
}

export type ListingDetail = ListingCard;

export type UserOwnedListing = ListingCard;
export type FavoriteListing = ListingCard;

export interface ConversationListingPreview {
  id: string;
  title: string;
  images: ListingImage[];
}

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
export interface GetListingsByUserIdRequest {
  userId: string;
}
export interface GetListingsByUserIdResponse {
  status: string;
  message?: string;
  numberOfListings?: number;
  data: UserOwnedListing[];
}
export interface ListingMutationResponse {
  status: string;
  data: ListingCard;
  message?: string;
}
export interface DeleteListingRequest {
  id: string;
}
export interface DeleteListingResponse {
  status: string;
  message: string;
}