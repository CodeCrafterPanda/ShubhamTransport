import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Replace 'noAccessImage.png' with the actual image asset name you have for the "no access" image
const noAccessImage = require('./path-to-your-assets/noAccessImage.png');

const AccessDeniedScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Access Denied</Text>
      {/* <Image source={noAccessImage} style={styles.image} /> */}
      <Text style={styles.message}>
        You do not have the necessary permissions to access this app.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff', // or any appropriate color
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  image: {
    width: 250, // Adjust the size as needed
    height: 250, // Adjust the size as needed
    marginBottom: 24,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666', // or any appropriate color
  },
});

export default AccessDeniedScreen;
