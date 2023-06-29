import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
import  CountryDetails  from './Screens/CountryDetails';
import Weather from './Screens/Weather';
export type RootStackParamList = {
  Home:any;
  CountryDetails: any;
  WeatherDetails: any;

};
export default function App() {
const Stack = createNativeStackNavigator();
 return (
 <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{title : 'Weather-App'}}/>
        <Stack.Screen name="CountryDetails" component={CountryDetails}  options={{title : 'country details'}}/>
        <Stack.Screen name="WeatherDetails" component={Weather}  options={{title : 'Weather details'}}/> 
      </Stack.Navigator>
    </NavigationContainer> 
  );
}

