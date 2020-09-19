import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

function SuccessSendImage({ navigation }) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={() => navigation.navigate('Main')}>
        <AntDesign name="checksquare" size={84} color="black" />
      </TouchableOpacity>
    </View>
  );
}

export default SuccessSendImage;