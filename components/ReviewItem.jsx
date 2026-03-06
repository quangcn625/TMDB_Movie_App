import { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ReviewItem({ review }) {
    const [expanded, setExpanded] = useState(false);

    const avatar = review.author_details?.avatar_path
        ? review.author_details.avatar_path.startsWith("/http")
            ? review.author_details.avatar_path.substring(1)
            : `https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`
        : null;

    return (
        <View style={styles.reviewCard}>

            {/* HEADER */}
            <View style={styles.reviewHeader}>

                <View style={styles.reviewUser}>
                    {avatar ? (
                        <Image
                            source={{ uri: avatar }}
                            style={styles.reviewAvatar}
                        />
                    ) : (
                        <View style={styles.reviewAvatarPlaceholder}>
                            <Text style={styles.avatarLetter}>
                                {review.author[0]}
                            </Text>
                        </View>
                    )}

                    <Text style={styles.reviewAuthor}>
                        {review.author}
                    </Text>
                </View>

                {review.author_details?.rating && (
                    <View style={styles.reviewRating}>
                        <Ionicons name="star" size={14} color={"#FFD700"}/>
                        <Text style={styles.reviewRatingText}>
                            {review.author_details.rating}
                        </Text>
                    </View>
                )}
            </View>

            {/* CONTENT */}
            <Text
                style={styles.reviewContent}
                numberOfLines={expanded ? undefined : 4}
            >
                {review.content}
            </Text>

            {/* READ MORE */}
            {review.content.length > 200 && (
                <Text
                    style={styles.readMore}
                    onPress={() => setExpanded(!expanded)}
                >
                    {expanded ? "Show Less" : "Read More"}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    reviewCard: {
        backgroundColor: "#f9fafb",
        padding: 16,
        borderRadius: 18,
        marginHorizontal: 16,
        marginBottom: 16,
    },

    reviewHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },

    reviewUser: {
        flexDirection: "row",
        alignItems: "center",
    },

    reviewAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },

    reviewAvatarPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#01b4e4",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },

    avatarLetter: {
        color: "#fff",
        fontWeight: "700",
    },

    reviewAuthor: {
        fontSize: 14,
        fontWeight: "700",
    },

    reviewRating: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        backgroundColor: "#01b4e4",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 12,
    },

    reviewRatingText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },

    reviewContent: {
        fontSize: 14,
        color: "#444",
        lineHeight: 22,
    },

    readMore: {
        marginTop: 6,
        color: "#01b4e4",
        fontWeight: "600",
        fontSize: 13,
    },

});