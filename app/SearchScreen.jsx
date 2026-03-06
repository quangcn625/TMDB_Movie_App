import { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import BottomNavigationBar from "../components/BottomNavigationBar";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { searchMovies } from "../api/tmdb";
import MovieList from "../components/MovieList";

export default function SearchScreen() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [showMovies, setShowMovies] = useState(false);

    // suggestions
    const fetchSuggestions = async () => {
        if (!search || search.length < 2) {
            setSuggestions([]);
            return;
        }

        try {
            const resMovies = await searchMovies(search);

            setSuggestions(resMovies?.results?.slice(0, 5) || []);
        } catch (error) {
            console.log("Search error: " + error);
        }
    }

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchSuggestions();
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [search]);

    // chon suggestions
    const selectSuggestion = async (title) => {
        setSearch(title);

        try {
            const resMovies = await searchMovies(title);
            setMovies(resMovies?.results || []);
            setShowMovies(true);
            setSuggestions([]);
        } catch (error) {
            console.log("Search error:", error);
        }
    }

    const loadMoreMovies = async () => {

        const nextPage = page + 1;

        const res = await searchMovies(search, nextPage);

        setMovies(prev => [...prev, ...res.results]);

        setPage(nextPage);

    };

    // Navbar
    const navigationItems = [
        {
            label: "Home",
            screen: "/HomeScreen",
            icon: (active) => (
                <Ionicons
                    name="home-outline"
                    size={24}
                    color={active ? "#22c55e" : "#9ca3af"}
                />
            ),
        },
        {
            label: "Search",
            screen: "/SearchScreen",
            icon: (active) => (
                <Ionicons
                    name="search-outline"
                    size={24}
                    color={active ? "#22c55e" : "#9ca3af"}
                />
            ),
        },
    ];

    // console.log("texxt: " + JSON.stringify(movies));

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title="Search" />

            <View style={{ flex: 1 }}>
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Search movie"
                        value={search}
                        autoFocus
                        onChangeText={(text) => {
                            setSearch(text);
                            setShowMovies(false);
                        }}
                        style={styles.searchInput}
                    />

                    {search.length > 0 && (
                        <TouchableOpacity
                            style={styles.clearButton}
                            onPress={() => {
                                setSearch("");
                                setSuggestions([]);
                                setShowMovies(false);
                            }}
                        >
                            <Text style={{ fontSize: 15 }}>✕</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {!showMovies && suggestions.length > 0 && (
                    <FlatList
                        data={suggestions}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={{
                                    padding: 15,
                                    borderBottomWidth: 1,
                                    borderColor: "#eee"
                                }}
                                onPress={() => selectSuggestion(item.title)}
                            >
                                <Text>{item.title}</Text>
                            </TouchableOpacity>
                        )}
                    />
                )}

                {showMovies && (
                    <MovieList
                        movies={movies}
                        loadMore={loadMoreMovies}
                    />
                )}
            </View>

            <BottomNavigationBar
                style={{
                    position: "absolute",
                    bottom: 15,
                    left: 0,
                    right: 0
                }}
                navigationItems={navigationItems}
                activeScreen="/SearchScreen"
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    searchContainer: {
        position: "relative",
        marginHorizontal: 10,
        marginVertical: 8
    },

    searchInput: {
        height: 40,
        paddingLeft: 10,
        paddingRight: 40,
        borderWidth: 1,
        borderRadius: 10
    },

    clearButton: {
        position: "absolute",
        right: 10,
        top: 8
    }

});