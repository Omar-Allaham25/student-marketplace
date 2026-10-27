import api from "./api";

export interface UniversityOption {
  id: string;
  name: string;
}

interface UniversitiesResponse {
  status: string;
  universities: UniversityOption[];
}

export const universityApi = {
  getAll: async (): Promise<UniversityOption[]> => {
    const response = await api.get<UniversitiesResponse>("/universities");
    return response.data.universities;
  },
};
