const { z } = require("zod");
const { runRecommendationAgent } = require("../services/agent.service");

const aiSchema = z.object({
  userId: z.string().min(1, "userId is required"),
});

async function getAiRecommendations(req, res) {
  try {
    const validatedData = aiSchema.parse(req.body);
    const result = await runRecommendationAgent(validatedData.userId);

    res.status(200).json({
      success: true,
      message: "AI recommendations generated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = { getAiRecommendations };
