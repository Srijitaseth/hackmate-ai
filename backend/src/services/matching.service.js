const { getCommonItems, hasAny } = require("../utils/score");

function calculateMatchScore(userA, userB) {
  let score = 0;

  const commonSkills = getCommonItems(userA.skills, userB.skills);
  const commonInterests = getCommonItems(userA.interests, userB.interests);
  const commonGoals = getCommonItems(userA.hackathonGoals, userB.hackathonGoals);

  score += commonSkills.length * 10;
  score += commonInterests.length * 5;
  score += commonGoals.length * 7;

  if (
    userA.availability &&
    userB.availability &&
    userA.availability === userB.availability
  ) {
    score += 10;
  }

  const aRoles = userA.preferredRoles || [];
  const bRoles = userB.preferredRoles || [];

  if (
    (hasAny(aRoles, ["frontend"]) && hasAny(bRoles, ["backend"])) ||
    (hasAny(aRoles, ["backend"]) && hasAny(bRoles, ["frontend"]))
  ) {
    score += 15;
  }

  if (
    (hasAny(aRoles, ["ui/ux", "designer"]) &&
      hasAny(bRoles, ["frontend", "backend"])) ||
    (hasAny(bRoles, ["ui/ux", "designer"]) &&
      hasAny(aRoles, ["frontend", "backend"]))
  ) {
    score += 10;
  }

  return Math.min(score, 100);
}

function rankCandidates(currentUser, users) {
  return users
    .filter((user) => user.id !== currentUser.id)
    .map((user) => ({
      ...user,
      compatibilityScore: calculateMatchScore(currentUser, user),
    }))
    .sort((a, b) => b.compatibilityScore - a.compatibilityScore);
}

module.exports = {
  calculateMatchScore,
  rankCandidates,
};
