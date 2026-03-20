const { z } = require("zod");
const {
  createOrUpdateUserProfile,
  getUserProfile,
} = require("../services/firestore.service");

const userSchema = z.object({
  userId: z.string().min(1, "userId is required"),
  name: z.string().min(1, "name is required"),
  email: z.string().email("valid email is required"),
  college: z.string().optional().default(""),
  year: z.string().optional().default(""),
  bio: z.string().optional().default(""),
  skills: z.array(z.string()).optional().default([]),
  interests: z.array(z.string()).optional().default([]),
  preferredRoles: z.array(z.string()).optional().default([]),
  experienceLevel: z.string().optional().default(""),
  availability: z.string().optional().default(""),
  hackathonGoals: z.array(z.string()).optional().default([]),
});

async function createOrUpdateUser(req, res) {
  try {
    const validatedData = userSchema.parse(req.body);
    const { userId, ...profileData } = validatedData;

    const savedUser = await createOrUpdateUserProfile(userId, {
      ...profileData,
      createdAt: new Date().toISOString(),
    });

    res.status(200).json({
      success: true,
      message: "User profile saved successfully",
      data: savedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
}

async function getUser(req, res) {
  try {
    const { userId } = req.params;
    const user = await getUserProfile(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = {
  createOrUpdateUser,
  getUser,
};
