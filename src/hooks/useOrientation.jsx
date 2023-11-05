import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import Orientation from 'react-native-orientation-locker';
import {useDeviceInfo} from './useDeviceInfo';
import {addAutoRotationChangeListener} from '../native-modules';

export const OrientationContext = createContext();

export const OrientationProvider = ({children}) => {
  const [currentOrientation, setCurrentOrientation] = useState('PORTRAIT');
  const [previousOrientation, setPreviousOrientation] = useState(null);
  const [lockToLandscape, setLockToLandscape] = useState(false);
  const [autoRotation, setAutoRotation] = useState(false);
  const {isTablet} = useDeviceInfo();

  const toggleLockToLandScape = useCallback(flag => {
    setLockToLandscape(flag);
    // Immediately apply the orientation changes when toggleLockToLandScape is called
    manageOrientationLock(flag);
  }, []);

  // This function Sets the current orientation state based on detected changes.
  const handleOrientationChange = async orientation => {
    // Update the local state to reflect the new orientation
    setPreviousOrientation(currentOrientation);
    setCurrentOrientation(orientation);
  };

  // This function queries the system setting to determine if auto-rotation is enabled and
  const handleSystemAutoRotation = async () => {
    // Query the system setting for auto-rotation
    const systemAutoRotation = await isSystemAutoRotation();
    // Update the local state to enable or disable auto-rotation based on the system setting
    setAutoRotation(systemAutoRotation);
  };

  useEffect(() => {
    // Add a listener for the autoRotationSettingChanged event
    const subscription = addAutoRotationChangeListener(
      handleSystemAutoRotation,
    );

    // Add orientation change listener
    Orientation.addOrientationListener(handleOrientationChange);

    // Cleanup function
    return () => {
      // Remove listeners on unmount
      Orientation.removeOrientationListener(handleOrientationChange);
      subscription();
    };
  }, [handleSystemAutoRotation]);

  useEffect(() => {
    // Call the function to handle the system's auto-rotation settings
    handleSystemAutoRotation();

    // Call the orientation management function with updated dependency
    manageOrientationLock(lockToLandscape);

    // Cleanup logic for orientation lock
    return () => {
      if (!lockToLandscape) {
        Orientation.lockToPortrait();
        // Additional conditional logic based on the `isTablet` state
        if (!isTablet) {
          Orientation.unlockAllOrientations();
        }
      }
    };
  }, [lockToLandscape, isTablet, autoRotation]);

  // This function based on  system detects rotation lock
  const isSystemAutoRotation = async () => {
    try {
      // Assuming getAutoRotateState returns a promise
      const rotationLock = await new Promise((resolve, reject) => {
        Orientation.getAutoRotateState(
          result => {
            resolve(result);
          },
          error => {
            reject(error);
          },
        );
      });

      return rotationLock;
    } catch (error) {
      console.error('Failed to get auto-rotate state:', error);
      // Handle the error appropriately
      return false; // or however you want to handle this case
    }
  };

  const manageOrientationLock = shouldLockToLandscape => {
    if (!autoRotation) {
      Orientation.lockToPortrait();
      return;
    }
    if (isTablet) {
      manageOrientationLockTablet(shouldLockToLandscape);
    } else {
      manageOrientationLockMobile(shouldLockToLandscape);
    }
  };

  const manageOrientationLockTablet = shouldLockToLandscape => {
    // For tablets
    if (shouldLockToLandscape === true) {
      Orientation.lockToLandscape();
    } else if (shouldLockToLandscape === false) {
      Orientation.lockToPortrait();
      // Delay unlocking to ensure the orientation is set to portrait first
      setTimeout(() => {
        !!autoRotation && Orientation.unlockAllOrientations();
      }, 100);
    }
    // If shouldLockToLandscape is undefined, do not change the orientation lock state
  };

  const manageOrientationLockMobile = shouldLockToLandscape => {
    // For mobiles
    if (shouldLockToLandscape) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  };

  return (
    <OrientationContext.Provider
      value={{currentOrientation, previousOrientation, toggleLockToLandScape}}>
      {children}
    </OrientationContext.Provider>
  );
};

export const useOrientation = () => {
  const context = useContext(OrientationContext);
  if (!context) {
    throw new Error(
      'useOrientation must be used within an OrientationProvider',
    );
  }
  return context;
};

// ----------------------------Sample Use -----------------------------------------
// import { useOrientation } from './path-to-this-file';

// const MyComponent = () => {
//     const { currentOrientation, toggleLockToLandScape } = useOrientation();

//     return (
//         <>
//             <Text>Current orientation is: {currentOrientation}</Text>
//             <Button title="Toggle Lock" onPress={toggleLockToLandScape} />
//         </>
//     );
// };

// Orientation Scenarios Handled:

// 1. Default Orientation State: The default orientation is set to 'PORTRAIT'.

// 2. Orientation Locking: There is functionality to lock the orientation to landscape mode (lockToLandscape). When lockToLandscape is true, the device is locked to landscape orientation, otherwise, it defaults to portrait.

// 3. Auto Rotation: The code checks for system auto-rotation settings and enables or disables auto-rotation accordingly.

// 4. Device Specific Logic: The code contains specific logic for tablets versus mobile devices. For tablets, if lockToLandscape is false, it will lock to portrait and then, if auto-rotation is enabled, unlock all orientations after a delay. For mobile devices, it simply locks to landscape or portrait based on the lockToLandscape flag.

// 5. Orientation Listener: It listens for changes in device orientation and updates the currentOrientation state accordingly.

// 6. System Auto Rotation Listener: The code listens for changes to the system's auto-rotation setting and updates the autoRotation state accordingly.
