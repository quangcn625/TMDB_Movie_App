import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { fetchPopular } from "../api/tmdb.js";
import MovieList from "../components/MovieList.jsx";

export default function HomeScreen() {
    const [page, setPage] = useState(1);
    const [moviePopular, setMoviePopular] = useState([]);

    const loadMovies = async () => {
        const res = await fetchPopular(1);
        setMoviePopular(res.results);
    }

    const loadMoviesMore = async () => {
        const nextPage = page + 1;
        const res = await fetchPopular(nextPage);

        setMoviePopular(prev => {
            const newMovies = res.results;
            const mergerd = [...prev, ...newMovies];
            const uniqueMovies = Array.from(
                new Map(mergerd.map(item => [item.id, item])).values()
            );
            return uniqueMovies;
        });

        setPage(nextPage);
    }

    useEffect(() => {
        loadMovies();
    }, []);

    // console.log("data:", moviePopular);

    return (
        <View style={{ flex: 1 }}>
            <MovieList movies={moviePopular} loadMore={loadMoviesMore} />
        </View>
    );
}