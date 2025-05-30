// Mock data for video games
export interface Game {
  id: string;
  name: string;
  coverImage: string;
  genres: string[];
  platforms: string[];
  releaseYear?: number;
  description: string;
}

export interface GameRecommendation {
  game: Game;
  similarityScore: number;
  matchReason: string;
  purchaseLinks: {
    name: string;
    url: string;
  }[];
}

export const games: Game[] = [
  {
    id: "1",
    name: "The Witcher 3: Wild Hunt",
    coverImage: "https://images.pexels.com/photos/5490266/pexels-photo-5490266.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    genres: ["RPG", "Open World", "Action"],
    platforms: ["PC", "PlayStation", "Xbox", "Switch"],
    releaseYear: 2015,
    description: "An epic RPG with a compelling narrative and vast open world."
  },
  {
    id: "2",
    name: "Cyberpunk 2077",
    coverImage: "https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    genres: ["RPG", "Open World", "FPS", "Cyberpunk"],
    platforms: ["PC", "PlayStation", "Xbox"],
    releaseYear: 2020,
    description: "A futuristic open-world adventure set in Night City."
  },
  {
    id: "3",
    name: "Elden Ring",
    coverImage: "https://images.pexels.com/photos/5475783/pexels-photo-5475783.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    genres: ["Action RPG", "Open World", "Souls-like"],
    platforms: ["PC", "PlayStation", "Xbox"],
    releaseYear: 2022,
    description: "A challenging open-world action RPG created in collaboration with George R.R. Martin."
  },
  {
    id: "4",
    name: "God of War",
    coverImage: "https://images.pexels.com/photos/10795698/pexels-photo-10795698.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    genres: ["Action-Adventure", "Story-Rich", "Mythology"],
    platforms: ["PlayStation", "PC"],
    releaseYear: 2018,
    description: "A journey through Norse mythology as Kratos and his son Atreus."
  },
  {
    id: "5",
    name: "Horizon Zero Dawn",
    coverImage: "https://images.pexels.com/photos/4101555/pexels-photo-4101555.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    genres: ["Action RPG", "Open World", "Post-Apocalyptic"],
    platforms: ["PlayStation", "PC"],
    releaseYear: 2017,
    description: "An open-world adventure set in a post-apocalyptic world with mechanical creatures."
  },
  {
    id: "6",
    name: "Red Dead Redemption 2",
    coverImage: "https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&h=750&w=1260",
    genres: ["Action-Adventure", "Open World", "Western"],
    platforms: ["PC", "PlayStation", "Xbox"],
    releaseYear: 2018,
    description: "An epic tale of life in America's unforgiving heartland."
  },
  {
    id: "7",
    name: "The Legend of Zelda: Breath of the Wild",
    coverImage: "https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    genres: ["Action-Adventure", "Open World", "Puzzle"],
    platforms: ["Switch"],
    releaseYear: 2017,
    description: "An adventure across a vast and beautiful open world in the Kingdom of Hyrule."
  },
  {
    id: "8",
    name: "Dark Souls III",
    coverImage: "https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    genres: ["Action RPG", "Souls-like", "Dark Fantasy"],
    platforms: ["PC", "PlayStation", "Xbox"],
    releaseYear: 2016,
    description: "A challenging action RPG set in a dark and twisted world."
  },
  {
    id: "9",
    name: "Hades",
    coverImage: "https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    genres: ["Roguelike", "Action", "Indie", "Mythology"],
    platforms: ["PC", "Switch", "PlayStation", "Xbox"],
    releaseYear: 2020,
    description: "A roguelike dungeon crawler where you defy the god of the dead."
  },
  {
    id: "10",
    name: "Mass Effect Legendary Edition",
    coverImage: "https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    genres: ["RPG", "Sci-Fi", "Action"],
    platforms: ["PC", "PlayStation", "Xbox"],
    releaseYear: 2021,
    description: "A remastered collection of the epic space opera trilogy."
  },
  {
    id: "11",
    name: "Hollow Knight",
    coverImage: "https://images.pexels.com/photos/4639521/pexels-photo-4639521.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    genres: ["Metroidvania", "Indie", "Action"],
    platforms: ["PC", "Switch", "PlayStation", "Xbox"],
    releaseYear: 2017,
    description: "A challenging 2D action-adventure set in a ruined kingdom of insects and heroes."
  },
  {
    id: "12",
    name: "Control",
    coverImage: "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    genres: ["Action-Adventure", "Supernatural", "Third-Person"],
    platforms: ["PC", "PlayStation", "Xbox"],
    releaseYear: 2019,
    description: "A supernatural third-person action-adventure set in a secretive agency invaded by an otherworldly threat."
  },
  {
    id: "13",
    name: "Monster Hunter: World",
    coverImage: "https://images.pexels.com/photos/1174746/pexels-photo-1174746.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    genres: ["Action RPG", "Co-op", "Monster Hunting"],
    platforms: ["PC", "PlayStation", "Xbox"],
    releaseYear: 2018,
    description: "Hunt monsters solo or with friends in a living, breathing ecosystem."
  },
  {
    id: "14",
    name: "Persona 5 Royal",
    coverImage: "https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    genres: ["JRPG", "Turn-Based", "Social Sim"],
    platforms: ["PlayStation", "Switch", "PC", "Xbox"],
    releaseYear: 2020,
    description: "A turn-based JRPG about phantom thieves who steal corrupted desires."
  },
  {
    id: "15",
    name: "Doom Eternal",
    coverImage: "https://images.pexels.com/photos/163036/mario-luigi-figures-funny-163036.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    genres: ["FPS", "Action", "Fast-Paced"],
    platforms: ["PC", "PlayStation", "Xbox", "Switch"],
    releaseYear: 2020,
    description: "A fast-paced first-person shooter about slaying demons."
  }
];

// Mock function to simulate AI recommendations
export const getRecommendations = (
  selectedGames: string[], 
  userDescription: string
): GameRecommendation[] => {
  // This is a simplified mock recommendation algorithm
  // In a real app, this would be a server call to an AI service
  
  // Create a pool of games excluding the selected ones
  const gamePool = games.filter(g => !selectedGames.includes(g.id));
  
  // Get the selected games for reference
  const selectedGameObjects = games.filter(g => selectedGames.includes(g.id));
  
  // Generate recommendations with detailed matching reasons
  const recommendations = gamePool.map(game => {
    // Calculate genre overlap
    const sharedGenres = game.genres.filter(genre => 
      selectedGameObjects.some(selectedGame => 
        selectedGame.genres.includes(genre)
      )
    );
    
    // Base score between 60-75%
    let baseScore = Math.floor(Math.random() * 15) + 60;
    
    // Add bonus for genre overlap
    if (sharedGenres.length > 0) {
      baseScore += Math.floor(Math.random() * 20) + 5;
    }
    
    // Cap at 98% to avoid perfect matches
    const score = Math.min(baseScore, 98);
    
    // Generate match reason based on game characteristics
    const selectedGame = selectedGameObjects[0]; // Use first selected game as reference
    const matchReason = generateMatchReason(game, selectedGame, sharedGenres);
    
    // Generate purchase links
    const purchaseLinks = [
      {
        name: "Instant Gaming",
        url: `https://www.instant-gaming.com/en/search/?q=${encodeURIComponent(game.name)}`
      },
      {
        name: "Kinguin",
        url: `https://www.kinguin.net/listing?active=1&phrase=${encodeURIComponent(game.name)}`
      }
    ];
    
    return {
      game,
      similarityScore: score,
      matchReason,
      purchaseLinks
    };
  });
  
  // Sort by similarity score and return top 3
  return recommendations
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, 3);
};

// Helper function to generate match reasons
function generateMatchReason(game: Game, referenceGame: Game, sharedGenres: string[]): string {
  const reasons = [];
  
  // Add genre-based reason
  if (sharedGenres.length > 0) {
    reasons.push(`Partage les genres ${sharedGenres.join(", ")} avec ${referenceGame.name}`);
  }
  
  // Add platform overlap reason
  const sharedPlatforms = game.platforms.filter(p => referenceGame.platforms.includes(p));
  if (sharedPlatforms.length > 0) {
    reasons.push(`Disponible sur les mêmes plateformes`);
  }
  
  // Add unique selling point
  const uniqueFeatures = {
    "RPG": "une histoire riche et immersive",
    "Open World": "un vaste monde à explorer",
    "Action": "un gameplay dynamique",
    "Co-op": "une expérience multijoueur",
  };
  
  const uniqueGenre = game.genres.find(g => !sharedGenres.includes(g));
  if (uniqueGenre && uniqueFeatures[uniqueGenre as keyof typeof uniqueFeatures]) {
    reasons.push(`Offre ${uniqueFeatures[uniqueGenre as keyof typeof uniqueFeatures]}`);
  }
  
  return reasons.join(". ") + ".";
}