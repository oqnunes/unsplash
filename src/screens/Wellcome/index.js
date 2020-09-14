import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomStatusBar from './../../components/StatusBarr';

import styles from './styles';

export default function Wellcome() {
  const navigation = useNavigation();

  useEffect(() => {
    (async function(){
      await AsyncStorage.getItem('dataLogin')
        .then((response) => {
          if(response != null){
            navigation.navigate('Main');
          }
        });
    })();
  }, []);

  function onNavigation() {
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <CustomStatusBar barStyle="dark-content" backgroundColor="transparent" />
      <View style={styles.boxTitle}>
        <Text style={styles.textBoxTitle}>
          Unsplash
        </Text>
      </View>
      <View style={styles.boxSubTitle}>
        <Text style={styles.textSubBoxTitle}>
          SC Production Photos
        </Text>
      </View>
      <View style={styles.lineSlim}></View>
      <TouchableOpacity style={styles.buttonLogin} onPress={onNavigation}>
        <Text style={styles.textButtonLogin}>
          Entrar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
