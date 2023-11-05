import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('screen');
import RenderHTMLWrapper from '../utils-cmp/RenderHTMLWrapper';

const QuestionComponent = ({
  totalQuestions = 10,
  currentQuestion = 5,
  onSelectQuestion,
  mode = 'normal',
  ...rest
}) => {
  const {options, correctAnswer, question, onAnswer, answer, index,timer} = rest;

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const isCorrect = option => option === correctAnswer;
  const isSelected = option => option === selectedAnswer;

  const handleSelection = option => {
    if (mode === 'normal') {
      setSelectedAnswer(option);
      onAnswer(option);
    }
  };

  const getOptionColor = option => {
    if (mode === 'review') {
      if (isCorrect(option)) return 'green';
      if (isSelected(option) && !isCorrect(option)) return 'red';
    }
    return isSelected(option) ? 'lightgray' : 'white';
  };

  const renderIcon = option => {
    if (mode === 'review') {
      if (isCorrect(option)) return '✓';
      if (isSelected(option) && !isCorrect(option)) return '✗';
    }
    return '';
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
        <Text style={styles.questionLabel}>Question {index + 1}</Text>
        <Text style={styles.timer}>{timer}</Text>
      </View>

      {/* <View style={styles.dotsContainer}>
                {Array.from({ length: totalQuestions }).map((_, index) => (
                    <View 
                        key={index} 
                        style={styles.dot(currentQuestion === index + 1)} 
                    />
                ))}
            </View> */}

      <View
        style={{
          flex:1,
          padding: 20,
          backgroundColor: 'white',
          borderRadius: 10,
          elevation: 5,
        }}>
        <Text style={styles.questionText}>{question}</Text>
        {/* <RenderHTMLWrapper htmlContent={question}/> */}

        {options?.map((option, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.option, {backgroundColor: getOptionColor(i)}]}
            onPress={() => handleSelection(i)}>
            <Text style={styles.optionText}>{option}</Text>
            <Text style={styles.icon}>{renderIcon(i)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* <TouchableOpacity style={styles.finishBtn}>
                <Text style={styles.finishText}>Finish</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.exitBtn}>
                <Text style={styles.exitText}>Exit</Text>
            </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH - 40,
    // padding: 10,
    // backgroundColor: 'grey',
  },
  questionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  timer: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'flex-end',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  dot: isActive => ({
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: isActive ? 'blue' : '#ccc',
    marginHorizontal: 5,
  }),
  questionText: {
    marginVertical: 10,
    fontSize: 16,
    color: 'black',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    paddingHorizontal: 15,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  optionText: {
    fontSize: 14,
    color: 'black',
  },
  tick: {
    fontSize: 14,
    color: 'white',
  },
  nextBtn: {
    marginTop: 30,
    padding: 15,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  nextText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  exitBtn: {
    marginTop: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  exitText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
  },
  finishBtn: {
    marginTop: 30,
    padding: 15,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  finishText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default QuestionComponent;
