
import { Text, View } from 'react-native';
import styles from './styles/style'
import { addDoc, collection, deleteDoc,
doc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, TODOS_REF } from './firebase/Config'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}


