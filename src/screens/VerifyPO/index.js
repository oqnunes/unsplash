import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';

import CustomStatusBar from './../../components/StatusBarr';

import styles from './styles';

export default function VerifyPO({ navigation }){ 
  // const navigation = useNavigation();

  navigation.addListener('focus', () => {
    StatusBar.setHidden(false);
  });

  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [displayContainerNotify, setDisplayContainerNotity] = useState('none');
  const [scannedPO, setScannedPO] = useState(null);
  const [barStyleSeted, setStyleBar] = useState('dark-content');

  const topBoxNotification = useRef(new Animated.Value(1000)).current;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

  }, []);

  const handleBarCodeScanned = async ({type, data}) => {

    setScanned(true);
    setDisplayContainerNotity('flex');

    const myData = data.startsWith("W-");

    if(myData){

      setScannedPO(data.replace('W-', ""));
      Animated.timing(topBoxNotification, {
        toValue: 180,
        duration: 500,
        useNativeDriver: false
      }).start();

    }else{

      console.log('valor incorreto.');
      
    }

  };

  const handleKeepWithPO = () => {
    console.log(scannedPO);
    navigation.navigate('CameraScreen', {
      po_number: scannedPO
    })
  }

  const handleCancelScan = () => {
    setScanned(false);
    setScannedPO(null);
    Animated.timing(topBoxNotification, {
      toValue: 1000,
      duration: 500,
      useNativeDriver: false
    }).start();
    setTimeout(() => {
      setDisplayContainerNotity('none');
    }, 500)
  }

  return(
    <View style={styles.container}>
      <CustomStatusBar barStyle={barStyleSeted} backgroundColor="transparent" />
      <Text style={styles.textTitleContainer}>
        Ordem de Produção
      </Text>
      <BarCodeScanner
        type={'back'}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.boxScannerLogin}
        
      />
      <View style={[styles.containerNotification, {
        display: displayContainerNotify
      }]}>
      <Animated.View style={[styles.boxNotification, {
        top: topBoxNotification,
      }]}>
        <Text style={styles.textTitleNotification}>
          PO
        </Text>
        <Text style={styles.textPONumber}>
          {scannedPO}
        </Text>
        <TouchableOpacity style={styles.boxPODataLine}>
          <Text style={styles.boxesTexts}>
            Product Name
          </Text>
          <Text style={styles.boxesTextsData}>
            ST-CHRI-CHA-02
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boxPODataLine}>
          <Text style={styles.boxesTexts}>
            Quantity
          </Text>
          <Text style={styles.boxesTextsData}>
            2
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boxPODataLine}>
          <Text style={styles.boxesTexts}>
            SO
          </Text>
          <Text style={styles.boxesTextsData}>
            423
          </Text>
        </TouchableOpacity>

        <View style={styles.boxButtons}>
          <TouchableOpacity onPress={handleKeepWithPO} style={styles.buttonCofirmPO}>
            <Text style={styles.textButtonConfirmPO}>
              Confirmar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancelScan} style={styles.buttonCancelPO}>
            <Text style={styles.textButtonCancelPO}>
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
        </Animated.View>
      </View>
    </View>
  );
}