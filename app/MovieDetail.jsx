import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { fetchMovieDetail } from "../api/tmdb";

const IMG = "https://image.tmdb.org/t/p/w500";

export default function MovieDetail() {
    const { id } = useLocalSearchParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const load = async () => {
            const res = await fetchMovieDetail(id);
            setMovie(res);
        };
        load();
    }, [id]);

    if (!movie) return null;
    // console.log("Movie: " + JSON.stringify(movie));

    const movieUI = {
        title: movie.title,
        tagline: movie.tagline,
        poster: IMG + movie.poster_path,
        backdrop: IMG + movie.backdrop_path,
        rating: movie.vote_average,
        votes: movie.vote_count,
        genres: movie.genres.map(g => g.name),
        year: movie.release_date,
        runtime: movie.runtime,
        overview: movie.overview,
    };

    return (
        <ScrollView style={styles.container}>
            {/* BACKDROP */}
            <Image source={{ uri: movieUI.backdrop }} style={styles.backdrop} />

            {/* POSTER */}
            <View style={styles.posterWrap}>
                <Image source={{ uri: movieUI.poster }} style={styles.poster} />
            </View>

            {/* CONTENT */}
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>{movieUI.title}</Text>

                <View style={styles.metaRow}>
                    <Text style={styles.metaText}>{movieUI.year}</Text>

                    <View style={styles.dot} />

                    <Text style={styles.metaText}>
                        {movieUI.runtime} min
                    </Text>

                    {movie.status && (
                        <>
                            <View style={styles.dot} />
                            <Text style={styles.metaText}>
                                {movie.status}
                            </Text>
                        </>
                    )}
                </View>

                <View style={styles.ratingBadge}>
                    <Text style={styles.ratingText}>
                        ⭐ {movieUI.rating?.toFixed(1)}
                    </Text>
                </View>

                <Text style={styles.votes}>
                    {movieUI.votes} votes
                </Text>
            </View>

            {/* GENRES (Thể loại) */}
            <View style={styles.genreRow}>
                {movieUI.genres.map(g => (
                    <View key={g} style={styles.genreChip}>
                        <Text style={styles.genreText}>{g}</Text>
                    </View>
                ))}
            </View>

            {/* TAGLINE */}
            {!!movieUI.tagline && (
                <Text style={styles.tagline}>{movieUI.tagline}</Text>
            )}

            {/* OVERVIEW */}
            <Text style={styles.section}>Overview</Text>
            <Text style={styles.overview}>{movieUI.overview}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },

    backdrop: {
        width: "100%",
        height: 230,
    },

    posterWrap: {
        alignItems: "center",
        marginTop: -90,
    },

    poster: {
        width: 140,
        height: 210,
        borderRadius: 14,
        backgroundColor: "#ddd",
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        textAlign: "center",
        lineHeight: 28, // giúp title nhiều dòng đẹp
    },

    metaRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 6,
        marginBottom: 6
    },

    metaText: {
        fontSize: 13,
        color: "#6b7280", // TMDB gray
        fontWeight: "500",
    },

    dot: {
        width: 3,
        height: 3,
        borderRadius: 2,
        backgroundColor: "#9ca3af",
        marginHorizontal: 8,
    },

    content: {
        paddingTop: 12, // khoảng cách cố định với poster
        paddingHorizontal: 20,
    },

    ratingBadge: {
        backgroundColor: "#01b4e4",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },

    ratingText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 13,
    },

    votes: {
        marginLeft: 8,
        color: "#666",
        fontSize: 13,
    },

    genreRow: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: 10,
        paddingHorizontal: 20,
    },

    genreChip: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 4,
        margin: 4,
    },

    genreText: {
        fontSize: 12,
        color: "#444",
    },

    tagline: {
        textAlign: "center",
        fontStyle: "italic",
        color: "#666",
        marginTop: 10,
        paddingHorizontal: 30,
    },

    section: {
        fontSize: 18,
        fontWeight: "700",
        marginTop: 18,
        marginHorizontal: 16,
    },

    overview: {
        fontSize: 15,
        lineHeight: 22,
        color: "#333",
        margin: 16,
    },
});