import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import * as Device from 'expo-device';

let topHeight = 0;


if(Device.brand === "Apple"){
  topHeight = 20;
}

export default StyleSheet.create({
  contentCamera: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  ContainerButtonPress: {
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 30,
  },
  AroundBorderButton: {
    width: 80,
    height: 80,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  buttonPress: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderRadius: 100,
    borderColor: 'rgba(0,0,0,0.6)',
  },
  ContainerButtonClose: {
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: 30,
    paddingTop: 10
  },
  boxImagesTaked: {
    position: 'absolute',
    bottom: 50,
    right: 50
  },
  boxListaDeImagens: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'white',
    paddingTop: topHeight
  },
  boxContentImages: {
    width: '100%',
    marginBottom: 180,
    backgroundColor: 'white',
  },

  // View Manipular Images

  containerSafeAreaView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 555,
    backgroundColor: 'white'
  },
  boxNavigation: {
    width: '100%',
    height: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'relative',
    top: 0,
  },
  textBoxNavigation: {
    fontSize: 22,
    fontFamily: 'nunito-bold'
  },
  boxScrollView: {
    width: '100%',
    backgroundColor: '#F2F2F2',
    marginBottom: 110
  },
  boxAroundIB: {
    width: '100%',
    paddingTop: 20,
  },
  boxUrlImage: {
    width: windowWidth - 40,
    height: windowHeight - 70,
    marginBottom: 20,
    marginHorizontal: 20,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  boxActionDeleteImage: {
    width: 100,
    height: 50,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  boxButtonEnviar: {
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    zIndex: 3,
    paddingBottom: 20,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  buttonEnviar: {
    width: '100%',
    height: 70,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textButtonEnviar: {
    fontSize: 22,
    color: 'white',
    fontFamily: 'nunito-bold'
  },
  boxNotificationDeleteImage: {
    width: '100%',
    height: 160,
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 9999,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 60,
    shadowRadius: 100.84,
    
    elevation: 9,
  },
  textTitleNDI: {
    fontSize: 26,
    fontFamily: 'nunito-black'
  },
  subBoxNDI: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 20,
  },
  boxClickNegative: {
    width: '48%',
    height: 60,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBoxClickNegative: {
    fontSize: 20,
    fontFamily: 'nunito-bold'
  },
  boxClickPositive: {
    width: '48%',
    height: 60,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBoxClickPositive: {
    fontSize: 20,
    fontFamily: 'nunito-bold',
    color: 'white'
  },
  lottieSending: {
    width: 120,
    height: 120,
  },
  boxNotifyErrorSend: {
    width: '100%',
    height: 200,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    backgroundColor: '#F1F1F1',
    zIndex: 9999,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 60,
    shadowRadius: 100.84,
    
    elevation: 9,
  },
  textBoxNotifyErrorSend: {
    width: '100%',
    fontSize: 28,
    fontFamily: 'nunito-black'
  },
  textBoxNotifyErrorSend2: {
    width: '100%',
    fontSize: 20,
    fontFamily: 'nunito-semi-bold'
  },
  buttonConfirmError: {
    width: '100%',
    borderWidth: 2,
    padding: 16,
    marginTop: 8,
    alignItems: 'center'
  },
  textButtonConfirmError: {
    fontSize: 20,
    fontFamily: 'nunito-black'
  }
});