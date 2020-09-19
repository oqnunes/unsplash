import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Wellcome from './screens/Wellcome';
import Login from './screens/Login';
import Main from './screens/Main';
import VerifyPO from './screens/VerifyPO';
import CameraScreen from './screens/CameraScreen';
import SuccessSendImage from './screens/SuccessSendImage';

const AppStack = createStackNavigator();

export default function Routes(){
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <AppStack.Navigator 
          screenOptions={{ headerShown: false }}
          initialRouteName={"Wellcome"}
        >
          <AppStack.Screen
            name="Wellcome"
            component={Wellcome}
            options={{gestureEnabled: false }}
          />
          <AppStack.Screen
            name="Login"
            component={Login}
            options={{gestureEnabled: true }}
          />
          <AppStack.Screen
            name="Main"
            component={Main}
            options={{gestureEnabled: false }}
          />
          <AppStack.Screen
            name="VerifyPO"
            component={VerifyPO}
            options={{gestureEnabled: true }}
          />
          <AppStack.Screen
            name="CameraScreen"
            component={CameraScreen}
            options={{gestureEnabled: false }}
          />
          <AppStack.Screen
            name="SuccessSendImage"
            component={SuccessSendImage}
            options={{gestureEnabled: false }}
          />
          
        </AppStack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};