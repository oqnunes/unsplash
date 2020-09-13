import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 30,
    paddingTop: 30,
  },
  boxBoxIcons: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 30
  },
  subBox2Icons:{
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  texTitleMain: {
    marginVertical: 30,
    fontSize: 32,
    fontFamily: 'nunito-extra-bold',
    color: 'rgba(0,0,0,0.8)'
  },
  textRelativeTime:{
    paddingBottom: 20,
    fontSize: 18,
    fontFamily: 'nunito-extra-bold'
  },
  text2RelativeTime: {
    paddingTop: 20,
    paddingBottom: 30,
    fontSize: 18,
    fontFamily: 'nunito-extra-bold'

  },
  boxFlatImages: {
    backgroundColor: 'tan'
  },
  boxImages: {
    height: 160,
  },
  boxButtonsSettings: {
    width: '100%',
    paddingRight: 30
  },
  buttonsSettings: {
    width: '100%',
    height: 60,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0,0,0,0.4)'
  },
  textButtonsSettings: {
    fontSize: 22,
    fontFamily: 'nunito-bold'
  }
});