import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Image,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const sports = [
  {
    name: 'Football',
    icon: 'sports-soccer',
    color: '#4CAF50',
    description: 'The Beautiful Game',
  },
  {
    name: 'Basketball',
    icon: 'sports-basketball',
    color: '#FF5722',
    description: 'Slam Dunk',
  },
  {
    name: 'Tennis',
    icon: 'sports-tennis',
    color: '#2196F3',
    description: 'Love & Match',
  },
  {
    name: 'Swimming',
    icon: 'pool',
    color: '#00BCD4',
    description: 'Dive In',
  },
];

const HomeScreen = ({ navigation }) => {
  const [activities, setActivities] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadActivities = async () => {
    try {
      const storedActivities = await AsyncStorage.getItem('activities');
      if (storedActivities) {
        const parsedActivities = JSON.parse(storedActivities);
        // Sort activities by date, most recent first
        const sortedActivities = parsedActivities.sort((a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setActivities(sortedActivities);
      }
    } catch (error) {
      console.error('Error loading activities:', error);
    }
  };

  // Use useFocusEffect to reload activities when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadActivities();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadActivities();
    setRefreshing(false);
  };

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const navigateToAddActivity = () => {
    navigation.navigate('AddActivity');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>SuggestaSport</Text>
        </View>
        <TouchableOpacity
          onPress={navigateToProfile}
          style={styles.avatarContainer}
        >
          <Image
            source={require('../assets/default-avatar.jpg')}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Featured Sports Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Sports</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {sports.map((sport) => (
              <TouchableOpacity key={sport.name} style={[styles.sportCard, { backgroundColor: sport.color }]}>
                <Icon name={sport.icon} size={40} color="#fff" />
                <Text style={styles.sportName}>{sport.name}</Text>
                <Text style={styles.sportDescription}>{sport.description}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent Activities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          {activities.length > 0 ? (
            activities.map((activity) => (
              <View key={activity.id} style={styles.activityCard}>
                <Icon
                  name={sports.find(s => s.name === activity.sport)?.icon || 'sports'}
                  size={24}
                  color="#333"
                />
                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}>{activity.sport}</Text>
                  <Text style={styles.activityTime}>
                    {formatDate(activity.createdAt)} • {activity.duration} minutes
                  </Text>
                  {activity.notes && (
                    <Text style={styles.activityNotes}>{activity.notes}</Text>
                  )}
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Icon name="fitness-center" size={40} color="#ccc" />
              <Text style={styles.emptyStateText}>No activities yet</Text>
              <Text style={styles.emptyStateSubtext}>Add your first activity!</Text>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionButton} onPress={navigateToAddActivity}>
              <Icon name="add" size={24} color="#fff" />
              <Text style={styles.actionText}>New Activity</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="group" size={24} color="#fff" />
              <Text style={styles.actionText}>Find Friends</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  sportCard: {
    width: 150,
    height: 150,
    borderRadius: 15,
    marginRight: 15,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  sportName: {
    color: '#fff',
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  sportDescription: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
    opacity: 0.9,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  activityInfo: {
    marginLeft: 15,
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  activityTime: {
    fontSize: 14,
    color: '#666',
  },
  activityNotes: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    fontStyle: 'italic',
  },
  emptyState: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 10,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  actionText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HomeScreen;