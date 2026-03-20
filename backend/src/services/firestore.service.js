const { db } = require("../config/firebaseAdmin");

async function createOrUpdateUserProfile(userId, data) {
  const userRef = db.collection("users").doc(userId);

  await userRef.set(
    {
      ...data,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );

  const updatedDoc = await userRef.get();
  return { id: updatedDoc.id, ...updatedDoc.data() };
}

async function getUserProfile(userId) {
  const userDoc = await db.collection("users").doc(userId).get();

  if (!userDoc.exists) {
    return null;
  }

  return { id: userDoc.id, ...userDoc.data() };
}

async function getAllUsers() {
  const snapshot = await db.collection("users").get();
  const users = [];

  snapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });

  return users;
}

async function saveAiRecommendations(userId, recommendations) {
  const docRef = await db.collection("ai_recommendations").add({
    userId,
    recommendations,
    createdAt: new Date().toISOString(),
  });

  return docRef.id;
}

module.exports = {
  createOrUpdateUserProfile,
  getUserProfile,
  getAllUsers,
  saveAiRecommendations,
};
