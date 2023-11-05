import {NativeModules, Platform, NativeEventEmitter} from 'react-native';

const AUTO_ROTATION_CHANGE = 'autoRotationSettingChanged';
const ERROR = `Something went wrong. Please rebuild the app with: npx react-native run-android`;

const {AutoRotationModule} = NativeModules;
// Retrieve the AutoRotationModule, or use a Proxy as a fallback
// const AutoRotationModule = NativeModules.AutoRotationModule
//   ? NativeModules.AutoRotationModule
//   : new Proxy(
//       {},
//       {
//         get() {
//           throw new Error(ERROR);
//         },
//       },
//     );

const autoRotationEventEmitter = new NativeEventEmitter(AutoRotationModule);

// Function to add an event listener for auto-rotation changes on Android
export const addAutoRotationChangeListener = listener => {
  // Only apply on Android platform
  if (Platform.OS !== 'android') {
    return () => {}; // Return an empty cleanup function for non-Android platforms
  }

  // Add the listener and return a cleanup function
  const eventSubscription = autoRotationEventEmitter.addListener(
    AUTO_ROTATION_CHANGE,
    () => listener(),
    {},
  );

  // Return a cleanup function to remove the event listener
  return () => {
    eventSubscription.remove();
  };
};
