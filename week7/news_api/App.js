import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import News from './screens/News';

export default function App() {

  const Stack = createNativeStackNavigator()

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName='News'>
        <Stack.Screen
        name='News'
        component={News}
        options={{
          title: 'News',
          headerTitle: 'News'
        }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}


