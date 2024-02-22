import { Text, View } from 'react-native';
import styles from './styles/Style'
import { Header } from './components/Header';
import Gameboard  from './components/Gameboard';
import { Footer} from './components/Footer'


export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <Gameboard />
      <Footer />
    </View>
  );
}
