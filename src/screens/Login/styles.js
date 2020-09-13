import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    zIndex: 1,
    position: 'relative'
  },
  boxHeader: {
    width: '100%',
    height: 80,
    paddingHorizontal: '4%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: -8,
  },  
  boxTitleLogin: {
    width: '80%',
    paddingHorizontal: '6%',
    marginTop: 10,
  },
  textBoxTitleLogin: {
    fontSize: 36,
    fontWeight: 'bold',
    lineHeight: 50,
    fontFamily: 'nunito-extra-bold'
  },
  boxScannerLogin: {
    width: '88%',
    marginLeft: '6%',
    height: 200,
    marginTop: 40,
  },
  containerNotification: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 1,
    position: 'absolute',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  boxNotification: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    padding: 24,
    alignItems: 'center',
    position: 'absolute',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  imageSecurity: {
    width: 300,
    height: 180,
    marginTop: 40
  },
  boxButtonsPass: {
    width: '100%'
  },
  textErrorMsg: {
    width: 250,
    height: 250
  },
  textErrorMsgs: {
    marginTop: 50,
    fontSize: 24,
    fontFamily: 'nunito-semi-bold'
  }
});