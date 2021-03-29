export interface Movies {
  id: number;
  title: string;
  year: string;
  runtime: string;
  genres?: (string)[] | null;
  director: string;
  actors: string;
  plot: string;
  posterUrl: string;
}
