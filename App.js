import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import SwipeCards from "./components/SwipeCard";
import Bio from "./components/Bio";



const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen
                  name = "Dating"
                  component = {SwipeCards}
              />
              <Stack.Screen
                  name = "Bio"
                  component = {Bio}
              />
          </Stack.Navigator>
      </NavigationContainer>
  );
}


