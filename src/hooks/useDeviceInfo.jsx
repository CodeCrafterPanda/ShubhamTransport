import React, { createContext, useState, useEffect, useContext } from 'react';
import DeviceInfo from 'react-native-device-info';

export const DeviceInfoContext = createContext();

export const DeviceInfoProvider = ({ children }) => {
  const [deviceInfo, setDeviceInfo] = useState({
    systemVersion: '',
    appVersion: '',
    isTablet: false,
    hasNotch: false,
    systemName: '',
  });

  useEffect(() => {
    // Fetch device information and set it in state
    const fetchDeviceInfo = async () => {
      setDeviceInfo({
        systemVersion: DeviceInfo.getSystemVersion(),
        appVersion: DeviceInfo.getVersion(),
        isTablet: DeviceInfo.isTablet(),
        hasNotch: DeviceInfo.hasNotch(),
        systemName: DeviceInfo.getSystemName(),
      });
    };

    fetchDeviceInfo();
  }, []);

  return (
    <DeviceInfoContext.Provider value={deviceInfo}>
      {children}
    </DeviceInfoContext.Provider>
  );
};

export const useDeviceInfo = () => {
  const context = useContext(DeviceInfoContext);
  if (!context) {
    throw new Error('useDeviceInfo must be used within a DeviceInfoProvider');
  }
  return context;
};


// ----------------------------Sample Use -----------------------------------------

// import React from 'react';
// import { Text, View } from 'react-native';
// import { useDeviceInfo } from './path-to-this-file';

// const MyComponent = () => {
//   const {systemVersion,appVersion,isTablet,hasNotch,systemName} = useDeviceInfo();

//   return (
//     <View>
//       <Text>System Version: {systemVersion}</Text>
//       <Text>App Version: {appVersion}</Text>
//       <Text>Is Tablet: {isTablet ? 'Yes' : 'No'}</Text>
//       <Text>Has Notch: {hasNotch ? 'Yes' : 'No'}</Text>
//       <Text>System Name: {systemName}</Text>
//     </View>
//   );
// };

// export default MyComponent;
