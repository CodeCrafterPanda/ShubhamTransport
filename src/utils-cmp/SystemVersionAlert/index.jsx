import React, { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useDeviceInfo } from '../../hooks';
import { minorVersionCompare } from '../../utils';
const SystemVersionAlert = ({ defaultVersion }) => {
  const { systemVersion } = useDeviceInfo();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isVersionLess = minorVersionCompare(systemVersion,defaultVersion);
    
    setVisible(isVersionLess);

    // Optionally set a timer to hide the modal after a certain period
    let timer = setTimeout(() => setVisible(false), 10000);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [systemVersion, defaultVersion]);

  if (!visible) {
    return null;
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}
    >
      <SafeAreaView style={styles.modalBackground}>
        <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="light-content" />
        <View style={styles.alertContainer}>
        <Text style={[styles.alertText,{fontWeight:'bold',alignSelf:'center',marginTop:5}]}>Please Note </Text>
          <Text style={styles.alertText}>
          Your device is currently running an older software version {systemVersion} than our recommended version {defaultVersion}.
          </Text>
          <Text style={[styles.alertText,{marginTop:15}]}>
          To ensure the best performance and access to all features, we suggest updating your device's software.
          </Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Dim the background
  },
  alertContainer: {
    padding: 20,
    backgroundColor: 'orange',
    borderRadius: 5, // Optional styling for better UX
    width: '80%', // Use a percentage of screen width

  },
  alertText: {
    color: 'white',
    fontSize:16
  },
});

export default SystemVersionAlert;
