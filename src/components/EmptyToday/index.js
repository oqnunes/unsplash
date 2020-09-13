import React from 'react';
import { View, Text } from 'react-native';

export default EmptyToday = () => {
  return(
    <View style={{
      width: '100%',
      paddingRight: 30,
    }}>
      <Text style={{
        fontSize: 18,

      }}>
          
        Nenhuma PO enviada hoje...
      </Text>
    </View>
  );
};