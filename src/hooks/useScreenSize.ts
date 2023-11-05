import {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
//@ts-ignore
const scaleSizesForScreen = (screenSize, sizes) => {
  let scaleFactor = 1; // Default for an unrecognized or standard size

  if (screenSize.isSmall) {
    scaleFactor = 0.8; // 80% of original size for small screens
  } else if (screenSize.isMedium) {
    scaleFactor = 0.9; // 90% for medium
  } else if (screenSize.isLarge) {
    scaleFactor = 1.0; // 100% for large screens
  } else if (screenSize.isExtraLarge) {
    scaleFactor = 1.1; // 110% for extra large screens
  } else if (screenSize.isXXL) {
    scaleFactor = 1.2; // 120% for XXL screens
  }

  // Return scaled sizes
  return Object.keys(sizes).reduce((scaledSizes, key) => {
    //@ts-ignore
    scaledSizes[key] = sizes[key] * scaleFactor;
    return scaledSizes;
  }, {});
};


//@ts-ignore
export const useResponsiveSizes = baseSizes => {
  const screenSize = useScreenSize();
  return scaleSizesForScreen(screenSize, baseSizes);
};

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(() => getScreenSize());

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
    };
    const subscription = Dimensions.addEventListener('change', handleResize);
    return () => subscription?.remove();
  }, []);

  return screenSize;
};

const getScreenSize = () => {
  const width = Dimensions.get('window').width;

  const isSmall = width >= 576 && width <= 767;
  const isMedium = width >= 768 && width <= 991;
  const isLarge = width >= 992 && width <= 1199;
  const isExtraLarge = width >= 1200 && width <= 1600;
  const isXXL = width >= 1601;

  return {isSmall, isMedium, isLarge, isExtraLarge, isXXL};
};

// ----------------------------Sample Use -----------------------------------------
// import { useScreenSize } from './path-to-this-file';

// const MyComponent = () => {
//   const {isSmall, isMedium, isLarge, isExtraLarge, isXXL} = useScreenSize();

//   return (
//     <>
//       <Text>isSmall: {isSmall ? 'True' : 'False'}</Text>
//       <Text>isMedium: {isMedium ? 'True' : 'False'}</Text>
//       <Text>isLarge: {isLarge ? 'True' : 'False'}</Text>
//       <Text>isExtraLarge: {isExtraLarge ? 'True' : 'False'}</Text>
//       <Text>isXXL: {isXXL ? 'True' : 'False'}</Text>
//     </>
//   );
// };
