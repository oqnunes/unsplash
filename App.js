import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Routes from './src/routes';

const fetchFonts = () => {
  return Font.loadAsync({
    'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'nunito-semi-bold': require('./assets/fonts/Nunito-SemiBold.ttf'),
    'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
    'nunito-extra-bold': require('./assets/fonts/Nunito-ExtraBold.ttf'),
    'nunito-black': require('./assets/fonts/Nunito-Black.ttf')
  });
};

export default function App() {
  const [dataLoad, setDataLoad] = useState(false);

  if(!dataLoad){
    return(
      <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoad(true)} />
    )
  }
  return (
    <Routes />
  );
}