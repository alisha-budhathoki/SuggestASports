import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const questions = [
  {
    id: 1,
    question: "Which sport is known as 'The Beautiful Game'?",
    options: [
      { id: 'a', text: "Basketball", isCorrect: false },
      { id: 'b', text: "Soccer", isCorrect: true },
      { id: 'c', text: "Tennis", isCorrect: false },
      { id: 'd', text: "Cricket", isCorrect: false },
    ],
    funFact: "Soccer is called 'The Beautiful Game' because of its fluid, artistic nature and global appeal!",
  },
  {
    id: 2,
    question: "In which sport would you perform a 'slam dunk'?",
    options: [
      { id: 'a', text: "Volleyball", isCorrect: false },
      { id: 'b', text: "Basketball", isCorrect: true },
      { id: 'c', text: "Tennis", isCorrect: false },
      { id: 'd', text: "Swimming", isCorrect: false },
    ],
    funFact: "The first slam dunk was performed by Joe Fortenberry in 1936!",
  },
  {
    id: 3,
    question: "Which sport uses a 'shuttlecock'?",
    options: [
      { id: 'a', text: "Badminton", isCorrect: true },
      { id: 'b', text: "Tennis", isCorrect: false },
      { id: 'c', text: "Squash", isCorrect: false },
      { id: 'd', text: "Table Tennis", isCorrect: false },
    ],
    funFact: "A shuttlecock can reach speeds of up to 200 mph in professional badminton!",
  },
  {
    id: 4,
    question: "What is the maximum number of players on a volleyball court?",
    options: [
      { id: 'a', text: "4 players", isCorrect: false },
      { id: 'b', text: "6 players", isCorrect: true },
      { id: 'c', text: "8 players", isCorrect: false },
      { id: 'd', text: "10 players", isCorrect: false },
    ],
    funFact: "Volleyball was invented in 1895 by William G. Morgan!",
  },
  {
    id: 5,
    question: "Which sport is played on the largest field?",
    options: [
      { id: 'a', text: "Soccer", isCorrect: false },
      { id: 'b', text: "Cricket", isCorrect: true },
      { id: 'c', text: "Rugby", isCorrect: false },
      { id: 'd', text: "American Football", isCorrect: false },
    ],
    funFact: "A cricket field can be up to 150 meters in diameter!",
  },
];

const QuizQuestions = ({ navigation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFunFact, setShowFunFact] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [scaleAnim] = useState(new Animated.Value(1));

  const handleAnswer = (option) => {
    // Animate the answer selection
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    if (option.isCorrect) {
      setScore(score + 1);
    }

    // Show fun fact
    setShowFunFact(true);

    // Move to next question after delay
    setTimeout(() => {
      setShowFunFact(false);
      if (currentQuestion < questions.length - 1) {
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
        setCurrentQuestion(currentQuestion + 1);
      } else {
        navigation.navigate('QuizResults', { score });
      }
    }, 2000);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <Text style={styles.questionNumber}>
          Question {currentQuestion + 1} of {questions.length}
        </Text>
        <Text style={styles.question}>{questions[currentQuestion].question}</Text>

        <View style={styles.optionsContainer}>
          {questions[currentQuestion].options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionButton,
                showFunFact && option.isCorrect && styles.correctOption,
                showFunFact && !option.isCorrect && styles.incorrectOption,
              ]}
              onPress={() => handleAnswer(option)}
              disabled={showFunFact}
            >
              <Text style={styles.optionText}>{option.text}</Text>
              {showFunFact && option.isCorrect && (
                <Icon name="check-circle" size={24} color="#4CAF50" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {showFunFact && (
          <View style={styles.funFactContainer}>
            <Icon name="lightbulb" size={24} color="#FFD700" />
            <Text style={styles.funFactText}>
              {questions[currentQuestion].funFact}
            </Text>
          </View>
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  progressContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  scoreText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  questionNumber: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  optionsContainer: {
    gap: 15,
  },
  optionButton: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  correctOption: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  incorrectOption: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
    borderWidth: 2,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  funFactContainer: {
    backgroundColor: '#FFFDE7',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  funFactText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    flex: 1,
  },
});

export default QuizQuestions;