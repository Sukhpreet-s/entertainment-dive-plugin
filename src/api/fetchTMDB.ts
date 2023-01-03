export const baseUrl: string = 'https://api.themoviedb.org/3';
export const apiKey: string = '3524246943b93c4d60339d04925f1ea5';

export async function fetchMoviesBySearchText(searchText: string) {
  const endpoint = `${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${searchText}&include_adult=false`;
  const data = await fetch(endpoint);
  return await data.json();
}

export function getSearchMediaURL(searchText: string): string {
  const endpoint = `${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${searchText}&include_adult=false`;
  return endpoint
}