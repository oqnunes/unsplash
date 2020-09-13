import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  boxButtons: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  titleBoxButtons: {
    marginTop: 20,
    fontSize: 32,
    fontFamily: 'nunito-black'
  },
  subTitleBB: {
    width: '80%',
    marginTop: 20,
    fontSize: 20,
    fontFamily: 'nunito-regular',
    textAlign: 'center'
  },
  boxShowPass: {
    width: '100%',
    height: 100,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
  BoxNumberSP: {
    minWidth: 54,
    height: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderBottomWidth: 3,
  },
  textBoxNumberSP: {
    fontSize: 30,
    fontFamily: 'nunito-bold'
  },
  boxNumberToPress: {
    width: '100%',
    height: '50%',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 30
  },
  boxButtonNTP: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '22%',
  },
  textBoxButtonNTP: {
    fontSize: 30,
  }
});