import React, { memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './index.styles';

const TransactionButton = memo(({title, onPress, style}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
));

export default TransactionButton;
