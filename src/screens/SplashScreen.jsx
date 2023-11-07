import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {light} from '../constants';
const {width, height} = Dimensions.get('window');
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.centeredView, {flex: 3}]}>
        <Image source={light.assets.tLogo} style={styles.logo} />
      </View>

      <View style={[styles.centeredView, {justifyContent: 'flex-start'}]}>
        <ActivityIndicator size="large" style={styles.activityIndicator} />

        <Text style={styles.message}>Welcome to Shubham Transport.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', // White background color
    alignItems: 'center', // Center items horizontally
    // justifyContent: 'center', // Center items vertically
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center', // Center children vertically in this view
    alignItems: 'center',
    // Center children horizontally in this view
  },
  logo: {
    width: width - 100, // Set the width of the square image
    // height: 150, // Set the height of the square image
    resizeMode: 'contain',
    // marginBottom: 20, // Add some margin at the bottom
  },
  activityIndicator: {
    // marginVertical: 20, // Add vertical margin for spacing
  },
  message: {
    fontSize: 18,
    color: '#000', // Text color
    fontFamily: light.fonts.bold,
  },
});

export default SplashScreen;
