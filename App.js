import Home from './screens/Home';
import Login from './screens/Login';
import Form from './screens/Form';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{ title: 'Inicio' }} />
        <Stack.Screen name='Login' component={Login} options={{ title: 'logueate 👻' }} />
        <Stack.Screen name='Form' component={Form} options={{ title: 'Formik & Yup' }} />


      </Stack.Navigator>
    </NavigationContainer>

  );
}

