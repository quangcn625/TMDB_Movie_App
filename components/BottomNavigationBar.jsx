import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function BottomNavigationBar({
    navigationItems,
    activeScreen,
    style
}) {
    const router = useRouter();

    return (
        <View style={[styles.container, style]}>
            {navigationItems.map((item, index) => {
                const isActive = activeScreen === item.screen;

                return (
                    <TouchableOpacity
                        key={index}
                        style={styles.navItem}
                        onPress={() => router.push(item.screen)}
                    >
                        {item.icon(isActive)}
                        <Text
                            style={[
                                styles.navText,
                                isActive && styles.activeNavText,
                            ]}
                        >
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10,
        backgroundColor: "#1f2937",
        borderTopWidth: 0,
    },
    navItem: {
        alignItems: "center",
    },
    navText: {
        fontSize: 12,
        color: "#9ca3af",
        marginTop: 4,
    },
    activeNavText: {
        color: "#22c55e",
        fontWeight: "600",
    },
});