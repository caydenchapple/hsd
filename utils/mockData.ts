export interface Movie {
  id: number;
  title?: string;
  name?: string; // TV shows use 'name'
  poster_path: string;
  backdrop_path: string;
  logo_path?: string; // Logo image URL
  overview: string;
  vote_average?: number;
  genre_ids?: number[];
}

export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export const netflixOriginals: Movie[] = [
  {
    id: 66732,
    name: "Stranger Things",
    poster_path: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    backdrop_path: "/56v2KjBlU4XaOv9rVYkJu64COcfe.jpg",
    logo_path: "/9QusGjxcYvfPD1THg6oW3RLeNn7.png", // Example logo
    overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    vote_average: 8.6,
  },
  {
    id: 119051,
    name: "Wednesday",
    poster_path: "/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    backdrop_path: "/iHSwvRVsRyxpX787C4BNvehsDtp.jpg",
    overview: "Wednesday Addams is sent to Nevermore Academy, a bizarre boarding school where she attempts to master her psychic powers, stop a monstrous killing spree of the town citizens, and solve the supernatural mystery that affected her family 25 years ago — all while navigating her new and very tangled relationships.",
    vote_average: 8.5,
  },
  {
    id: 93405,
    name: "Squid Game",
    poster_path: "/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
    backdrop_path: "/ecvy2kMxuAm8wIDx2N8T0p9W0T.jpg",
    overview: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes. A survival game that has a whopping 45.6 billion-won prize at stake.",
    vote_average: 8.3,
  },
  {
    id: 71912,
    name: "The Witcher",
    poster_path: "/cZ0d3tCFl136jDOE_qcPFyP107q.jpg",
    backdrop_path: "/jBJWaqoSCiARWtfV0GlqH1dDdTw.jpg",
    overview: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.",
    vote_average: 8.1,
  },
  {
    id: 63174,
    name: "Lucifer",
    poster_path: "/ekZobS2yOfuNLVSx2NPIrU8SeOq.jpg",
    backdrop_path: "/aDBRtunw49UF4XmqeBeCNjzhEBu.jpg",
    overview: "Bored and unhappy as the Lord of Hell, Lucifer Morningstar abandoned his throne and retired to Los Angeles, where he has teamed up with LAPD detective Chloe Decker to take down criminals.",
    vote_average: 8.5,
  },
];

export const trendingNow: Movie[] = [
  {
    id: 533535,
    title: "Deadpool & Wolverine",
    poster_path: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    backdrop_path: "/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg",
    logo_path: "/c5Tqxeo1UpBvnAc3csUm7j3y8qA.png", 
    overview: "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
    vote_average: 8.0,
  },
  {
    id: 693134,
    title: "Dune: Part Two",
    poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    logo_path: "/lz0j4c9TfX8Z0z6v5x1y5g6.png",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
    vote_average: 8.3,
  },
  {
    id: 1022789,
    title: "Inside Out 2",
    poster_path: "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    backdrop_path: "/xg27NrXi7VXCGUr7MG75UqLl6Vg.jpg",
    overview: "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
    vote_average: 7.9,
  },
  {
    id: 786892,
    title: "Furiosa: A Mad Max Saga",
    poster_path: "/iADOJ8Zymht2JkoyZE94VZP18me.jpg",
    backdrop_path: "/wNAhuOZ3Zf84jCIlrcI6JhgmY5q.jpg",
    overview: "As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus. Sweeping through the Wasteland they come across the Citadel presided over by The Immortan Joe. While the two Tyrants war for dominance, Furiosa must survive many trials as she puts together the means to find her way home.",
    vote_average: 7.7,
  },
];

export const topRated: Movie[] = [
  {
    id: 278,
    title: "The Shawshank Redemption",
    poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    backdrop_path: "/kXfqcd0tIuWP06gdG0kQ1pZ9Pjo.jpg",
    overview: "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
    vote_average: 8.7,
  },
  {
    id: 238,
    title: "The Godfather",
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop_path: "/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg",
    overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
    vote_average: 8.7,
  },
  {
    id: 155,
    title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
    vote_average: 8.6,
  },
];

export const actionMovies: Movie[] = [
  {
    id: 603692,
    title: "John Wick: Chapter 4",
    poster_path: "/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    backdrop_path: "/h8gHn0OzRogZ6qVaiCpM05H9IX.jpg",
    overview: "With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.",
    vote_average: 7.8,
  },
  {
    id: 575264,
    title: "Mission: Impossible - Dead Reckoning Part One",
    poster_path: "/NNxYkU70HPurnNCSiCjYAmacwm.jpg",
    backdrop_path: "/628Dep6AxEtDxjKo52hXfIy22Y.jpg",
    overview: "Ethan Hunt and his IMF team embark on their most dangerous mission yet: To track down a terrifying new weapon that threatens all of humanity before it falls into the wrong hands. With control of the future and the fate of the world at stake, and dark forces from Ethan's past closing in, a deadly race around the globe begins. Confronted by a mysterious, all-powerful enemy, Ethan is forced to consider that nothing can matter more than his mission – not even the lives of those he cares about most.",
    vote_average: 7.6,
  },
  {
    id: 361743,
    title: "Top Gun: Maverick",
    poster_path: "/62HCnUTziyWcpDaBO2i1DX17dbH.jpg",
    backdrop_path: "/AaV1YIdWKnjAIAOe8UUKBFm327v.jpg",
    overview: "After more than thirty years of service as one of the Navy’s top aviators, and dodging the advancement in rank that would ground him, Pete “Maverick” Mitchell finds himself training a detachment of TOP GUN graduates for a specialized mission the likes of which no living pilot has ever seen.",
    vote_average: 8.3,
  },
];

export const comedyMovies: Movie[] = [
  {
    id: 346698,
    title: "Barbie",
    poster_path: "/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    backdrop_path: "/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg",
    overview: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
    vote_average: 7.1,
  },
  {
    id: 550,
    title: "Fight Club",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdrop_path: "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
    overview: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
    vote_average: 8.4,
  },
];

export const horrorMovies: Movie[] = [
  {
    id: 951491,
    title: "Saw X",
    poster_path: "/aQPeznSu7XDTrrdCtT5eLiu52Yu.jpg",
    backdrop_path: "/k1KrbaCMACQiq7EA0Yhw3bdzMv7.jpg",
    overview: "Between the events of 'Saw' and 'Saw II', a sick and desperate John Kramer travels to Mexico for a risky and experimental medical procedure in hopes of a miracle cure for his cancer - only to discover the entire operation is a scam to defraud the most vulnerable. The infamous serial killer returns to his work, turning the tables on the con artists in his signature visceral way through a series of ingenious and terrifying traps.",
    vote_average: 7.4,
  },
];

export const romanceMovies: Movie[] = [
  {
    id: 13,
    title: "Forrest Gump",
    poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    backdrop_path: "/qdIMHd4sEfJSckfVJfKQvisL02a.jpg",
    overview: "A man with a low IQ has accomplished great things in his life and been present during significant historical events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him.",
    vote_average: 8.5,
  },
];

export const documentaries: Movie[] = [
  {
    id: 926393,
    title: "David Attenborough: A Life on Our Planet",
    poster_path: "/7t45h5J7TfM9v6u8eO55y5.jpg",
    backdrop_path: "/53M97t44J8.jpg", // Placeholder/guess
    overview: "The celebrated naturalist reflects upon both the defining moments of his lifetime and the devastating changes he has seen.",
    vote_average: 8.5,
  }
];

// Fallback for when all else fails
export const mockMovies = trendingNow;
