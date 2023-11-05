import React, {ReactElement, useRef, useState} from 'react';
import {
  Animated,
  Button,
  Dimensions,
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import NexenPlayer, {
  LayoutMode,
  NexenPlayerRef,
  NexenConfig,
  NexenSource,
  PlayListItem,
  PlayList,
} from 'react-native-nexen-player';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Block} from '../components';
import {DraggableWrapper, ImageWrapper, ZoomWrapper} from '../utils-cmp';
// import Orientation, { OrientationType } from 'react-native-orientation-locker';
import {useNavigation} from '@react-navigation/native';
import {IconSingle} from './assets/icons';
import {getData} from './data';
const {width} = Dimensions.get('screen');

export default function App() {
  // Notes Configuration -------------------------------------------
  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;
  const [notesFullscreen, setNotesFullscreen] = useState(false);
  const [notesVisible, setNotesVisible] = useState(false);
  // Animated values
  const widthAnim = useState(new Animated.Value(screenWidth))[0];
  const heightAnim = useState(new Animated.Value(200))[0];
  const topAnim = useState(new Animated.Value(210))[0];

  const notesHeightAnim = useState(new Animated.Value(screenHeight - 250))[0];
  const notesTopAnim = useState(new Animated.Value(200))[0];

  const draggableRef = useRef();

  const COLUMNS = 3;
  const ITEM_SIZE = width / 3;
  const navigation = useNavigation();
  const edgeinsets = useSafeAreaInsets();

  const playerRef = React.useRef();
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [playlist, setPlaylist] = React.useState();

  // const [source] = React.useState({
  //   // source: {
  //   //   uri: 'https://bitmovin-a.akamaihd.net/content/sintel/sintel.mpd',
  //   // },
  //   source: require('./assets/videos/Street_Fighter_V_Stop_Motion.mp4'),

  //   poster: 'https://img.youtube.com/vi/KrmxD8didgQ/0.jpg',
  //   title: "Ryu's Hurricane Kick and Hadoken",
  // });

  const [source] = React.useState(getData()[0].itemSource);

  const [config, setConfig] = React.useState({
    posterResizeMode: 'cover',
    layoutMode: 'advanced',
    autoPlay: true,
  });

  // Function to toggle fullscreen and adjust animated values
  const toggleNotesFullscreen = () => {
    const isNFullScreen = !notesFullscreen; // Toggle the fullscreen state

    setNotesFullscreen(isNFullScreen);

    !isNFullScreen && draggableRef.current.resetPosition();

    const commonAnimationProps = {
      duration: 200,
      useNativeDriver: false,
    };

    // Define animation values based on fullscreen state
    const widthValue = isNFullScreen ? screenWidth / 2 : screenWidth;
    const heightValue = isNFullScreen ? 100 : 200;
    const topValue = isNFullScreen ? 10 : 210;
    const notesHeightValue = isNFullScreen
      ? screenHeight - 250
      : screenHeight - 50;
    const notesTopValue = isNFullScreen ? 0 : 200;

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

  // Video Configuration ---------------------------------

  const hideTabBar = () => {
    navigation.setOptions({
      tabBarStyle: {display: 'none'},
      headerShown: false,
    });
  };
  const showTabBar = () => {
    navigation.setOptions({
      tabBarStyle: {display: 'flex'},
      headerShown: true,
    });
  };

  const updateLayoutMode = (mode: LayoutMode) => {
    setConfig(prevState => {
      return {
        ...prevState,
        layoutMode: mode,
      };
    });
  };

  const onModePress = () => {
    if (config.layoutMode === 'basic') {
      updateLayoutMode('intermediate');
    } else if (config.layoutMode === 'intermediate') {
      updateLayoutMode('advanced');
    } else {
      updateLayoutMode('basic');
    }
  };

  const onFullScreenModeUpdate = async (fullScreen: boolean) => {
    // !!notesVisible && setNotesVisible(false);
    // !!notesFullscreen && toggleNotesFullscreen();
    console.log(`Player: onFullScreenModeUpdate:${fullScreen}`);
    if (fullScreen) {
      hideTabBar();
      // Orientation.lockToLandscape();
    } else {
      showTabBar();
      // Orientation.lockToPortrait();
    }
    setIsFullScreen(fullScreen);
    
  };

  const onBackPressed = () => {};

  const onPlay = () => {
    console.log(`Player: onPlay`);
    // setPaused(false);
  };

  const onPaused = () => {
    console.log(`Player: onPaused`);
    // setPaused(true);
  };

  const onSkipNext = (index: number) => {
    updateCurrentIndex(index);
  };

  const onSkipBack = (index: number) => {
    updateCurrentIndex(index);
  };

  const onPlaylistSet = () => {
    if (playlist) {
      setPlaylist([]);
    } else {
      setPlaylist({
        items: getData(),
        currentIndex: 4,
      });
    }
  };

  const updateCurrentIndex = (index: number) => {
    setPlaylist(prevState => {
      return {
        ...prevState,
        currentIndex: index,
      };
    });
  };

  const renderItem = ({
    item,
    index,
  }: ListRenderItemInfo<PlayListItem>): ReactElement<any, any> => {
    const onItemPress = () => {
      console.log(
        `onItemPress: currentIndex: ${playlist?.currentIndex} index: ${index}`,
      );
      if (index !== playlist?.currentIndex) {
        updateCurrentIndex(index);
      }
    };
    const posterUri = {uri: item.itemSource.poster};

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.item, {width: ITEM_SIZE, height: ITEM_SIZE}]}
        onPress={onItemPress}>
        <Image
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#000',
          }}
          source={posterUri}
        />
        {index !== playlist?.currentIndex && (
          <View style={styles.iconContainer}>
            <IconSingle size={50} color={'rgba(255,255,255,0.3)'} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // You can use a default value or 'undefined'
  const viewStyle = isFullScreen
    ? {
        position: 'absolute',
        width: screenWidth,
        height: screenHeight,
        top: 0,
        left: 0,
        zIndex: 9999,
      }
    : {position: 'relative'};

  return (
    <>
      <Block flex={1}>
        <DraggableWrapper
          initialOffsetX={0}
          initialOffsetY={0}
          ref={ref => (draggableRef.current = ref)}
          shouldStartDrag={notesFullscreen}>
          <Animated.View
            style={{
              height: heightAnim,
              width: widthAnim,
              ...(isFullScreen && viewStyle),
            }}>
            <NexenPlayer
              ref={playerRef}
              style={[styles.player, {widh:notesFullscreen?screenWidth:screenWidth/2,height: notesFullscreen ? 100 : 200}]}
              source={source}
              config={config}
              playList={playlist}
              insets={edgeinsets}
              theme={{
                // colors: {
                //   primaryIconColor: fullScreen ? 'white' : 'blue',
                // },
                fonts: {
                  primaryFont: 'Montserrat-Medium',
                  secondaryFont: 'Montserrat-Regular',
                },
              }}
              onPlay={onPlay}
              onPause={onPaused}
              onSkipNext={onSkipNext}
              onSkipBack={onSkipBack}
              onBackPress={onBackPressed}
              onFullScreenModeUpdate={onFullScreenModeUpdate}
            />
          </Animated.View>
        </DraggableWrapper>

        <Animated.View
          style={{
            width: screenWidth,
            height: notesHeightAnim,
            top: notesTopAnim,
          }}>
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
                style={{
                  width: '100%',
                  height: screenHeight - (notesFullscreen ? 50 : 250),
                  position: notesFullscreen ? 'relative' : 'absolute',
                }}
                minZoom={1}
                maxZoom={5}
                zoomLevels={2}>
                <ImageWrapper
                  src={'https://d27vkvqvvwyzde.cloudfront.net/Test_Image.JPEG'}
                />
              </ZoomWrapper>
            </>
          ) : (
            <>
              {!isFullScreen && (
                <TouchableOpacity
                  style={[
                    styles.btn,
                    {
                      margin: 10,
                    },
                  ]}
                  onPress={() => {
                    if (isFullScreen) {
                      setIsFullScreen(false);
                      onFullScreenModeUpdate(false);
                    }
                    setNotesVisible(true);
                  }}>
                  <MIcon
                    name="file-document-multiple"
                    size={15}
                    color="white"
                  />
                </TouchableOpacity>
              )}
            </>
          )}
        </Animated.View>
      </Block>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  player: {
    width: '100%',
    height: 260,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    zIndex: 1,
  },
  button: {
    flex: 1,
  },
  item: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  icon: {
    position: 'absolute',
  },
});
