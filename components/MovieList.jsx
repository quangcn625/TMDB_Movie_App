import React from "react";
import { View, Text, Image, FlatList, StyleSheet, Dimensions, Pressable } from "react-native";
import { useRouter } from "expo-router";

const IMG = "https://image.tmdb.org/t/p/w500";

const { width } = Dimensions.get("window");
const SPACING = 12;
const CARD_WIDTH = (width - SPACING * 3) / 2;

const MovieItem = ({ movie }) => {
    const router = useRouter();

    return (
        <Pressable
            style={styles.card}
            onPress={() =>
                router.push({
                    pathname: "/MovieDetail",
                    params: { id: movie.id },
                })
            }
        >
            <Image
                source={{ uri: IMG + movie.poster_path }}
                style={styles.poster}
                resizeMode="cover"
            />

            <Text style={styles.title} numberOfLines={1}>
                {movie.title}
            </Text>

            <View style={styles.ratingRow}>
                <Text>⭐</Text>
                <Text style={styles.rating}>
                    {movie.vote_average?.toFixed(1)}
                </Text>
            </View>
        </Pressable>
    );
};

const MovieList = ({ movies, loadMore }) => {
    return (
        <FlatList
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieItem movie={item} />}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
        />
    );
};

export default MovieList;

export const styles = StyleSheet.create({
    list: {
        paddingHorizontal: SPACING,
        paddingTop: SPACING,
        paddingBottom: 40,
    },

    row: {
        justifyContent: "space-between",
        marginBottom: SPACING,
    },

    card: {
        width: CARD_WIDTH,
    },

    poster: {
        width: "100%",
        height: CARD_WIDTH * 1.5,
        borderRadius: 16,
        backgroundColor: "#e1e1e1",
    },

    title: {
        fontSize: 15,
        fontWeight: "600",
        marginTop: 6,
    },

    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
    },

    rating: {
        fontSize: 13,
        color: "#666",
        marginLeft: 4,
    },
});