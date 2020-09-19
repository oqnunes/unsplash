import React, { useState, useEffect, useRef } from 'react';
import { Animated, 
         Text, 
         View, 
         TouchableOpacity, 
         StatusBar, 
         Dimensions,
         ScrollView,
         ImageBackground,
         AsyncStorage } from 'react-native';

import { Camera } from 'expo-camera';
import Constants from 'expo-constants';
import axios from 'axios';

import LottieView from 'lottie-react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import styles from './styles';

export default function CameraScreen({ route, navigation }) {

  const camRef = useRef(null);
  const topNDI = useRef(new Animated.Value(2000)).current;
  const topListOfImages = useRef(new Animated.Value(2000)).current;
  const usefullNDI = windowHeight - 160;
  const usefullNES = windowHeight - 200;
  const animation = useRef(null);
  const topSendError = useRef(new Animated.Value(2000)).current;

  const [hasPermission, setHasPermission] = useState(null);
  const [dataPicture, setDataPicture] = useState([]);
  const [disabledTaken, setDisabledTaken] = useState(false);
  const [disabledAlbum, setDisabledAlbum] = useState(false);
  const [displayLottie, setDisplayLottie] = useState('none');
  const [displayTextLt, setDisplayTextLt] = useState('flex');
  const [saveIndexDelete, setSaveIndexDelete] = useState(null);
  const [disabledSendImages, setDisabledSendImages] = useState(true);

  const [textErrorSend, setTextErrorSend] = useState('Não foi possível completar a ação.');
  const [codgErrorSend, setCodgErrorSend] = useState(0);

  useEffect(() => {
    (async () => {

      if(topListOfImages == 2000){
        StatusBar.setHidden(false);
      }else{
        StatusBar.setHidden(true);
      }

      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');

    })();
  }, [dataPicture, topListOfImages]);

  const takePictureFunc = async () => {
    setDisabledTaken(true);
    setDisabledAlbum(true);
    if(camRef){
      const responseTakePictureAsync = await camRef.current.takePictureAsync({base64: true});
      if(responseTakePictureAsync !== null){

        const dateNow = new Date();
        const datteNow = dateNow.getTime();

        const newObject = {
          _id: parseInt(datteNow),
          uri: responseTakePictureAsync.base64
        };

        const rowOldData = dataPicture;
        rowOldData.push(newObject);
        setDataPicture([...rowOldData]);

        setDisabledTaken(false);
        setDisabledAlbum(false);

      }else{
        console.log(`Erro ao capturar Imagem. Tente novamente.`);
        setDisabledTaken(false);
        setDisabledAlbum(false);
      }
    }
  }

  const goBackFromCamera = () => {
    navigation.navigate("VerifyPO");
  }

  const showListOfImages = () => {
    if(disabledSendImages === true){
      setDisabledSendImages(false);
    }
    StatusBar.setHidden(false);
    Animated.timing(topListOfImages, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false
    }).start();
  }
  const hideListOfImages = () => {
    StatusBar.setHidden(true);
    Animated.timing(topListOfImages, {
      toValue: 2000,
      duration: 400,
      useNativeDriver: false
    }).start();
  }

  const _showBoxConfirmDeletePhoto = (index) => {
    setSaveIndexDelete(index);
    Animated.timing(topNDI, {
      toValue: usefullNDI,
      duration: 400,
      useNativeDriver: false
    }).start();
  }
  const _hideBoxConfirmDeletePhoto = () => {
    Animated.timing(topNDI, {
      toValue: 2000,
      duration: 400,
      useNativeDriver: false
    }).start();
  }

  const _hideBoxErrorSendImages = () => {
    Animated.timing(topSendError, {
      toValue: 2000,
      duration: 400,
      useNativeDriver: false
    }).start();
  }

  const _onClickDeletePhoto = () => {
    if(dataPicture.length === 1){
      setDisabledSendImages(true);
    }

    const lastOldData = dataPicture;
    lastOldData.splice(saveIndexDelete, 1);
    setDataPicture([...lastOldData]);
    Animated.timing(topNDI, {
      toValue: 2000,
      duration: 1000,
      useNativeDriver: false
    }).start();
  }

  const _sendImagesToServer = async () => {

    if(dataPicture.length == 0){


    }else{

      setDisplayLottie('flex');
      setDisplayTextLt('none');
      setDisabledSendImages(true);
      
      animation.current.play();
  
      const { userLogin } = JSON.parse(await AsyncStorage.getItem('dataLogin'));
  
      let arrayOfUris = [];
  
      const dateNow = new Date();
      const datteNow = dateNow.getTime();
  
      dataPicture.forEach( async (data, index) => {
        arrayOfUris.push({
          _id: index,
          uri: data.uri,
          time: datteNow,
        });
      });
  
      // Building data for Api
      const formData = new FormData();
  
      // Auth
      formData.append('model', 'imageModel');
      formData.append('action', 'insert');
  
      // Data Form
      formData.append('whoIsSending', userLogin);
      formData.append('poRelated', route.params.po_number);
      formData.append('uris', JSON.stringify(arrayOfUris));
      formData.append('uriLength', arrayOfUris.length);
  
      await axios({
        method: 'POST',
        url: 'http://192.168.1.173:8888/apis/unsplash/configs/upload/index.php',
        data: formData,
        headers: { 
          'Content-Type' : 'multipart/form-data'
        }
      }).then((response) => {

        if(response.data.success === true){
          console.log(response.data);

          setTimeout(() => {
            navigation.navigate('SuccessSendImage');
          }, 1000);

        }else{

          Animated.timing(topSendError, {
            toValue: usefullNES,
            duration: 400,
            useNativeDriver: false
          }).start();

          setDisplayLottie('none');
          setDisplayTextLt('flex');
          setDisabledSendImages(false);

          setTextErrorSend(response.data.erro_msg);
          setCodgErrorSend(response.data.erro_code);

          console.log(response.data);
        }

      }).catch((error) => {
        console.log('Erro ao acessar o Servidor');
      })

    }

  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.contentCamera}>
      <Camera style={{ flex: 1 }} type={"back"} ref={camRef}>
        <View>
          <TouchableOpacity>
            <Text>
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ContainerButtonClose}>
          <TouchableOpacity onPress={goBackFromCamera}>
            <MaterialCommunityIcons name="window-close" size={36} color="white" />          
          </TouchableOpacity>
        </View>
        <View style={styles.ContainerButtonPress}>
          <View style={styles.AroundBorderButton}>
            <TouchableOpacity 
              onPress={takePictureFunc}
              disabled={disabledTaken} 
              style={styles.buttonPress}>
            </TouchableOpacity>
          </View>
        </View>
      </Camera>

      <View style={[styles.boxImagesTaked]}>
        <TouchableOpacity disabled={disabledAlbum} onPress={showListOfImages}>
          <Ionicons name="ios-albums" size={34} color="white" />
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.containerSafeAreaView, {
        top: topListOfImages,
        paddingTop: Constants.statusBarHeight
      }]}>
        <View style={[styles.boxNavigation]}>
          <TouchableOpacity onPress={hideListOfImages}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.textBoxNavigation}>
            Lista de Imagen
          </Text>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </View>

        <ScrollView style={styles.boxScrollView}>
          {
            dataPicture.map((item, index) => {
              return(
              <View key={index} style={styles.boxAroundIB}>
                <ImageBackground 
                  style={[styles.boxUrlImage]} 
                  source={{uri: `data:image/gif;base64,${item.uri}`}} 
                >
                  <TouchableOpacity onPress={() => _showBoxConfirmDeletePhoto(index)} style={styles.boxActionDeleteImage}>
                    <FontAwesome5 name="trash" size={22} color="white" />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
              );
            })
          }
        </ScrollView>

        <View style={styles.boxButtonEnviar}>
          <TouchableOpacity disabled={disabledSendImages} onPress={_sendImagesToServer} style={styles.buttonEnviar}>
            <Text style={[styles.textButtonEnviar, {
              display: displayTextLt
            }]}>
              Enviar para PO {route.params.po_number}
            </Text>
            <LottieView
              ref={animation}
              style={[styles.lottieSending, {
                display: displayLottie
              }]}
              source={require('./../../../assets/images/sending.json')}
            />
          </TouchableOpacity>
        </View>
        
        <Animated.View style={[styles.boxNotificationDeleteImage, { top: topNDI }]}>
          <Text style={styles.textTitleNDI}>
            Deseja deletar essa imagem?
          </Text>
          <View style={styles.subBoxNDI}>
            <TouchableOpacity onPress={_hideBoxConfirmDeletePhoto} style={styles.boxClickNegative}>
              <Text style={styles.textBoxClickNegative}>
                Não
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={_onClickDeletePhoto} style={styles.boxClickPositive}>
              <Text style={styles.textBoxClickPositive}>
                Sim
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <Animated.View style={[styles.boxNotifyErrorSend, {
          top: topSendError
        }]}>
        <Text style={[styles.textBoxNotifyErrorSend]}>
            Código do Erro: {codgErrorSend}
        </Text>
          <Text style={[styles.textBoxNotifyErrorSend2]} numberOfLines={2}>
            {textErrorSend}
          </Text>
          <TouchableOpacity onPress={_hideBoxErrorSendImages} style={styles.buttonConfirmError}>
            <Text style={styles.textButtonConfirmError}>
              Entendido
            </Text>
          </TouchableOpacity>
        </Animated.View>

      </Animated.View>

    </View>
  );
}