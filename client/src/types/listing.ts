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

/** The shared payload returned for marketplace listing cards and details. */
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
