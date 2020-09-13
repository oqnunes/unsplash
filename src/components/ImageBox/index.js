import React from 'react';
import { TouchableOpacity } from 'react-native';

import styles from './styles';

export default ImageBox = ({imageCode, sizeType}) => {
  return(
    <TouchableOpacity style={[styles.boxItemImage, { width: sizeType}]} />
  );
};