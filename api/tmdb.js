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

export const fetchNowPlaying = async (page) => {
    const res = await axios.get(
        `${URL}/movie/now_playing`,
        {
            params: {
                api_key: TMDB_API_KEY,
                page: page
            }
        }
    );
    return res.data;
}

export const fetchTopRated = async (page) => {
    const res = await axios.get(
        `${URL}/movie/top_rated`,
        {
            params: {
                api_key: TMDB_API_KEY,
                page: page
            }
        }
    );
    return res.data;
}

export const fetchUpcoming = async (page) => {
    const res = await axios.get(
        `${URL}/movie/upcoming`,
        {
            params: {
                api_key: TMDB_API_KEY,
                page: page
            }
        }
    );
    return res.data;
}

export const fetchMovieDetail = async (id) => {
    const res = await axios.get(
        `${URL}/movie/${id}?api_key=${TMDB_API_KEY}`
    )
    return res.data;
}

export const fetchMovieVideos = async (id) => {
    const res = await axios.get(
        `${URL}/movie/${id}/videos?api_key=${TMDB_API_KEY}`
    )
    return res.data;
}

export const fetchCastMovie = async (id) => {
    const res = await axios.get(
        `${URL}/movie/${id}/credits?api_key=${TMDB_API_KEY}`
    )
    return res.data;
}

export const fetchReviewsMovie = async (id) => {
    const res = await axios.get(
        `${URL}/movie/${id}/reviews?api_key=${TMDB_API_KEY}`
    )
    return res.data;
}

export const searchMovies = async (movie, page = 1) => {
    const res = await axios.get(
        `${URL}/search/movie`,
        {
            params: {
                api_key: TMDB_API_KEY,
                query: movie,
                page: page
            }
        }
    )
    return res.data;
}