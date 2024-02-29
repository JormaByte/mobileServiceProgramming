import React from "react";
import { Text, View } from "react-native";
import styles from '../styles/Style'

export function Scoreboard() {
    return(
        <View style={styles.header}>
            <Text style={styles.title}>
                scoreboard is heere
            </Text>
        </View>
    )
}