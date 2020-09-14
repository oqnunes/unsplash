import React, { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

export default function BoxButtons({passPass, scanned, tokenT}){
  const navigation = useNavigation();

  const [input_1, setInput_1] = useState();
  const [input_2, setInput_2] = useState();
  const [input_3, setInput_3] = useState();
  const [input_4, setInput_4] = useState();

  const [nowEmpty, setNowEmpty] = useState(1);
  const [returnPass, setReturnPass] = useState('zero');

  const [colorBottomWidth, setColorBottomWidth] = useState('black');

  useEffect(() => {
    (async function(){
      if(returnPass.length == 4){
        if(parseInt(passPass) === parseInt(returnPass)){
          const dataLogin = {
            userLogin : scanned,
            tokenT    : tokenT
          }
          await AsyncStorage.setItem('dataLogin', JSON.stringify(dataLogin))
            .then(() => {
              navigation.navigate('Main');
            }).catch((error) => {
              console.log(error);
            });
        }
        else{
          setColorBottomWidth('red');
          console.log('Senha incorreta.');
        }
      }
    })();

  }, [returnPass]);

  const setNumberWhere = (pressed) => {
    if(nowEmpty === 1){
      setInput_1(pressed);
      setNowEmpty(2);
      setReturnPass(pressed);
    }else if(nowEmpty === 2){
      setInput_2(pressed);
      setNowEmpty(3);
      setReturnPass(`${input_1}` + pressed);
    }else if(nowEmpty === 3){
      setInput_3(pressed);
      setNowEmpty(4);
      setReturnPass(`${input_1}` + `${input_2}` + pressed);
    }else if(nowEmpty === 4){
      setInput_4(pressed);
      setReturnPass(`${input_1}` + `${input_2}` + `${input_3}` + pressed);
    }

  };
  const cleanInputs = () => {
    if(nowEmpty === 1){
      setNowEmpty(1);
      setInput_1();
      setColorBottomWidth('black');
    }else if(nowEmpty === 2){
      setNowEmpty(1);
      setInput_2();
      setColorBottomWidth('black');
    }else if(nowEmpty === 3){
      setNowEmpty(2);
      setInput_3();
      setColorBottomWidth('black');
    }else if(nowEmpty === 4){
      setNowEmpty(3);
      setInput_4();
      setColorBottomWidth('black');
    }
  };

  return(
    <View style={styles.boxButtons}>
      <Text style={styles.titleBoxButtons}>
        Sua senha
      </Text>
      <Text style={styles.subTitleBB}>
        Entre com a sua senha para continuar.
      </Text>
      <View style={styles.boxShowPass}>
        <View style={[styles.BoxNumberSP, {
          borderBottomColor: colorBottomWidth,
        }]}>
          <Text style={styles.textBoxNumberSP}>
            {input_1}
          </Text>
        </View>
        <View style={[styles.BoxNumberSP, {
          borderBottomColor: colorBottomWidth,
        }]}>
          <Text style={styles.textBoxNumberSP}>
            {input_2}
          </Text>
        </View>
        <View style={[styles.BoxNumberSP, {
          borderBottomColor: colorBottomWidth,
        }]}>
          <Text style={styles.textBoxNumberSP}>
            {input_3}
          </Text>
        </View>
        <View style={[styles.BoxNumberSP, {
          borderBottomColor: colorBottomWidth,
        }]}>
          <Text style={styles.textBoxNumberSP}>
            {input_4}
          </Text>
        </View>
      </View>
      <View style={styles.boxNumberToPress}>
        <TouchableHighlight underlayColor="rgba(0,0,0,0.06)" onPress={() => setNumberWhere(1)} style={styles.boxButtonNTP}>
          <Text style={styles.textBoxButtonNTP}>
            1
          </Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="rgba(0,0,0,0.06)" onPress={() => setNumberWhere(2)} style={styles.boxButtonNTP}>
          <Text style={styles.textBoxButtonNTP}>
            2
          </Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="rgba(0,0,0,0.06)" onPress={() => setNumberWhere(3)} style={styles.boxButtonNTP}>
          <Text style={styles.textBoxButtonNTP}>
            3
          </Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="rgba(0,0,0,0.06)" onPress={() => setNumberWhere(4)} style={styles.boxButtonNTP}>
          <Text style={styles.textBoxButtonNTP}>
            4
          </Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="rgba(0,0,0,0.06)" onPress={() => setNumberWhere(5)} style={styles.boxButtonNTP}>
          <Text style={styles.textBoxButtonNTP}>
            5
          </Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="rgba(0,0,0,0.06)" onPress={() => setNumberWhere(6)} style={styles.boxButtonNTP}>
          <Text style={styles.textBoxButtonNTP}>
            6
          </Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="rgba(0,0,0,0.06)" onPress={() => setNumberWhere(7)} style={styles.boxButtonNTP}>
          <Text style={styles.textBoxButtonNTP}>
            7
          </Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="rgba(0,0,0,0.06)" onPress={() => setNumberWhere(8)} style={styles.boxButtonNTP}>
          <Text style={styles.textBoxButtonNTP}>
            8
          </Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="rgba(0,0,0,0.06)" onPress={() => setNumberWhere(9)} style={styles.boxButtonNTP}>
          <Text style={styles.textBoxButtonNTP}>
            9
          </Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="rgba(0,0,0,0.06)" onPress={() => {}} style={styles.boxButtonNTP}>
          <Text style={styles.textBoxButtonNTP}>
            *
          </Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="rgba(0,0,0,0.06)" onPress={() => setNumberWhere(0)} style={styles.boxButtonNTP}>
          <Text style={styles.textBoxButtonNTP}>
            0
          </Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="rgba(0,0,0,0.06)" onPress={() => cleanInputs()} style={styles.boxButtonNTP}>
          <Text style={styles.textBoxButtonNTP}>
            {'<'}
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}