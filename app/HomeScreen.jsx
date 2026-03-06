import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { fetchPopular, fetchNowPlaying, fetchTopRated, fetchUpcoming } from "../api/tmdb.js";
import MovieList from "../components/MovieList.jsx";
import BottomNavigationBar from "../components/BottomNavigationBar";
import { Ionicons } from "@expo/vector-icons";
import { tabs } from "../constraint.js";
import MovieTabs from "../components/MovieTabs.jsx";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [activeTab, setActiveTab] = useState("now_playing")

    const loadMovies = async (tab = activeTab, pageNum = 1) => {
        let res;

        switch (tab) {
            case "now_playing":
                res = await fetchNowPlaying(pageNum);
                break;
            case "top_rated":
                res = await fetchTopRated(pageNum);
                break;
            case "upcoming":
                res = await fetchUpcoming(pageNum);
                break;
            default:
                res = await fetchPopular(pageNum);
        }

        if (pageNum === 1) {
            setMovies(res.results);
        } else {
            setMovies(prev => {
                const merged = [...prev, ...res.results];
                const unique = Array.from(
                    new Map(merged.map(m => [m.id, m])).values()
                );
                return unique;
            });
        }

        setPage(pageNum);
    };

    useEffect(() => {
        loadMovies(activeTab, 1);
    }, [activeTab]);

    const loadMoviesMore = () => {
        loadMovies(activeTab, page + 1);
    };
    // console.log("data:", movies);

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

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.container}>
                <Text style={styles.title}>
                    What do you want to watch?
                </Text>

                <MovieTabs
                    tabs={tabs}
                    activeTab={activeTab}
                    onChange={setActiveTab}
                />

                <MovieList
                    movies={movies}
                    loadMore={loadMoviesMore}
                />
            </View>
            <BottomNavigationBar
                style={{
                    position: "absolute",
                    bottom: 15,
                    left: 0,
                    right: 0
                }}
                navigationItems={navigationItems}
                activeScreen="/HomeScreen"
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#ffffff",
    },

    container: {
        flex: 1,
    },

    title: {
        fontSize: 23,
        fontWeight: "700",
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10
    },
});