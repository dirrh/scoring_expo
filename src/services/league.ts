import leaguesData from '../data/leagues.json';
import { LeagueTableEntry } from '../types/league';

export const fetchLeagueStandings = async (leagueId: string): Promise<LeagueTableEntry[]> => {
  // Simulácia API
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  const league = leaguesData.leagues.find((l) => l.id === leagueId);
  
  if (!league) return [];

  // Pridáme fallback logá, keďže v JSONe v sekcii "table" chýbajú
  // (V reálnej appke by si to mal v DB, tu to hardcodneme pre demo)
  const dataWithLogos = (league.table || []).map((item: any) => ({
    ...item,
    logo: item.team === 'Arsenal' ? 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png' :
          item.team === 'Manchester City' ? 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png' :
          item.team === 'Liverpool' ? 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png' :
          'https://placehold.co/40x40/png' // Fallback
  }));

  return dataWithLogos as LeagueTableEntry[];
};