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
import ImgToBase64 from 'react-native-image-base64';

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

  const [hasPermission, setHasPermission] = useState(null);
  const [dataPicture, setDataPicture] = useState([]);
  const [disabledTaken, setDisabledTaken] = useState(false);
  const [disabledAlbum, setDisabledAlbum] = useState(false);
  const [saveIndexDelete, setSaveIndexDelete] = useState(null);
  const [disabledSendImages, setDisabledSendImages] = useState(false);

  useEffect(() => {
    (async () => {

      if(topListOfImages === 0){
        StatusBar.setHidden(false);
      }else{
        StatusBar.setHidden(true);
      }

      if(disabledSendImages >= 1){
        setDisabledSendImages(false);
      }

      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');

    })();
  }, []);

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

    const { userLogin } = JSON.parse(await AsyncStorage.getItem('dataLogin'));

    let arrayOfUris = [];

    const dateNow = new Date();
    const datteNow = dateNow.getTime();

    dataPicture.forEach( async (file, index) => {
      arrayOfUris.push({
        _id: index,
        uri: file.uri,
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

    // console.log(formData);

    await axios({
      method: 'POST',
      url: 'http://192.168.1.173:8888/apis/unsplash/controllers/imageModel/insert/index.php',
      data: formData,
      headers: { 
        'Content-Type' : 'multipart/form-data'
      }
    }).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.log('Erro ao acessar o Servidor');
    })

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
          <TouchableOpacity onPress={_sendImagesToServer} disabled={disabledSendImages} style={styles.buttonEnviar}>
            <Text style={styles.textButtonEnviar}>
              Enviar para PO {route.params.po_number}
            </Text>
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

      </Animated.View>

    </View>
  );
}