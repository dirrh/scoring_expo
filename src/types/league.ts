// Pomocné typy pre formu a ďalší zápas (použité v tabuľke)
export interface FormMatch {
  result: 'W' | 'D' | 'L';
  score: string;
  opponent: string;
  date: string;
}

export interface NextMatch {
  opponent: string;
  logo?: string;
  date: string;
  time: string;
}

// Položka v tabuľke (League Table)
export interface LeagueTableEntry {
  position: number;
  team: string;
  teamId?: string;   // Voliteľné
  teamLogo?: string; // Voliteľné - toto je asi to čo ste mysleli ako logo teamu v inych castiach
  logo?: string;     // PRIDANÉ: Voliteľné logo, aby sme vyhoveli vášmu kódu v MatchTableTab
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  isFavorite?: boolean;
  
  // UI špecifické
  form?: FormMatch[]; 
  nextMatch?: NextMatch;
}

// Zápas v zozname (Fixtures/Results)
export interface LeagueMatch {
  id: string;
  date: string;
  time: string;
  homeTeam: string; 
  awayTeam: string;
  status: 'upcoming' | 'live' | 'finished';
  score?: string;
}

// Knockout pavúk (Playoffs)
export interface LeagueKnockoutMatch {
  id: string;
  team1: string;
  team2: string;
  date: string;
  time: string;
  status: 'upcoming' | 'live' | 'finished';
  score?: string;
}

export interface LeagueKnockoutRound {
  round: string;
  matches: LeagueKnockoutMatch[];
}

export interface LeagueKnockout {
  type: string;
  rounds: LeagueKnockoutRound[];
}

// Štatistiky ligy
export interface LeagueStats {
  season: string;
  totalGoals: number;
  avgGoalsPerGame: number;
  totalMatches: number;
  completedMatches: number;
  upcomingMatches: number;
  topScorer: {
    name: string;
    team: string;
    goals: number;
  };
  mostAssists: {
    name: string;
    team: string;
    assists: number;
  };
}

// Prestupy
export interface LeagueTransfer {
  id: string;
  date: string;
  player: string;
  from: string;
  to: string;
  fee: string;
}

// Historické sezóny
export interface LeagueSeason {
  season: string;
  champion: string;
  runnerUp: string;
  topScorer: string;
  points: number;
}

// Novinky ligy
export interface LeagueNews {
  id: string;
  title: string;
  date: string;
  category: string;
}

// Chat ligy
export interface LeagueChat {
  groupId: string;
  memberCount: number;
  isLive: boolean;
}

// HLAVNÝ INTERFACE PRE LIGU
export interface LeagueDetail {
  id: string;
  name: string;
  sportId: string;
  logo: string;
  country: string;
  founded: number;
  teams: number;
  currentSeason: string;
  website: string;
  isFavorite: boolean;
  
  // Polia s dátami
  table: LeagueTableEntry[];
  knockout?: LeagueKnockout;
  matches: LeagueMatch[];
  stats: LeagueStats;
  transfers: LeagueTransfer[];
  seasons: LeagueSeason[];
  news: LeagueNews[];
  chat: LeagueChat;
}