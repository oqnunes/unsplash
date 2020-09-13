import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 30,
  },
  textTitleContainer: {
    fontSize: 32,
    fontFamily: 'nunito-extra-bold'
  },
  boxScannerLogin: {
    width: '100%',
    height: 200,
    marginTop: 26,
  },
  containerNotification: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 1,
    position: 'absolute',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  boxNotification: {
    width: windowWidth,
    height: windowHeight,
    position: 'absolute',
    paddingVertical: 30,
    top: '30%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white'
  },
  textTitleNotification: {
    width: '100%',
    textAlign: 'center',
    fontSize: 26,
    fontFamily: 'nunito-extra-bold'
  },
  textPONumber:{
    width: '100%',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    fontSize: 42,
    fontFamily: 'nunito-extra-bold'
  },
  boxPODataLine: {
    width: '100%',
    paddingVertical: 12,
    flexDirection: 'row',
    paddingHorizontal: 30,
    backgroundColor: 'rgba(0,0,0,0.03)',
    alignItems: 'center'
  },
  boxesTexts: {
    width: '50%',
    fontSize: 18,
    fontFamily: 'nunito-regular',
    letterSpacing: 0.6,
    color: 'rgba(0,0,0,0.6)'
  },
  boxesTextsData: {
    fontFamily: 'nunito-semi-bold',
    fontSize: 18,
  },
  boxButtons: {
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 30,
  },
  buttonCofirmPO: {
    width: '100%',
    height: 54,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButtonConfirmPO: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'nunito-bold',
    letterSpacing: 0.6
  },
  buttonCancelPO: {
    width: '100%',
    height: 50,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButtonCancelPO: {
    fontSize: 18,
    fontFamily: 'nunito-bold',
    letterSpacing: 0.6
  },
});