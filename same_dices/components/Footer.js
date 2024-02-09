import { Text, View } from "react-native";
import styles from '../styles/style'

export const Footer = () => {
    return(
        <View style={styles.footer}>
            <Text style={styles.title}>
                Author: Joel Oksanen
            </Text>
        </View>
    )
}