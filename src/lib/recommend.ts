import { MoodKey, MOOD_CONFIG, FALLBACK_SHOWS } from "@/config/moods";
import { fetchHindiShowsByGenre, fetchShowNetworks, TMDBShow } from "./tmdb";

export interface Recommendation extends TMDBShow {
  networks: string[];
}

export async function getRecommendation(
  mood: MoodKey,
  exclude: number[] = []
): Promise<Recommendation[]> {
  const genreIds = MOOD_CONFIG[mood].genres;

  // Try TMDB first
  const tmdbShows = await fetchHindiShowsByGenre(genreIds);

  if (tmdbShows && tmdbShows.length > 0) {
    // Filter out already seen
    const fresh = tmdbShows.filter((s) => !exclude.includes(s.id));
    const pool = fresh.length > 0 ? fresh : tmdbShows;

    // Enrich top 5 with network info in parallel
    const top = pool.slice(0, 10);
    const enriched = await Promise.all(
      top.map(async (show) => ({
        ...show,
        networks: await fetchShowNetworks(show.id),
      }))
    );
    return enriched;
  }

  // Fallback to curated list
  const fallback = FALLBACK_SHOWS.filter((s) =>
    s.genre_ids.some((g) => genreIds.includes(g))
  );
  const pool = fallback.length > 0 ? fallback : FALLBACK_SHOWS;
  return pool as Recommendation[];
}

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
