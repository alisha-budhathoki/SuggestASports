import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import CricketSeriesList from '../components/CricketSeriesList';
import FootballMatchesList from '../components/FootballMatchesList';
import { fetchCricketMatches } from '../services/cricketService';
import { fetchFootballMatches } from '../services/footballService';

const { width } = Dimensions.get('window');

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
  const [cricketData, setCricketData] = useState([]);
  const [footballData, setFootballData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useFocusEffect(
    useCallback(() => {
      loadActivities();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadSportsData();
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

  useEffect(() => {
    loadSportsData();
  }, []);

  const loadSportsData = async () => {
    try {
      setLoading(true);
      setError(null);

      const cricketMatches = await fetchCricketMatches();
      setCricketData(cricketMatches);

      const footballMatches = await fetchFootballMatches();
      setFootballData(footballMatches);

    } catch (err) {
      console.error('Error loading sports data:', err);
      setError('Failed to load sports data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSportPress = (sport) => {
    navigation.navigate('SportDetails', { sport });
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading sports data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadSportsData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
		<SafeAreaView style={styles.container}>
			{/* Custom Header */}
			<View style={styles.header}>
				<View style={styles.headerLeft}>
					<Text style={styles.headerTitle}>Sportsphedia</Text>
					<Text style={styles.headerSubtitle}>Your Sports Companion</Text>
				</View>
				<TouchableOpacity
					onPress={navigateToProfile}
					style={styles.avatarContainer}>
					<Image
						source={require("../assets/default-avatar.jpg")}
						style={styles.avatar}
					/>
				</TouchableOpacity>
			</View>

			<ScrollView
				style={styles.content}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}>
				{/* Live Matches Section */}
				<View style={styles.liveSection}>
					<View style={styles.sectionHeader}>
						<View style={styles.sectionTitleContainer}>
							<Icon name="live-tv" size={24} color="#4CAF50" />
							<Text style={styles.sectionTitle}>Live Matches</Text>
						</View>
						<TouchableOpacity style={styles.viewAllButton}>
							<Icon name="arrow-forward" size={16} color="#4CAF50" />
						</TouchableOpacity>
					</View>

					{/* Cricket Matches */}
					<View style={styles.sportSection}>
						<View style={styles.sportHeader}>
							<Icon name="sports-cricket" size={20} color="#666" />
							<Text style={styles.sportTitle}>Cricket</Text>
						</View>
						<CricketSeriesList seriesData={cricketData} />
					</View>

					{/* Football Matches */}
					<View style={styles.sportSection}>
						<View style={styles.sportHeader}>
							<Icon name="sports-soccer" size={20} color="#666" />
							<Text style={styles.sportTitle}>Football</Text>
						</View>
						<FootballMatchesList matches={footballData} />
					</View>
				</View>

				{/* Quick Actions */}
				<View style={styles.quickActionsContainer}>
					<TouchableOpacity
						style={styles.actionButton}
						onPress={navigateToAddActivity}>
						<View style={styles.actionButtonContent}>
							<View style={styles.actionIconContainer}>
								<Icon name="add" size={24} color="#fff" />
							</View>
							<View style={styles.actionTextContainer}>
								<Text style={styles.actionTitle}>New Activity</Text>
								<Text style={styles.actionSubtitle}>
									Track your sports activity
								</Text>
							</View>
						</View>
					</TouchableOpacity>
				</View>

				{/* Featured Sports Section */}
				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<View style={styles.sectionTitleContainer}>
							<Icon name="star" size={24} color="#4CAF50" />
							<Text style={styles.sectionTitle}>Featured Sports</Text>
						</View>
					</View>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.featuredSportsContent}>
						{sports.map((sport) => (
							<TouchableOpacity
								key={sport.name}
								style={[styles.sportCard, { backgroundColor: sport.color }]}
								onPress={() => handleSportPress(sport)}>
								<Icon name={sport.icon} size={40} color="#fff" />
								<Text style={styles.sportName}>{sport.name}</Text>
								<Text style={styles.sportDescription}>{sport.description}</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>

				{/* Recent Activities */}
				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<View style={styles.sectionTitleContainer}>
							<Icon name="history" size={24} color="#4CAF50" />
							<Text style={styles.sectionTitle}>Recent Activities</Text>
						</View>
						<TouchableOpacity
							onPress={navigateToAddActivity}></TouchableOpacity>
					</View>
					{activities?.length > 0 ? (
						activities.slice(0, 3).map((activity) => (
							<View key={activity.id} style={styles.activityCard}>
								<View
									style={[
										styles.activityIcon,
										{
											backgroundColor:
												sports.find((s) => s.name === activity.sport)?.color ||
												"#4CAF50",
										},
									]}>
									<Icon
										name={
											sports.find((s) => s.name === activity.sport)?.icon ||
											"sports"
										}
										size={24}
										color="#fff"
									/>
								</View>
								<View style={styles.activityInfo}>
									<Text style={styles.activityTitle}>{activity.sport}</Text>
									<Text style={styles.activityTime}>
										{formatDate(activity.createdAt)} • {activity.duration}{" "}
										minutes
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
							<Text style={styles.emptyStateSubtext}>
								Add your first activity!
							</Text>
						</View>
					)}
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
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
  },
  quickActionsContainer: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  actionSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  viewAllText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  featuredSportsContent: {
    paddingHorizontal: 15,
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
  sportSection: {
    marginBottom: 15,
  },
  sportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  sportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginLeft: 8,
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
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  activityInfo: {
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  liveSection: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default HomeScreen;