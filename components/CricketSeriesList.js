import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;

const CricketSeriesList = ({ seriesData }) => {
  const formatDate = (timestamp) => {
    return format(new Date(parseInt(timestamp)), 'MMM dd, yyyy');
  };

  // Extract all matches from the series data
  const allMatches = seriesData.reduce((matches, matchType) => {
    matchType.seriesMatches.forEach(series => {
      if (series.seriesAdWrapper?.matches) {
        matches.push(...series.seriesAdWrapper.matches);
      }
    });
    return matches;
  }, []);

  // Sort matches by date (most recent first)
  const sortedMatches = allMatches.sort((a, b) =>
    parseInt(b.matchInfo.startDate) - parseInt(a.matchInfo.startDate)
  );

  const getTotalScore = (teamScore) => {
    if (!teamScore) return '0/0';

    let totalRuns = 0;
    let totalWickets = 0;

    try {
      if (teamScore.inngs1) {
        totalRuns += teamScore.inngs1.runs || 0;
        totalWickets += teamScore.inngs1.wickets || 0;
      }
      if (teamScore.inngs2) {
        totalRuns += teamScore.inngs2.runs || 0;
        totalWickets += teamScore.inngs2.wickets || 0;
      }
    } catch (error) {
      console.error('Error calculating score:', error);
      return '0/0';
    }

    return `${totalRuns}/${totalWickets}`;
  };

  const getTeamScore = (match, teamNumber) => {
    if (!match?.matchScore) return '0/0';
    return getTotalScore(teamNumber === 1 ? match.matchScore.team1Score : match.matchScore.team2Score);
  };

  const getMatchStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'live':
        return '#4CAF50';
      case 'completed':
        return '#2196F3';
      case 'upcoming':
        return '#FF9800';
      default:
        return '#757575';
    }
  };

  if (sortedMatches?.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="sports-cricket" size={40} color="#ccc" />
        <Text style={styles.emptyText}>No cricket matches available</Text>
      </View>
    );
  }

  return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.scrollContent}>
			{sortedMatches?.length&& sortedMatches?.map((match) => (
				<TouchableOpacity
					key={match.matchInfo.matchId}
					style={styles.matchCard}>
					<View style={styles.matchHeader}>
						<View style={styles.statusContainer}>
							<View
								style={[
									styles.statusDot,
									{
										backgroundColor: getMatchStatusColor(
											match.matchInfo.stateTitle
										),
									},
								]}
							/>
							<Text
								style={[
									styles.matchStatus,
									{ color: getMatchStatusColor(match.matchInfo.stateTitle) },
								]}>
								{match.matchInfo.stateTitle || "Upcoming"}
							</Text>
						</View>
						<Text style={styles.matchDate}>
							{formatDate(match.matchInfo.startDate)}
						</Text>
					</View>

					<View style={styles.teamsContainer}>
						<View style={styles.team}>
							<Text style={styles.teamName} numberOfLines={2}>
								{match.matchInfo.team1?.teamName || "TBD"}
							</Text>
							<Text style={styles.teamScore}>{getTeamScore(match, 1)}</Text>
						</View>

						<View style={styles.vsContainer}>
							<Text style={styles.vsText}>VS</Text>
						</View>

						<View style={styles.team}>
							<Text style={styles.teamName} numberOfLines={2}>
								{match.matchInfo.team2?.teamName || "TBD"}
							</Text>
							<Text style={styles.teamScore}>{getTeamScore(match, 2)}</Text>
						</View>
					</View>

					<View style={styles.matchFooter}>
						<View style={styles.matchInfo}>
							<Icon name="sports-cricket" size={16} color="#666" />
							<Text style={styles.matchFormat}>
								{match.matchInfo.matchFormat || "TBD"}
							</Text>
						</View>
						<Text style={styles.matchDesc}>
							{match.matchInfo.matchDesc || "Match"}
						</Text>
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

export default CricketSeriesList;