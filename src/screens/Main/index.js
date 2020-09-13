import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import CustomStatusBar from './../../components/StatusBarr';
import EmptyToday from './../../components/EmptyToday';
import ImageBox from './../../components/ImageBox';

import _dataTest  from '../../services/_dataTest';
import _dataTests from '../../services/_dataTests';

import styles from './styles';

export default function Main(){
  const navigation = useNavigation();

  const [updatedDataLogin, setUpdatedDataLogin] = useState(1);
  const [initialScaleMain, setInicialScaleMain] = useState(1);
  const [initialTextTitle, setInitialTextTitle] = useState('Últimos envios');
  const [displayAjustes, setDisplayAjustes] = useState('none');
  const [displayLastest, setDisplayLastest] = useState('flex');
  const [ChangeIcon1, setChangeIcon1] = useState('bars');

  useEffect(() => {
    (async function validaLogin(){
      const returnValidaLogin = await AsyncStorage.getItem('dataLogin');

      if(returnValidaLogin === null){
        navigation.navigate('Wellcome');
      }
      
      const dataTested = await AsyncStorage.getItem('@storage_imagesTaked');
      if(dataTested !== null){
        await AsyncStorage.removeItem('@storage_imagesTaked');
      }

    })();
  }, [updatedDataLogin]);

  const renderItem = ({ item }) => (
    <ImageBox imageCode={item.imageCode} sizeType={item.sizeType} />
  );

  const _handleGoToSettings = () => {
    if(displayAjustes === 'none'){
      setInitialTextTitle('Ajustes');
      setDisplayAjustes('flex');
      setDisplayLastest('none');
      setChangeIcon1('times');
    }else{
      setInitialTextTitle('Últimos envios');
      setDisplayAjustes('none');
      setDisplayLastest('flex');
      setChangeIcon1('bars');
    }
  };

  const _handleLogout = async () => {
    await AsyncStorage.clear()
      .then(() => {
        setUpdatedDataLogin(updatedDataLogin + 1);
        console.log('Logout realizado com Sucesso');
      });
  }

  const _handleGoToCamera = () => {
    navigation.navigate('VerifyPO');
  }

  return(
    <View style={[styles.container, {
      transform: [{scale: initialScaleMain}]
    }]}>
      <CustomStatusBar barStyle="dark-content" backgroundColor="transparent" />
      <View style={styles.boxBoxIcons}>
        <TouchableOpacity onPress={_handleGoToCamera}>
          <Entypo name="camera" size={32} color="rgba(0,0,0,0.8)" />
        </TouchableOpacity>
        <View style={styles.subBox2Icons}>
          <TouchableOpacity>
            <MaterialIcons name="search" size={26} color="black" style={{marginRight: 10}}  />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="notifications-none" size={26} style={{marginLeft: 10}}  color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={_handleGoToSettings}>
            <FontAwesome name={ChangeIcon1} size={20} color="black" style={{marginLeft: 20}} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View>
        <TouchableOpacity style={styles.titleMain}>
          <Text style={styles.texTitleMain}>
            {initialTextTitle}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{display: displayLastest}}>
        <Text style={styles.textRelativeTime}>
          Hoje
        </Text>
        <SafeAreaView style={styles.boxImages}>
          <FlatList
            data={_dataTest}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={<EmptyToday />}
          />
        </SafeAreaView>
        <Text style={styles.text2RelativeTime}>
          Semana passada
        </Text>
        <SafeAreaView style={styles.boxImages}>
          <FlatList
            data={_dataTests}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={() => {}}
          />
        </SafeAreaView>
      </View>

      <View style={[styles.boxButtonsSettings, {display: displayAjustes}]}>
        <TouchableOpacity onPress={_handleLogout} style={styles.buttonsSettings}>
          <Text style={styles.textButtonsSettings}>
            Sair
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}