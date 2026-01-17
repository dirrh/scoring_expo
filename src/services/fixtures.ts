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

export type FixtureDetail = {
  id: number;
  date: string | null;
  status_short: string | null;
  status_long: string | null;
  goals_home: number | null;
  goals_away: number | null;
  league: { id: number; name: string | null } | null;
  home_team: { id: number; name: string | null; logo?: string | null } | null;
  away_team: { id: number; name: string | null; logo?: string | null } | null;
};

export type FixtureEvent = {
  id: number;
  time_elapsed: number | null;
  time_extra: number | null;
  period: string | null;
  type: string | null;
  detail: string | null;
  team_id: number | null;
  player_name: string | null;
  assist_name?: string | null;
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

export async function fetchFixtureById(fixtureId: number) {
  const { data, error } = await supabase
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
      home_team:teams!fixtures_home_team_id_fkey(id, name, logo),
      away_team:teams!fixtures_away_team_id_fkey(id, name, logo)
    `
    )
    .eq("id", fixtureId)
    .single();

  if (error) {
    console.warn("Supabase fixture detail query failed", error);
    throw error;
  }

  return data as FixtureDetail;
}

export async function fetchFixtureEvents(fixtureId: number) {
  const { data, error } = await supabase
    .from("fixture_events")
    .select(
      `
      id,
      time_elapsed,
      time_extra,
      period,
      type,
      detail,
      team_id,
      player_name,
      assist_name
    `
    )
    .eq("fixture_id", fixtureId)
    .order("time_elapsed", { ascending: true })
    .order("time_extra", { ascending: true });

  if (error) {
    console.warn("Supabase fixture events query failed", error);
    throw error;
  }

  if (!data || data.length === 0) {
    const fallback = await supabase
      .from("fixture_events")
      .select(
        `
        id,
        time_elapsed,
        time_extra,
        period,
        type,
        detail,
        team_id,
        player_name,
        assist_name
      `
      )
      .eq("fixture_id", String(fixtureId))
      .order("time_elapsed", { ascending: true })
      .order("time_extra", { ascending: true });
    if (!fallback.error && Array.isArray(fallback.data)) {
      try {
        console.debug("Supabase fixture events fallback result", {
          fixtureId,
          count: fallback.data.length,
        });
      } catch {}
      return fallback.data as FixtureEvent[];
    }
  }

  try {
    console.debug("Supabase fixture events result", {
      fixtureId,
      count: Array.isArray(data) ? data.length : 0,
    });
  } catch {}

  return (data ?? []) as FixtureEvent[];
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
