import { Text, View } from "react-native";
import styles from '../styles/style'

export const Header = () => {
    return(
        <View style={styles.header}>
            <Text style={styles.title}>
                Same Dices Game by Jorma
            </Text>
        </View>
    )
}