import api from "./api";

export const getAiRecommendations = async (userId: string) => {
  const response = await api.post("/api/ai/recommend", { userId });
  return response.data;
};
