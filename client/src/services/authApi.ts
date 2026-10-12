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
  user: User;
}
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
export interface RegisterResponse {
  status: string;
  message: string;
  user: User;
}
export interface forgotPasswordData {
  email: string;
}
export interface resetPasswordData {
  token: string;
  newPassword: string;
}
export interface AuthMessageResetResponse {
  status: string;
  message: string;
}

export const authApi = {
  login: async (data: LoginData): Promise<LoginResponse> => {
    if (!data.email || !data.password) {
      throw new Error("Email and password are required");
    }

    const response = await api.post<LoginResponse>("/auth/login", data);

    return response.data;
  },
  register: async (data: RegisterData): Promise<RegisterResponse> => {
    if (!data.name || !data.email || !data.password) {
      throw new Error("Name, email and password are required");
    }
    const response = await api.post<RegisterResponse>("auth/register", data);
    return response.data;
  },
  verifyEmail: async (token: string): Promise<AuthMessageResetResponse> => {
    if (!token) {
      throw new Error("Token is required");
    }
    const response = await api.get<AuthMessageResetResponse>(
      `auth/verify-email/${token}`
    );
    return response.data;
  },
  forgotPassword: async (data:forgotPasswordData): Promise<AuthMessageResetResponse> => {
    if (!data.email) {
      throw new Error("Email is required");
    }
    const response = await api.post<AuthMessageResetResponse>(
      "auth/forgot-password",
      data,
    );
    return response.data;
  },
  resetPassword: async (data: resetPasswordData): Promise<AuthMessageResetResponse> => {
    if (!data.token || !data.newPassword) {
      throw new Error("Token and new password are required");
    }
    const response = await api.post<AuthMessageResetResponse>(
      `auth/reset-password/${data.token}`,
      { password: data.newPassword },
    );
    return response.data;
  },
};
