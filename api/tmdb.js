import axios from "axios";
import { TMDB_API_KEY, URL } from "../constraint"

export const fetchPopular = async (page) => {
    const res = await axios.get(
        `${URL}/movie/popular`,
        {
            params: {
                api_key: TMDB_API_KEY,
                page: page
            }
        }
    );
    return res.data;
};

export const fetchMovieDetail = async (id) => {
    const res = await axios.get(
        `${URL}/movie/${id}?api_key=${TMDB_API_KEY}`
    )
    return res.data;
}
