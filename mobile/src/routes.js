import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Detail from './pages/Detail';
import Incidents from './pages/Incidents';

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        
        <Stack.Screen name="Incidents" component={Incidents} />       
        <Stack.Screen name="Detail" component={Detail} options={{ title: 'Be The Hero' }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;