import { supabase } from "./supabaseClient";

export type FixtureMatch = {
  id: number;
  date: string | null;
  status_short: string | null;
  status_long: string | null;
  goals_home: number | null;
  goals_away: number | null;
  league: { id: number; name: string | null } | null;
  home_team: { id: number; name: string | null } | null;
  away_team: { id: number; name: string | null } | null;
};

export async function fetchFixturesWithTeams(date?: Date) {
  const baseQuery = supabase
    .from("fixtures")
    .select(
      `
      id,
      date,
      status_short,
      status_long,
      goals_home,
      goals_away,
      league:leagues!fixtures_league_id_fkey(id, name),
      home_team:teams!fixtures_home_team_id_fkey(id, name),
      away_team:teams!fixtures_away_team_id_fkey(id, name)
    `
    )
    .order("date", { ascending: true })
    .limit(50);

  const query = date
    ? baseQuery
        .gte("date", startOfDay(date).toISOString())
        .lt("date", startOfNextDay(date).toISOString())
    : baseQuery;

  const { data, error } = await query;

  if (error) {
    // Surface detailed Supabase errors in the UI and logs.
    console.warn("Supabase fixtures query failed", error);
    throw error;
  }

  return (data ?? []) as FixtureMatch[];
}

function startOfDay(date: Date) {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

function startOfNextDay(date: Date) {
  const value = startOfDay(date);
  value.setDate(value.getDate() + 1);
  return value;
}
