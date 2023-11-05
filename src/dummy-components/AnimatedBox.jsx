import React, { useState,useRef,useEffect } from 'react';
import { View,  TouchableOpacity,Dimensions } from 'react-native';
import { Text } from '../components';
import Animated, { Easing, withTiming, useSharedValue, useAnimatedStyle,runOnJS } from 'react-native-reanimated';

const questions = [
  'Question 1',
  'Question 2',
  'Question 3',
  'Question 4',
  'Question 5',
  'Question 6',
  'Question 7',
  'Question 8',
  'Question 9',
  'Question 10',
  'Question 1',
  'Question 2',
  'Question 3',
  'Question 4',
  'Question 5',
  'Question 6',
  'Question 7',
  'Question 8',
  'Question 9',
  'Question 10','Question 1',
  'Question 2',
  'Question 3',
  'Question 4',
  'Question 5',
  'Question 6',
  'Question 7',
  'Question 8',
  'Question 9',
  'Question 10','Question 1',
  'Question 2',
  'Question 3',
  'Question 4',
  'Question 5',
  'Question 6',
  'Question 7',
  'Question 8',
  'Question 9',
  'Question 10','Question 1',
  'Question 2',
  'Question 3',
  'Question 4',
  'Question 5',
  'Question 6',
  'Question 7',
  'Question 8',
  'Question 9',
  'Question 10','Question 1',
  'Question 2',
  'Question 3',
  'Question 4',
  'Question 5',
  'Question 6',
  'Question 7',
  'Question 8',
  'Question 9',
  'Question 10','Question 1',
  'Question 2',
  'Question 3',
  'Question 4',
  'Question 5',
  'Question 6',
  'Question 7',
  'Question 8',
  'Question 9',
  'Question 10',
];
const screenWidth = Dimensions.get('window').width;
const QuestionScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const targetIndex = useRef(null);
  const delayTimeout = useRef(null); 
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(0);

  useEffect(() => {
    if (targetIndex.current !== null && currentIndex !== targetIndex.current) {
        delayTimeout.current = setTimeout(() => {  // add a delay here
          if (currentIndex < targetIndex.current) {
            animateToNext();
          } else {
            animateToPrevious();
          }
        }, 50); // delay of 500ms
      }
      return () => clearTimeout(delayTimeout.current);
  }, [currentIndex]);

  const goToNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
    //   animateOutToLeft(() => {
    //     setCurrentIndex(currentIndex + 1);
    //     animateInFromRight();
    //   });
      jumpToQuestion(currentIndex + 1)

    }
  };

  const goToPreviousQuestion = () => {
    if (currentIndex > 0) {
    //   animateOutToRight(() => {
    //     setCurrentIndex(currentIndex - 1);

    //     animateInFromLeft();
    //   });
      jumpToQuestion(currentIndex - 1)

    }
  };

  const animateToNext = (callback) => {
    animateOutToLeft(() => {
      setCurrentIndex((prev) => {
        if (prev < questions.length - 1) {
          return prev + 1;
        }
        return prev;
      });
      animateInFromRight(callback);
    });
  };

  const animateToPrevious = (callback) => {
    animateOutToRight(() => {
      setCurrentIndex((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
        return prev;
      });
      animateInFromLeft(callback);
    });
  };

  const jumpToQuestion = (index) => {
    if (index === currentIndex || index < 0 || index >= questions.length) return;

    targetIndex.current = index;
    if (currentIndex < targetIndex.current) {
      animateToNext();
    } else {
      animateToPrevious();
    }
  };

 
  const animateOutToLeft = (callback) => {
    'worklet';
    opacity.value = withTiming(0, { duration: 200, easing: Easing.ease }, () => runOnJS(callback)());
    translateX.value = withTiming(-screenWidth);
  };
  
  const animateOutToRight = (callback) => {
    'worklet';
    opacity.value = withTiming(0, { duration: 200, easing: Easing.ease }, () => runOnJS(callback)());
    translateX.value = withTiming(screenWidth);
  };
  
  const animateInFromRight = () => {
    'worklet';
    opacity.value = 0.5;
    translateX.value = 100;
    opacity.value = withTiming(1, { duration: 200, easing: Easing.ease });
    translateX.value = withTiming(0);
  };
  
  const animateInFromLeft = () => {
    'worklet';
    opacity.value = 0.5;
    translateX.value = -100;
    opacity.value = withTiming(1, { duration: 200, easing: Easing.ease });
    translateX.value = withTiming(0);
  };
  

  const animatedStyles = useAnimatedStyle(() => {
    return {
    //   opacity: opacity.value,
      transform: [{ translateX: translateX.value }],
    };
  });

 

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View style={[{ width: 300, height: 100, backgroundColor: 'lightgray', justifyContent: 'center', alignItems: 'center' }, animatedStyles]}>
        <Text>{questions[currentIndex]}</Text>
      </Animated.View>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <TouchableOpacity onPress={goToPreviousQuestion}>
          <Text style={{ marginRight: 20 }}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToNextQuestion}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuestionScreen;
