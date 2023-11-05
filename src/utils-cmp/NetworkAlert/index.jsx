import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Animated,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';

const NetworkAlert = () => {
  const {isConnected, isInternetReachable, type} = useNetInfo();
  const [visible, setVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0]; // Initial value for opacity: 0

  const toggleAlert = shouldShow => {
    Animated.timing(fadeAnim, {
      toValue: shouldShow ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      if (!shouldShow) {
        setVisible(false);
      }
    });
  };

  
  useEffect(() => {
    // If the network status changes, show the alert
    if (!isConnected && !isInternetReachable) {
      setVisible(true);
      toggleAlert(true);
      setTimeout(() => toggleAlert(false), 1500); 
    } else if (isConnected && isInternetReachable) {
      setVisible(true);
      toggleAlert(true);
      setTimeout(() => toggleAlert(false), 1500); 
    }
  }, [isConnected, isInternetReachable]);

  if (!visible) {
    return null;
  }

  return (
    <Modal
      animationType="none" // Since we're handling animation ourselves
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        toggleAlert(false);
      }}>
      <SafeAreaView style={styles.modalBackground}>
        {/* <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="light-content" /> */}
        <Animated.View
          style={[
            styles.alertContainer,
            {
              backgroundColor:
                isConnected && isInternetReachable ? 'green' : 'red',
              opacity: fadeAnim,
            },
          ]}>
          <Text style={styles.alertText}>
            {isConnected && isInternetReachable
              ? `Connected to ${type?.toUpperCase()}`
              : 'No Internet Connection'}
          </Text>
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  alertContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
  alertText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default NetworkAlert;
