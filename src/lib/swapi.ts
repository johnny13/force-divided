import { useQuery } from "@tanstack/react-query";

const SWAPI_BASE_URL = "https://swapi.info/api";

// Normalize URLs from old API domain to new one
function normalizeUrl(url: string): string {
  return url.replace(/https?:\/\/swapi\.dev\/api\//g, `${SWAPI_BASE_URL}/`);
}

// Types for SWAPI responses
export interface Film {
  title: string;
  episode_id: number;
  director: string;
  producer: string;
  release_date: string;
  opening_crawl: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface SWAPIResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Fetch a single resource by URL
async function fetchResource<T>(url: string): Promise<T> {
  const normalizedUrl = normalizeUrl(url);
  const response = await fetch(normalizedUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }
  return response.json();
}

// Fetch all pages of a resource
async function fetchAllPages<T>(url: string): Promise<T[]> {
  const allResults: T[] = [];
  let nextUrl: string | null = normalizeUrl(url);

  while (nextUrl) {
    const response = await fetch(nextUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${nextUrl}: ${response.statusText}`);
    }
    const data = await response.json();

    // Handle both formats: array directly or object with results property
    if (Array.isArray(data)) {
      allResults.push(...data);
      nextUrl = null; // If it's an array, assume no pagination
    } else if (data.results && Array.isArray(data.results)) {
      allResults.push(...data.results);
      nextUrl = data.next ? normalizeUrl(data.next) : null;
    } else if (data && typeof data === "object") {
      // Single object response - wrap in array
      allResults.push(data as T);
      nextUrl = null;
    } else {
      console.warn("Unexpected API response format:", data);
      throw new Error(`Unexpected API response format for ${nextUrl}`);
    }
  }

  return allResults;
}

// Hook to fetch films for Episodes 4, 5, and 6 (Original Trilogy)
// Note: SWAPI only has episodes 1-6, not 7-9
export function useSequelTrilogyFilms() {
  return useQuery({
    queryKey: ["films", "original-trilogy"],
    queryFn: async () => {
      // Fetch all films (remove trailing slash per API docs)
      const allFilms = await fetchAllPages<Film>(`${SWAPI_BASE_URL}/films`);

      // Filter for episodes 4, 5, and 6 (Original Trilogy)
      const trilogyFilms = allFilms.filter((film) => {
        // Handle both string and number episode_id
        const episodeId =
          typeof film.episode_id === "string"
            ? parseInt(film.episode_id, 10)
            : film.episode_id;
        return episodeId >= 4 && episodeId <= 6;
      });

      // Sort by episode number
      return trilogyFilms.sort((a, b) => {
        const aId =
          typeof a.episode_id === "string"
            ? parseInt(a.episode_id, 10)
            : a.episode_id;
        const bId =
          typeof b.episode_id === "string"
            ? parseInt(b.episode_id, 10)
            : b.episode_id;
        return aId - bId;
      });
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });
}

// Hook to fetch characters from sequel trilogy films
export function useSequelTrilogyCharacters() {
  return useQuery({
    queryKey: ["characters", "sequel-trilogy"],
    queryFn: async () => {
      // First get the films
      const allFilms = await fetchAllPages<Film>(`${SWAPI_BASE_URL}/films`);

      const trilogyFilms = allFilms.filter((film) => {
        // Handle both string and number episode_id
        // Note: SWAPI only has episodes 1-6, so we use original trilogy (4, 5, 6)
        const episodeId =
          typeof film.episode_id === "string"
            ? parseInt(film.episode_id, 10)
            : film.episode_id;
        return episodeId >= 4 && episodeId <= 6;
      });

      if (trilogyFilms.length === 0) {
        throw new Error(
          `No trilogy films found. Available episodes: ${allFilms
            .map((f) => f.episode_id)
            .join(", ")}`
        );
      }

      // Collect all unique character URLs
      const characterUrls = new Set<string>();
      trilogyFilms.forEach((film) => {
        if (film.characters && Array.isArray(film.characters)) {
          film.characters.forEach((url) => characterUrls.add(url));
        }
      });

      if (characterUrls.size === 0) {
        throw new Error("No characters found in sequel trilogy films");
      }

      // Fetch all characters
      const characters = await Promise.all(
        Array.from(characterUrls).map((url) => fetchResource<Character>(url))
      );

      return characters;
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });
}

// Hook to fetch starships from sequel trilogy films
export function useSequelTrilogyStarships() {
  return useQuery({
    queryKey: ["starships", "sequel-trilogy"],
    queryFn: async () => {
      // First get the films
      const allFilms = await fetchAllPages<Film>(`${SWAPI_BASE_URL}/films`);
      const trilogyFilms = allFilms.filter((film) => {
        // Handle both string and number episode_id
        // Note: SWAPI only has episodes 1-6, so we use original trilogy (4, 5, 6)
        const episodeId =
          typeof film.episode_id === "string"
            ? parseInt(film.episode_id, 10)
            : film.episode_id;
        return episodeId >= 4 && episodeId <= 6;
      });

      if (trilogyFilms.length === 0) {
        throw new Error(
          `No trilogy films found. Available episodes: ${allFilms
            .map((f) => f.episode_id)
            .join(", ")}`
        );
      }

      // Collect all unique starship URLs
      const starshipUrls = new Set<string>();
      trilogyFilms.forEach((film) => {
        if (film.starships && Array.isArray(film.starships)) {
          film.starships.forEach((url) => starshipUrls.add(url));
        }
      });

      if (starshipUrls.size === 0) {
        throw new Error("No starships found in sequel trilogy films");
      }

      // Fetch all starships
      const starships = await Promise.all(
        Array.from(starshipUrls).map((url) => fetchResource<Starship>(url))
      );

      return starships;
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });
}
