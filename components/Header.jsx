import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Header({ title }) {
    const router = useRouter();

    return (
        <View style={styles.header}>
            <Pressable onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color="#fff" />
            </Pressable>

            <Text style={styles.title}>{title}</Text>

            <View style={{ width: 24 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 56,
        backgroundColor: "#1f2937",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
    },
    title: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
});