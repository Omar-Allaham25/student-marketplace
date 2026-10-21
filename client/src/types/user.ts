import type { UserOwnedListing } from "./listing";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  isActive: boolean;
  avatarUrl: string | null;
  createdAt: string;
  updateAt: string;
}

export interface UserWithListings extends User {
  listings: UserOwnedListing[];
}

export interface GetUserResponse {
  status: string;
  user: UserWithListings;
}

export interface GetAllUsersResponse {
  status: string;
  numberOfUsers: number;
  users: User[];
}

export interface UserMessageResponse {
  status: string;
  message: string;
}

export interface UpdateUserResponse {
  status: string;
  user: User;
}

export interface UserIdRequest {
  id: string;
}
