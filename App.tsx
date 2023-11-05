// import 'react-native-gesture-handler';
import React from 'react';
import {
  DataProvider,
  AuthProvider,
  DeviceInfoProvider,
  OrientationProvider,
} from './src/hooks';
import AppNavigation from './src/navigation/App';
import SystemVersionAlert from './src/utils-cmp/SystemVersionAlert';
import NetworkAlert from './src/utils-cmp/NetworkAlert';
import UpdateVersionAlert from './src/utils-cmp/UpdateVersionAlert';
export default function App() {
  return (
    <DeviceInfoProvider>
      <AuthProvider>
        <DataProvider>
          <OrientationProvider>
            <UpdateVersionAlert/>
            <SystemVersionAlert defaultVersion="13" />
            <NetworkAlert />
            <AppNavigation />
          </OrientationProvider>
        </DataProvider>
      </AuthProvider>
    </DeviceInfoProvider>
  );
}
