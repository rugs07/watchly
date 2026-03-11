const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY!;
const BASE = "https://api.themoviedb.org/3";
export const IMG_BASE = "https://image.tmdb.org/t/p/w300";

export interface TMDBShow {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  genre_ids: number[];
  poster_path: string | null;
  popularity: number;
  networks?: string[];
}

// Fetch a single page of Hindi shows with a minimum rating filter
async function fetchPage(
  genreIds: number[],
  page: number,
  minRating: number
): Promise<TMDBShow[]> {
  // Use OR logic (pipe) so shows matching ANY of the genres are included
  const genre = genreIds.join("|");
  const url =
    `${BASE}/discover/tv` +
    `?api_key=${API_KEY}` +
    `&with_original_language=hi` +
    `&with_genres=${genre}` +
    `&vote_average.gte=${minRating}` +
    `&vote_count.gte=20` +
    `&sort_by=popularity.desc` +
    `&page=${page}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.results as TMDBShow[]) ?? [];
}

// Fetch up to 5 pages (100 shows) for a rich pool
export async function fetchHindiShowsByGenre(
  genreIds: number[],
  minRating = 7
): Promise<TMDBShow[] | null> {
  try {
    // Fetch pages 1-5 in parallel for a large pool
    const pages = await Promise.all(
      [1, 2, 3, 4, 5].map((p) => fetchPage(genreIds, p, minRating))
    );

    const combined = pages.flat();
    if (combined.length === 0) return null;

    // Deduplicate by id
    const seen = new Set<number>();
    const unique = combined.filter((s) => {
      if (seen.has(s.id)) return false;
      seen.add(s.id);
      return true;
    });

    return unique;
  } catch {
    return null;
  }
}

export async function fetchShowNetworks(showId: number): Promise<string[]> {
  try {
    const res = await fetch(`${BASE}/tv/${showId}?api_key=${API_KEY}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.networks as { name: string }[])?.map((n) => n.name) ?? [];
  } catch {
    return [];
  }
}
