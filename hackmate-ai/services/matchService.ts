import api from "./api";

export const getMatches = async (userId: string) => {
  const response = await api.get(`/api/matches/${userId}`);
  return response.data;
};
