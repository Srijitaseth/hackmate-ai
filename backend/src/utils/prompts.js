function buildRecommendationPrompt(currentUser, candidates) {
    return `
  You are an AI hackathon teammate recommendation assistant.
  
  Analyze the current user and the candidate teammates.
  Choose the best 3 matches.
  Explain why they are a good match.
  Suggest what role each person can take.
  Mention any warning if there is a mismatch.
  
  Return ONLY valid JSON in this exact format:
  
  {
    "topMatches": [
      {
        "userId": "string",
        "name": "string",
        "compatibilityScore": 0,
        "reason": "string",
        "roleSuggestion": "string",
        "warning": "string"
      }
    ]
  }
  
  Current user:
  ${JSON.stringify(currentUser, null, 2)}
  
  Candidates:
  ${JSON.stringify(candidates, null, 2)}
    `;
  }
  
  module.exports = { buildRecommendationPrompt };
  