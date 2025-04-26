import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const getResultMessage = (score) => {
  if (score >= 4) {
    return {
      title: "Sports Master! 🏆",
      description: "Wow! You're a true sports encyclopedia! Your knowledge is impressive!",
      icon: "emoji-events",
      color: "#FFD700",
    };
  } else if (score >= 2) {
    return {
      title: "Sports Enthusiast! 🎯",
      description: "Great job! You know your sports well. Keep learning and you'll be a master soon!",
      icon: "stars",
      color: "#4CAF50",
    };
  } else {
    return {
      title: "Sports Rookie! 🌱",
      description: "You're just starting your sports journey. Keep exploring and learning!",
      icon: "school",
      color: "#2196F3",
    };
  }
};

const QuizResults = ({ route, navigation }) => {
  const { score } = route.params;
  const result = getResultMessage(score);

  const handleRetakeQuiz = () => {
    navigation.navigate('Main', {
      screen: 'Quiz',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.scoreCard}>
          <Icon name={result.icon} size={80} color={result.color} />
          <Text style={styles.scoreTitle}>{result.title}</Text>
          <Text style={styles.scoreText}>You got {score} out of 5 correct!</Text>
        </View>

        <View style={styles.messageCard}>
          <Text style={styles.messageText}>{result.description}</Text>
        </View>

        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Want to learn more?</Text>
          <View style={styles.tipsContainer}>
            <View style={styles.tipItem}>
              <Icon name="sports-soccer" size={30} color="#4CAF50" />
              <Text style={styles.tipText}>Watch live sports</Text>
            </View>
            <View style={styles.tipItem}>
              <Icon name="menu-book" size={30} color="#4CAF50" />
              <Text style={styles.tipText}>Read sports blogs</Text>
            </View>
            <View style={styles.tipItem}>
              <Icon name="group" size={30} color="#4CAF50" />
              <Text style={styles.tipText}>Join sports communities</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.retakeButton}
          onPress={handleRetakeQuiz}
        >
          <Text style={styles.retakeButtonText}>Try Again</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  scoreCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  scoreTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
  },
  scoreText: {
    fontSize: 18,
    color: '#666',
  },
  messageCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  messageText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
  },
  tipsCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  tipsContainer: {
    gap: 15,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
  },
  tipText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  retakeButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  retakeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuizResults;