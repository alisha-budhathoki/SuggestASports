import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;

const FootballMatchesList = ({ matches }) => {
  const formatDate = (timestamp) => {
    return format(new Date(parseInt(timestamp) * 1000), 'MMM dd, yyyy');
  };

  const getMatchStatus = (status) => {
    switch (status.code) {
      case 6:
        return '1st Half';
      case 7:
        return '2nd Half';
      case 31:
        return 'Halftime';
      case 20:
        return 'Started';
      default:
        return status.description || 'Upcoming';
    }
  };

  const getMatchStatusColor = (status) => {
    switch (status.code) {
      case 6:
      case 7:
      case 31:
      case 20:
        return '#4CAF50'; // Live
      case 100:
        return '#2196F3'; // Completed
      default:
        return '#FF9800'; // Upcoming
    }
  };

  if (matches?.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="sports-soccer" size={40} color="#ccc" />
        <Text style={styles.emptyText}>No football matches available</Text>
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {matches?.length&&matches?.map((match) => (
        <TouchableOpacity key={match.id} style={styles.matchCard}>
          <View style={styles.matchHeader}>
            <View style={styles.statusContainer}>
              <View style={[styles.statusDot, { backgroundColor: getMatchStatusColor(match.status) }]} />
              <Text style={[styles.matchStatus, { color: getMatchStatusColor(match.status) }]}>
                {getMatchStatus(match.status)}
              </Text>
            </View>
            <Text style={styles.matchDate}>{formatDate(match.startTimestamp)}</Text>
          </View>

          <View style={styles.teamsContainer}>
            <View style={styles.team}>
              <Text style={styles.teamName} numberOfLines={2}>
                {match.homeTeam.name}
              </Text>
              <Text style={styles.teamScore}>
                {match.homeScore.current}
              </Text>
            </View>

            <View style={styles.vsContainer}>
              <Text style={styles.vsText}>VS</Text>
            </View>

            <View style={styles.team}>
              <Text style={styles.teamName} numberOfLines={2}>
                {match.awayTeam.name}
              </Text>
              <Text style={styles.teamScore}>
                {match.awayScore.current}
              </Text>
            </View>
          </View>

          <View style={styles.matchFooter}>
            <View style={styles.matchInfo}>
              <Icon name="sports-soccer" size={16} color="#666" />
              <Text style={styles.matchFormat}>{match.tournament.name}</Text>
            </View>
            <Text style={styles.matchDesc}>{match.tournament.category.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 5,
  },
  matchCard: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#eee',
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  matchStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  matchDate: {
    fontSize: 14,
    color: '#666',
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  team: {
    flex: 1,
    alignItems: 'center',
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  teamScore: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  vsContainer: {
    paddingHorizontal: 10,
  },
  vsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  matchFooter: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  matchInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchFormat: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 4,
  },
  matchDesc: {
    fontSize: 12,
    color: '#666',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default FootballMatchesList;