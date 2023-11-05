import React from 'react';
import {View, Button, StyleSheet, TouchableOpacity, Text} from 'react-native';
// import {} from '../components';
import useTimer from '../hooks/useTimer';
import useTimeConverter from '../hooks/useTimeConverter';

function TimerComponent() {
  const {
    timeInMilliseconds,
    isRunning,
    start,
    pause,
    resume,
    stop,
    restart,
    isPaused,
  } = useTimer(70000);

  const {hours, minutes, seconds, totalSeconds, totalMinutes, totalHours} =
    useTimeConverter(timeInMilliseconds);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.timerWrapper}>
          <Text style={[styles.buttonText, {fontSize: 30, fontWeight: 'bold'}]}>
            Parent Component
          </Text>
          <Text style={styles.buttonText}>
            Time : {hours}:{minutes}:{seconds}
          </Text>

          <Text style={styles.buttonText}>
            Actual Time : {totalHours}:{totalMinutes}:{totalSeconds}
          </Text>

          <Text style={styles.buttonText}>
            Actual Miliseconds : {timeInMilliseconds}
          </Text>

          {!isRunning && !isPaused ? (
            <TouchableOpacity style={styles.button} onPress={start}>
              <Text style={styles.buttonText}>Start ▶️</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={stop}>
              <Text style={styles.buttonText}>Stop ⏹️</Text>
            </TouchableOpacity>
          )}

          {/* <TouchableOpacity style={styles.button} onPress={restart}>
              <Text style={styles.buttonText}>Restart</Text>
            </TouchableOpacity> */}

          {isRunning && !isPaused && (
            <TouchableOpacity style={styles.button} onPress={pause}>
              <Text style={styles.buttonText}>Pause ⏸️</Text>
            </TouchableOpacity>
          )}

          {isPaused && (
            <TouchableOpacity style={styles.button} onPress={resume}>
              <Text style={styles.buttonText}>Resume 🔄</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View
        style={{
          width: '90%',
          height: 2,
          backgroundColor: 'grey',
          alignSelf: 'center',
        }}></View>
      <ChildComponent />
    </>
  );
}

function ChildComponent() {
  const {
    timeInMilliseconds,
    isRunning,
    start,
    pause,
    resume,
    stop,
    restart,
    isPaused,
  } = useTimer(0, true);

  const {hours, minutes, seconds, totalSeconds, totalMinutes, totalHours} =
    useTimeConverter(timeInMilliseconds);

  return (
    <View style={styles.container}>
      <View style={styles.timerWrapper}>
        <Text style={[styles.buttonText, {fontSize: 30, fontWeight: 'bold'}]}>
          Child Component
        </Text>
        <Text style={styles.buttonText}>
          Time : {hours}:{minutes}:{seconds}
        </Text>

        <Text style={styles.buttonText}>
          Actual Time : {totalHours}:{totalMinutes}:{totalSeconds}
        </Text>

        <Text style={styles.buttonText}>
            Actual Miliseconds : {timeInMilliseconds}
          </Text>
        {!isRunning && !isPaused ? (
          <TouchableOpacity style={styles.button} onPress={start}>
            <Text style={styles.buttonText}>Start ▶️</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={stop}>
            <Text style={styles.buttonText}>Stop ⏹️</Text>
          </TouchableOpacity>
        )}

        {/* <TouchableOpacity style={styles.button} onPress={restart}>
          <Text style={styles.buttonText}>Restart</Text>
        </TouchableOpacity> */}

        {isRunning && !isPaused && (
          <TouchableOpacity style={styles.button} onPress={pause}>
            <Text style={styles.buttonText}>Pause ⏸️</Text>
          </TouchableOpacity>
        )}

        {isPaused && (
          <TouchableOpacity style={styles.button} onPress={resume}>
            <Text style={styles.buttonText}>Resume 🔄</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerWrapper: {
    flex: 1,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    width: 200,
    height: 40,
    backgroundColor: 'skyblue', // Optional, you can customize the background color
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5, // Adding a margin for spacing between buttons
  },
  buttonText: {
    fontSize: 20, // Adjust as needed
    color: 'grey',
  },
});

export default TimerComponent;

// I've added emojis for Play (▶️), Pause (⏸️), Stop (⏹️), and Restart (🔄) to the
