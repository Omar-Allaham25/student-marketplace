import api from "./api";

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  isActive: boolean;
  avatarUrl: string | null;
  createAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  status: string;
  token: string;
  user: User;
}
export  interface RegisterData {
  name: string;
  email: string;
  password: string;
}
export interface RegisterResponse {
  status: string;
   message: string;
  user: User;
}

export const authApi = {
  async login(data: LoginData): Promise<LoginResponse> {
    if (!data.email || !data.password) {
      throw new Error("Email and password are required");
    }

    const response = await api.post<LoginResponse>("/auth/login", data);

    return response.data;
  },
  async register(data:RegisterData): Promise<RegisterResponse> {
    if (!data.name || !data.email || !data.password) {
      throw new Error("Name, email and password are required");
    }
    const response =await api.post<RegisterResponse>('auth/register',data);
    return response.data;
  }
  
};

