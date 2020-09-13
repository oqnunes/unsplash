import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxTitle: {
    width: '100%',
    alignItems: 'center'
  },
  textBoxTitle: {
    fontSize: 36,
    fontWeight: '900',
  },
  boxSubTitle: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center'
  },
  textSubBoxTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.4)'
  },
  lineSlim: {
    width: 40,
    height: 2,
    backgroundColor: 'rgba(0,0,0,0.4)',
    marginVertical: 30,
  },
  buttonLogin: {
    width: '40%',
    paddingVertical: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(0,0,0,0.6)',
    backgroundColor: 'black'
  },
  textButtonLogin: {
    fontSize: 22,
    color: 'white',
    fontWeight: '600',
  }
});