import axios from "axios";

import { Movie } from "../types/movie";

interface MoviesHttpResponse {
    hits: Movie[];
}