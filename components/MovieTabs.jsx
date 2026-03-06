import React from "react";
import { ScrollView, Text, TouchableOpacity, StyleSheet, View } from "react-native";

export default function MovieTabs({ tabs, activeTab, onChange }) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            {tabs.map((tab) => {
                const active = tab.key === activeTab;

                return (
                    <TouchableOpacity
                        key={tab.key}
                        style={styles.tab}
                        onPress={() => onChange(tab.key)}
                    >
                        <Text style={[styles.text, active && styles.activeText]}>
                            {tab.label}
                        </Text>

                        {active && <View style={styles.indicator} />}
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1f2937",
    },
    content: {
        paddingHorizontal: 12,
    },
    tab: {
        marginRight: 20,
        paddingVertical: 14,
    },
    text: {
        color: "#9ca3af",
        fontSize: 14,
        fontWeight: "500",
    },
    activeText: {
        color: "#ffffff",
    },
    indicator: {
        marginTop: 6,
        height: 2,
        backgroundColor: "#22c55e",
        borderRadius: 2,
    },
});