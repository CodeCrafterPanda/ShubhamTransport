import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import {questionsData} from './examData';
import QuestionComponent from '../dummy-components/Question';
import {Button} from '../components';
import createNavigationOptions from '../hooks/useCreateScreenOptions';
import {useNavigation} from '@react-navigation/native';
import useTimer from '../hooks/useTimer';
import useTimeConverter from '../hooks/useTimeConverter';
const TOTAL_QUESTIONS = questionsData.length;
const TOTAL_DURATION = TOTAL_QUESTIONS * 60 * 1000;
const {width: SCREEN_WIDTH} = Dimensions.get('screen');

// Timer Component
const TimerDisplay = ({timer}) => (
  <Text style={styles.timer}>Remaining time: {timer} seconds</Text>
);

// Question Display
const QuestionDisplay = ({question, onAnswer, mode, timer}) => {
  return (
    // <View>
    //   <Text style={styles.question}>{question?.question}</Text>
    //   {question?.options.map((option, index) => (
    //     <Button key={index} title={option} onPress={() => onAnswer(option)} />
    //   ))}
    // </View>
    <QuestionComponent
      {...question}
      onAnswer={onAnswer}
      mode={mode}
      timer={timer}
    />
  );
};

// Question Palette
const QuestionPalette = ({questions, onSelect, onResume}) => {
  const getBorderStyle = status => {
    switch (status) {
      case 'attempted':
        return styles.attempted;
      case 'not_visited':
        return styles.notVisited;
      case 'skipped':
        return styles.skipped;
      case 'attempted_review':
        return styles.attemptedReview;
      case 'not_attempted_review':
        return styles.notAttemptedReview;
      default:
        return {};
    }
  };
  return (
    <>
      <View style={styles.paletteContainer}>
        {questions.map((question, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.questionElement, getBorderStyle(question.status)]}
            onPress={() => onSelect(index)}>
            <Text style={{color: 'black', fontSize: 12}}>{index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.touchableButton} onPress={onResume}>
          <Text style={styles.buttonText}>Resume Exam</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

// Control Buttons
const ControlButtons = ({
  onPrev,
  onNext,
  onSkip,
  onMarkReview,
  onPause,
  examMode,
  toggleExamMode,
  submitExam,
}) => (
  <>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.touchableButton} onPress={onPrev}>
        <Text style={styles.buttonText}>Previous</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchableButton} onPress={onNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchableButton} onPress={onSkip}>
        <Text style={styles.buttonText}>Skip</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.touchableButton} onPress={onMarkReview}>
        <Text style={styles.buttonText}>Mark for Review</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchableButton} onPress={onPause}>
        <Text style={styles.buttonText}>Pause</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.touchableButton} onPress={toggleExamMode}>
        <Text style={styles.buttonText}>
          {examMode === 'normal' ? 'Review' : 'Exam'} Mode
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchableButton} onPress={submitExam}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  </>
);

// Main Exam Component
const ExamComponent = props => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(TOTAL_DURATION);
  const [intervalId, setIntervalId] = useState(null);
  const [paused, setPaused] = useState(false);
  const [examEnded, setExamEnded] = useState(false);
  const [examMode, setExamMode] = useState('normal');
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const {
    timeInMilliseconds,
    isRunning,
    start,
    pause,
    resume,
    stop,
    restart,
    isPaused,
  } = useTimer(TOTAL_DURATION);

  const {hours, minutes, seconds, totalSeconds, totalMinutes, totalHours} =
    useTimeConverter(timeInMilliseconds);

  useEffect(() => {
    initializeQuestions();
  }, [props]);

  // useEffect(() => {
  //   const navigationOptions = createNavigationOptions({
  //     headerTitle: `${hours}:${minutes}:${seconds}`,
  //     headerRight: () => (
  //       <TouchableOpacity onPress={()=>console.log(x)}>
  //         {/* Your custom headerRight content */}
  //         <Text>X</Text>
  //       </TouchableOpacity>
  //     ),
  //   })(props);

  //   // Set the navigation options for this screen
  //   navigation.setOptions({
  //     ...navigationOptions,
  //   });
  // }, [seconds,TOTAL_DURATION]);

  const initializeQuestions = () => {
    const initialQuestions = questionsData.map((data, i) => ({
      ...data,
      index: i,
      question: data.question,
      options: data.answer,
      status: 'not_visited',
      answer: null,
      correctAnswer: data.correctAnswerIndex,
    }));
    setQuestions(initialQuestions);
    start();
  };

  // let intervalId = null;

  const updateTimer = () => {
    if (!paused && timer > 0) {
      setTimer(prevTimer => prevTimer - 1);
    } else if (timer <= 0) {
      // endExam();
    }
  };

  const pauseExam = () => {
    setPaused(true);
    pause();
  };

  const resumeExam = () => {
    setPaused(false);
    resume();
  };

  const displayQuestion = index => {
    setCurrentQuestionIndex(index);
  };

  const nextQuestion = () => {
    let nextIndex = currentQuestionIndex + 1;
    if (nextIndex <= TOTAL_QUESTIONS - 1) {
      setCurrentQuestionIndex(nextIndex);
      flatListRef.current.scrollToIndex({index: nextIndex});
    }
  };

  const previousQuestion = () => {
    let prevIndex = currentQuestionIndex - 1;
    if (prevIndex >= 0) {
      setCurrentQuestionIndex(prevIndex);
      flatListRef.current.scrollToIndex({index: prevIndex});
    }
  };

  // Answer a question
  const answerQuestion = option => {
    setQuestions(prevQuestions => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[currentQuestionIndex].answer = option;
      updatedQuestions[currentQuestionIndex].status = 'attempted';
      return updatedQuestions;
    });
  };

  // Skip a question
  const skipQuestion = () => {
    setQuestions(prevQuestions => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[currentQuestionIndex].status = 'skipped';
      return updatedQuestions;
    });
    nextQuestion();
  };

  // Mark a question for review
  const markForReview = () => {
    setQuestions(prevQuestions => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[currentQuestionIndex].status =
        updatedQuestions[currentQuestionIndex].status === 'attempted'
          ? 'attempted_review'
          : 'not_attempted_review';
      return updatedQuestions;
    });
  };

  const toggleExamMode = () => {
    examMode !== 'review' ? setExamMode('review') : setExamMode('normal');
  };

  const submitExam = () => {
    stop();
  };

  const restartExam = () => {
    if (!isRunning && !isPaused) {
      initializeQuestions();
      restart();
    }
  };

  // Evaluate answers
  const evaluateAnswers = () => {
    let correctAnswers = 0;

    questions.forEach(question => {
      if (
        question.status === 'attempted' ||
        question.status === 'attempted_review'
      ) {
        // For the sake of this example, we are assuming all attempted answers are correct.
        correctAnswers++;
      }
    });

    console.log(`Exam ended. Correct Answers: ${correctAnswers}`);
    setExamEnded(true);
  };

  if (paused) {
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 16,
            color: 'black',
          }}>
          {`${hours}:${minutes}:${seconds}`}
        </Text>
        <QuestionPalette
          questions={questions}
          onSelect={displayQuestion}
          onResume={resumeExam}
        />
      </View>
    );
  }

  if (examEnded) {
    return (
      <View style={styles.container}>
        <Text>Exam Ended!</Text>
      </View>
    );
  }

  const handleScrollToIndexFailed = info => {
    const wait = new Promise(resolve => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef.current.scrollToIndex({index: info.index, animated: true});
    });
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity>
        <Text
          style={{
            fontSize: 16,
            color: 'black',
          }}
          onPress={restartExam}>
          {`${hours}:${minutes}:${seconds}`}
        </Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        data={questions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <QuestionDisplay
            question={item}
            onAnswer={answerQuestion}
            mode={examMode}
            timer={``}
          />
        )}
        getItemLayout={(data, index) => ({
          length: SCREEN_WIDTH - 40,
          offset: (SCREEN_WIDTH - 40) * index,
          index,
        })}
        // onScroll={event => {
        //   const newIndex = Math.round(
        //     event.nativeEvent.contentOffset.x / SCREEN_WIDTH,
        //   );
        //   setCurrentQuestionIndex(newIndex);
        // }}
        onScrollToIndexFailed={handleScrollToIndexFailed}
        scrollEventThrottle={16}
        initialNumToRender={1}
        maxToRenderPerBatch={5}
        windowSize={5}
        scrollEnabled={false}
      />

      <ControlButtons
        onPrev={previousQuestion}
        onNext={nextQuestion}
        onSkip={skipQuestion}
        onMarkReview={markForReview}
        onPause={pauseExam}
        examMode={examMode}
        toggleExamMode={toggleExamMode}
        submitExam={submitExam}
      />
    </ScrollView>
  );
};

// Styles (Unchanged)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timer: {
    fontSize: 18,
    marginBottom: 20,
    color: 'black',
  },
  question: {
    fontSize: 24,
    marginBottom: 20,
    color: 'skyblue',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  paletteContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  questionElement: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2, // To space out the questions a bit
  },
  attempted: {
    borderWidth: 2,
    borderColor: 'blue',
  },
  notVisited: {
    borderWidth: 2,
    borderColor: 'grey',
  },
  skipped: {
    borderWidth: 2,
    borderColor: 'orange',
    borderStyle: 'dotted',
  },
  attemptedReview: {
    borderWidth: 2,
    borderColor: 'blue',
    borderStyle: 'dotted',
  },
  notAttemptedReview: {
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'dotted',
  },

  touchableButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    padding: 10,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ExamComponent;
