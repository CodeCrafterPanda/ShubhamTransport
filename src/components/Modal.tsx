import React from 'react';
import {
  StyleSheet,
  Modal as RNModal,
  ViewStyle,
  Platform,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {useTheme} from '../hooks/';
import {IModalProps} from '../constants/types';

import Block from './Block';
import Button from './Button';
import Image from './Image';

const Modal = ({
  id = 'Modal',
  title = '',
  children,
  style,
  onRequestClose,
  ...props
}: any) => {
  const {assets, colors, sizes} = useTheme();
  const modalStyles = StyleSheet.flatten([style, {}]) as ViewStyle;

  // generate component testID or accessibilityLabel based on Platform.OS
  const modalID =
    Platform.OS === 'android' ? {accessibilityLabel: id} : {testID: id};

  return (
    <RNModal
      {...modalID}
      {...props}
      transparent
      style={modalStyles}
      animationType="slide"
      onRequestClose={onRequestClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{title}</Text>
          <TouchableOpacity onPress={() => onRequestClose?.()}>
            <Image source={assets.close} color={'black'} />
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'flex-end',
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default React.memo(Modal);
