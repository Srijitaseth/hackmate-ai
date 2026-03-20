const {
    getUserProfile,
    getAllUsers,
    saveAiRecommendations,
  } = require("./firestore.service");
  const { rankCandidates } = require("./matching.service");
  const { generateAiRecommendations } = require("./openai.service");
  const { buildRecommendationPrompt } = require("../utils/prompts");
  
  async function runRecommendationAgent(userId) {
    const currentUser = await getUserProfile(userId);
  
    if (!currentUser) {
      throw new Error("User not found");
    }
  
    const allUsers = await getAllUsers();
    const rankedCandidates = rankCandidates(currentUser, allUsers);
    const topCandidates = rankedCandidates.slice(0, 10);
  
    const prompt = buildRecommendationPrompt(currentUser, topCandidates);
  
    let parsedResult;
  
    try {
      const aiText = await generateAiRecommendations(prompt);
      parsedResult = JSON.parse(aiText);
    } catch (error) {
      parsedResult = {
        topMatches: topCandidates.slice(0, 3).map((candidate) => ({
          userId: candidate.id,
          name: candidate.name || "Unknown",
          compatibilityScore: candidate.compatibilityScore,
          reason: "Strong overlap in skills, interests, or hackathon goals.",
          roleSuggestion: "Discuss role division based on strengths.",
          warning: "",
        })),
      };
    }
  
    await saveAiRecommendations(userId, parsedResult);
  
    return parsedResult;
  }
  
  module.exports = { runRecommendationAgent };
  