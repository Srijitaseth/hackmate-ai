import React, { useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { saveUserProfile } from "@/services/userService";
import { getMatches } from "@/services/matchService";
import { getAiRecommendations } from "@/services/aiService";
import { CURRENT_USER_ID } from "@/constants/user";

export default function TestApiScreen() {
  const [result, setResult] = useState<any>(null);

  const handleSaveProfile = async () => {
    try {
      const response = await saveUserProfile({
        userId: CURRENT_USER_ID,
        name: "Srijita",
        email: "srijita@example.com",
        college: "SRM",
        year: "3rd Year",
        bio: "I love hackathons and building AI apps",
        skills: ["React Native", "UI/UX", "JavaScript"],
        interests: ["AI", "Startups", "Hackathons"],
        preferredRoles: ["Frontend", "Designer"],
        experienceLevel: "Intermediate",
        availability: "Evenings",
        hackathonGoals: ["Win hackathons", "Build startup ideas"],
      });

      setResult(response);
    } catch (error: any) {
      setResult(error?.response?.data || error.message);
    }
  };

  const handleGetMatches = async () => {
    try {
      const response = await getMatches(CURRENT_USER_ID);
      setResult(response);
    } catch (error: any) {
      setResult(error?.response?.data || error.message);
    }
  };

  const handleGetAi = async () => {
    try {
      const response = await getAiRecommendations(CURRENT_USER_ID);
      setResult(response);
    } catch (error: any) {
      setResult(error?.response?.data || error.message);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        gap: 16,
        backgroundColor: "#000",
        minHeight: "100%" as any,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}>
        API Test Screen
      </Text>

      <Button title="Save Profile" onPress={handleSaveProfile} />
      <Button title="Get Matches" onPress={handleGetMatches} />
      <Button title="Get AI Recommendations" onPress={handleGetAi} />

      <View
        style={{
          marginTop: 20,
          padding: 12,
          backgroundColor: "#111",
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "#fff" }} selectable>
          {result ? JSON.stringify(result, null, 2) : "No result yet"}
        </Text>
      </View>
    </ScrollView>
  );
}
