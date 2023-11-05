import React, { useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Block } from '../components';
import { DraggableWrapper, ImageWrapper, ZoomWrapper } from '../utils-cmp';


export default function App() {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const [notesFullscreen, setNotesFullscreen] = useState(false);
  const [notesVisible, setNotesVisible] = useState(false);
  // Animated values
  const widthAnim = useState(new Animated.Value(screenWidth))[0];
  const heightAnim = useState(new Animated.Value(200))[0];
  const topAnim = useState(new Animated.Value(210))[0];

  const notesHeightAnim = useState(new Animated.Value(screenHeight - 250))[0];
  const notesTopAnim = useState(new Animated.Value(200))[0];

  const draggableRef = useRef();

  // Function to toggle fullscreen and adjust animated values
  const toggleNotesFullscreen = () => {
    const isFullScreen = !notesFullscreen; // Toggle the fullscreen state

    setNotesFullscreen(isFullScreen);

    !isFullScreen && draggableRef.current.resetPosition();

    const commonAnimationProps = {
      duration: 200,
      useNativeDriver: false,
    };

    // Define animation values based on fullscreen state
    const widthValue = isFullScreen ? screenWidth / 2 : screenWidth;
    const heightValue = isFullScreen ? 100 : 200;
    const topValue = isFullScreen ? 10 : 210;
    const notesHeightValue = isFullScreen
      ? screenHeight - 250
      : screenHeight - 50;
    const notesTopValue = isFullScreen ? 0 : 200;

    // Animate all values in parallel
    Animated.parallel([
      Animated.timing(widthAnim, {
        toValue: widthValue,
        ...commonAnimationProps,
      }),
      Animated.timing(heightAnim, {
        toValue: heightValue,
        ...commonAnimationProps,
      }),
      Animated.timing(topAnim, {toValue: topValue, ...commonAnimationProps}),
      Animated.timing(notesHeightAnim, {
        toValue: notesHeightValue,
        ...commonAnimationProps,
      }),
      Animated.timing(notesTopAnim, {
        toValue: notesTopValue,
        ...commonAnimationProps,
      }),
    ]).start();
  };

  const zoomContainerAnimStyle = {
    width: screenWidth,
    height: notesHeightAnim,
    top: notesTopAnim,
  };

  const dragChildrenAnimStyle = {
    height: heightAnim,
    width: widthAnim,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const zoomElementStyle = {
    width: '100%',
    height: screenHeight - (notesFullscreen ? 50 : 250),
    position: notesFullscreen ? 'relative' : 'absolute',
  };

  return (
    <Block flex={1}>
      <DraggableWrapper
        initialOffsetX={0}
        initialOffsetY={0}
        ref={ref => (draggableRef.current = ref)}
        shouldStartDrag={notesFullscreen}>
        <Animated.View style={dragChildrenAnimStyle}>
          {notesFullscreen ? (
            <MIcon name="pause" size={25} color="white" />
          ) : (
            <MIcon name="play" size={60} color="white" />
          )}
        </Animated.View>
      </DraggableWrapper>

      <Animated.View style={zoomContainerAnimStyle}>
        {notesVisible ? (
          <>
            <Block
              row
              top={10}
              z={100}
              position="absolute"
              align="center"
              justify="space-between"
              width={screenWidth}
              paddingHorizontal={10}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  setNotesVisible(false);
                  !!notesFullscreen && toggleNotesFullscreen();
                }}>
                <MIcon name="close" size={25} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btn}
                onPress={toggleNotesFullscreen}>
                {notesFullscreen ? (
                  <MIcon name="arrow-collapse" size={25} color="white" />
                ) : (
                  <MIcon name="arrow-expand" size={25} color="white" />
                )}
              </TouchableOpacity>
            </Block>
            <ZoomWrapper
              style={zoomElementStyle}
              minZoom={1}
              maxZoom={5}
              zoomLevels={2}>
              <ImageWrapper
                src={'https://d27vkvqvvwyzde.cloudfront.net/Test_Image.JPEG'}
              />
            </ZoomWrapper>
          </>
        ) : (
          <TouchableOpacity
            style={[
              styles.btn,
              {
                margin: 10,
              },
            ]}
            onPress={() => setNotesVisible(true)}>
            <MIcon name="file-document-multiple" size={15} color="white" />
          </TouchableOpacity>
        )}
      </Animated.View>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  btn: {
    height: 30,
    width: 30,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});
