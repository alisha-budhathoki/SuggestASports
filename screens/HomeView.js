import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const HomeView = () => {
  const sportsNews = [
    {
      id: 1,
      title: 'Latest Sports Trends',
      image: require('../assets/sports1.jpg'),
      description: 'Discover the most popular sports activities this season.'
    },
    {
      id: 2,
      title: 'Sports Tips & Tricks',
      image: require('../assets/sports2.jpg'),
      description: 'Expert advice to improve your game.'
    },
    {
      id: 3,
      title: 'Sports Events',
      image: require('../assets/sports3.jpg'),
      description: 'Upcoming sports events in your area.'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sports News & Ideas</Text>
      </View>

      {sportsNews.map((news) => (
        <View key={news.id} style={styles.newsCard}>
          <Image source={news.image} style={styles.newsImage} />
          <View style={styles.newsContent}>
            <Text style={styles.newsTitle}>{news.title}</Text>
            <Text style={styles.newsDescription}>{news.description}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#4CAF50',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  newsCard: {
    backgroundColor: '#FFFFFF',
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  newsImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  newsContent: {
    padding: 15,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  newsDescription: {
    fontSize: 14,
    color: '#666666',
  },
});

export default HomeView;