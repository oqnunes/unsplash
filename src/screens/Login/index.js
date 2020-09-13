import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, Text, Image } from 'react-native';
import axios from 'axios';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Entypo } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import * as Device from 'expo-device';

import CustomStatusBar from './../../components/StatusBarr';
import BoxButtons from '../../components/BoxButtons';

import styles from './styles';

export default function Login(){
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [dataScanned, setDataScanned] = useState();
  const [displayScan, setDisplayScan] = useState('flex');
  const [displayNotification, setDisplayNotification] = useState('none');
  const [displayLoading, setDisplayLoading] = useState('flex');
  const [displayButtons, setDisplayButtons] = useState('none');
  const [borderRadiusNotification, setBRNotifications] = useState(30);
  const [returnPass, setReturnPass] = useState();
  const [tokemT, setTokenT] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [displayLottie, setDisplayLottie] = useState('flex');

  const animation = useRef(null);
  const topBoxNotification = useRef(new Animated.Value(50000)).current;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({type, data}) => {
    setScanned(true);
    setDisplayScan('none');
    setDisplayNotification('flex');
    setDataScanned(data);

      Animated.timing(topBoxNotification, {
        toValue: 200,
        duration: 500,
        useNativeDriver: false
      }).start();

    animation.current.play();

    const scann = data;

    var params = new FormData();
    params.append('model', 'userModel');
    params.append('controller', 'list-users');
    params.append('barCode', scann);
    params.append('phoneName', Device.deviceName);

    await axios({
      method: 'post',
      url: 'http://192.168.1.173:8888/apis/unsplash/',
      data: params,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if(response.data.success === true){
        setReturnPass(response.data.data);
        setTokenT(response.data.tokenTemporary);
        setTimeout(() => {
          setDisplayLoading('none');
          setDisplayButtons('flex');
          Animated.timing(topBoxNotification, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
          }).start();
          setBRNotifications(0);
        }, 2000);

      }else{
        setDisplayLottie('none');
        setErrorMsg(response.data.erro_msg);
      }
      
    }).catch((error) => {
      console.log(error);
    });
    
  };

  const goBackScreen = () => {
    navigation.goBack();
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  return(
    <>
    <View style={styles.container}>
    <CustomStatusBar barStyle="dark-content" backgroundColor="transparent" />
      <View style={styles.boxHeader}>
        <Entypo
          onPress={goBackScreen}
          name="chevron-left" 
          size={36} 
          color="black" 
          style={{paddingLeft: -20}} />
      </View>
      <View style={styles.boxTitleLogin}>
        <Text style={styles.textBoxTitleLogin}>
          Informe sua indentificação
        </Text>
      </View>
      <BarCodeScanner
        type={'back'}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[styles.boxScannerLogin, {
          display: displayScan
        }]}
        
      />
    </View>
    <View style={[styles.containerNotification,
      {
        display: displayNotification
      }
    ]}>
      <Animated.View style={[styles.boxNotification, {
        top: topBoxNotification,
        borderTopLeftRadius: borderRadiusNotification,
        borderTopRightRadius: borderRadiusNotification,
      }]}>
        <View style={{
          display: displayLoading,
          alignItems: 'center'
        }}>

          <Image
            source={
              require('./../../../assets/ui/security.png')
            }
            style={styles.imageSecurity}
          />
        <LottieView
          ref={animation}
          style={[styles.textErrorMsg, {
            display: displayLottie
          }]}
          source={require('./../../../assets/images/loading.json')}
        />
        </View>
        <Text style={styles.textErrorMsgs}>
          {errorMsg}
        </Text>
        <View style={[styles.boxButtonsPass, {
          display: displayButtons
        }]}>
          <BoxButtons passPass={returnPass} scanned={dataScanned} tokenT={tokemT} />
        </View>
      </Animated.View>
    </View>
    </>

  );
}