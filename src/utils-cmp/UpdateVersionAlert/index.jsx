// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
// import { useDeviceInfo } from './DeviceInfoContext';

// // Mock utility function to fetch the latest app version from the store
// // You need to implement this according to your own backend or service
// const getLatestVersionFromStore = async () => {
//   // Fetch version data from Play Store or App Store
//   // This is just a placeholder and will always return "2.0" for demonstration
//   return '2.0';
// };

// const UpdateVersionAlert = () => {
//   const { appVersion } = useDeviceInfo();
//   const [storeVersion, setStoreVersion] = useState(null);

//   useEffect(() => {
//     const checkForUpdates = async () => {
//       const latestVersion = await getLatestVersionFromStore();
//       setStoreVersion(latestVersion);
//     };

//     checkForUpdates();
//   }, []);

//   // Compare versions and determine if an update is needed
//   const needsUpdate = storeVersion && minorVersionCompare(appVersion,storeVersion);

//   if (!needsUpdate) {
//     // If the app is up-to-date or we haven't finished checking, don't render anything
//     return null;
//   }

//   const handleUpdatePress = () => {
//     // Implement your update logic here, usually directing to the store link
//     console.warn('Redirect to the store for update');
//   };

//   return (
//     <View style={styles.fullScreenContainer}>
//       <View style={styles.updateModal}>
//         <Text style={styles.updateText}>
//           A new version of the app is available. Please update to continue.
//         </Text>
//         <Button title="Update" onPress={handleUpdatePress} />
//       </View>
//     </View>
//   );
// };

// const { width, height } = Dimensions.get('window');

// const styles = StyleSheet.create({
//   fullScreenContainer: {
//     position: 'absolute',
//     width: width,
//     height: height,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     zIndex: 1000, // Ensure it's above other components
//   },
//   updateModal: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   updateText: {
//     marginBottom: 20,
//     textAlign: 'center',
//   },
// });

// export default UpdateVersionAlert;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Linking,
  Dimensions,
  Modal,
} from 'react-native';
import VersionCheck from 'react-native-version-check';

// UpdateScreen Component using Modal
export const UpdateScreen = ({isVisible}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        // Handle modal close if needed
      }}>
      <View style={styles.fullScreenContainer}>
        <Text style={styles.updateMessage}>
          An update is required to continue using the app.
        </Text>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={async () => {
            try {
              const res = await VersionCheck.needUpdate();
              if (res.isNeeded) {
                await Linking.openURL(res.storeUrl);
              }
            } catch (error) {
              console.error('Failed to check for update or open URL:', error);
            }
          }}>
          <Text style={styles.updateButtonText}>Update Now</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export const UpdateAlert = ({isVisible, onClose, onUpdateNow}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.fullScreenContainer}>
        <View style={styles.modalView}>
          <Text style={styles.updateMessage}>
            A new version is available. Please update the app.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={[styles.button, styles.buttonLater]}
              onPress={onClose}>
              <Text style={styles.textStyle}>Update Later</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonUpdate]}
              onPress={async () => {
                try {
                  const res = await VersionCheck.needUpdate();
                  if (res.isNeeded) {
                    await Linking.openURL(res.storeUrl);
                  }
                } catch (error) {
                  console.error(
                    'Failed to check for update or open URL:',
                    error,
                  );
                }
              }}>
              <Text style={styles.textStyle}>Update Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Styles
const styles = StyleSheet.create({
  fullScreenContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,1)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  updateMessage: {
    color: '#fff',
    marginBottom: 20,
  },
  topAlertContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    zIndex: 1000,
  },
  alertMessage: {
    color: '#fff',
  },
  updateButton: {
    padding: 10,
    backgroundColor: '#007bff', // Example color, you can change it as needed
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {},
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonUpdate: {
    backgroundColor: '#2196F3', // Blue color for update now
  },
  buttonLater: {
    backgroundColor: '#f9a825', // Yellow color for update later
  },
  buttonClose: {
    backgroundColor: '#f44336', // Red color for close button
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const UpdateVersionAlert = () => {
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [versionDifference, setVersionDifference] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    // Define an async function to use await
    const checkUpdates = async () => {
      try {
        const updateNeeded = await VersionCheck.needUpdate();
        setNeedsUpdate(updateNeeded.isNeeded);
        if (!updateNeeded.isNeeded) {
          // Get both versions and compare them
          const [currentVersion, latestVersion] = await Promise.all([
            VersionCheck.getCurrentVersion(),
            VersionCheck.getLatestVersion(),
          ]);
          if (currentVersion !== latestVersion) {
            setVersionDifference(true);
          }
        }
      } catch (error) {
        console.error('Error checking for updates:', error);
        // Handle the error, for example, by setting an error state or showing a notification
      }
    };

    // Call the async function
    // checkUpdates();
  }, []);

  const handleCloseAlert = () => {
    setAlertVisible(false);
  };

  return (
    <>
      <UpdateScreen isVisible={needsUpdate} />
      {versionDifference && !needsUpdate && (
        <UpdateAlert isVisible={alertVisible} onClose={handleCloseAlert} />
      )}
      {/* The rest of your app goes here */}
    </>
  );
};

export default UpdateVersionAlert;
