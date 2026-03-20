import api from "./api";
import { UserProfile } from "@/types/api";

export const saveUserProfile = async (user: UserProfile) => {
  const response = await api.post("/api/users/profile", user);
  return response.data;
};

export const getUserProfile = async (userId: string) => {
  const response = await api.get(`/api/users/profile/${userId}`);
  return response.data;
};
