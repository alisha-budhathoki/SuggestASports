import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, SafeAreaView, StatusBar, Platform } from 'react-native';

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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sports News & Ideas</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 10,
  },
  newsCard: {
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
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