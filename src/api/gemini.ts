export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export const getGameSuggestions = async (prompt: string): Promise<GeminiResponse> => {
  try {
    const response = await fetch('https://findyournextgame-production-4b56.up.railway.app/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la requête Gemini');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la requête Gemini:', error);
    throw error;
  }
}; 