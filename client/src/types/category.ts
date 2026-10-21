export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface GetCategoriesResponse {
  message: string;
  numberOfCategories: number;
  categories: Category[];
}

export interface CategoryResponse {
  message?: string;
  status?: string;
  category?: Category;
  data?: Category;
}

export interface CategoryMutationRequest {
  id: string;
  name: string;
}

export interface CategoryIdRequest {
  id: string;
}
