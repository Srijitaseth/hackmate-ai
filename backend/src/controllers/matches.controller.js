const {
    getUserProfile,
    getAllUsers,
  } = require("../services/firestore.service");
  const { rankCandidates } = require("../services/matching.service");
  
  async function getMatches(req, res) {
    try {
      const { userId } = req.params;
  
      const currentUser = await getUserProfile(userId);
  
      if (!currentUser) {
        return res.status(404).json({
          success: false,
          error: "User not found",
        });
      }
  
      const allUsers = await getAllUsers();
      const rankedMatches = rankCandidates(currentUser, allUsers);
  
      res.status(200).json({
        success: true,
        count: rankedMatches.length,
        data: rankedMatches,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
  
  module.exports = { getMatches };
  