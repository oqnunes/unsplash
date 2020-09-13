import React, { useState, useEffect } from 'react';
import { StatusBar, View } from 'react-native';

import Constants from 'expo-constants';

export default function CustomStatusBar({ backgroundColor, barStyle }){

  const [customHeight, setCustormHeight] = useState(0);

  useEffect(() => {
    setCustormHeight(Constants.statusBarHeight);
    StatusBar.setHidden(false);
  }, []);

  return(
    <View style={{ height: customHeight, width: '100%', backgroundColor }}>
      <StatusBar translucent={true} backgroundColor={backgroundColor} barStyle={barStyle} />
    </View>
  );

}