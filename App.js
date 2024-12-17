/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/views/Login';
import Home from './src/views/Home';
import PostDetail from './src/views/PostDetail';
import PostCreate from './src/views/PostCreate';



function App() {
  const scheme = useColorScheme();
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>

      <StatusBar animated={true}  />

      <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={Login} />
        <Stack.Screen name="HomeScreen" component={Home} />
        <Stack.Screen name="PostDetailScreen" component={PostDetail} />
        <Stack.Screen name="PostCreateScreen" component={PostCreate} />
      </Stack.Navigator>

    </NavigationContainer>
  );
};
export default App;
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

