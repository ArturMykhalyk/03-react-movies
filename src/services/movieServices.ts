import axios from "axios";

import { Movie } from "../types/movie";

interface MoviesHttpResponse {
    results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
    const params = {
        query,
        language: "en-US",
        include_adult: false,
    };
     const headers = {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` as string,
      }
    const response = await axios.get<MoviesHttpResponse>(
        "https://api.themoviedb.org/3/search/movie",{params,headers}
    );
    return response.data.results;
}