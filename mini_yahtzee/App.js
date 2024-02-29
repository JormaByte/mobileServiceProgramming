
import styles from './styles/Style'
import { Header } from './components/Header';
import Gameboard  from './components/Gameboard';
import { Footer} from './components/Footer'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

export default function App() {
  
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Gameboard' component={Gameboard} />
     
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}
