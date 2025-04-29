import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const SportDetailsScreen = ({ route, navigation }) => {
  const { sport } = route.params;

  const getSportDetails = (sportName) => {
    switch (sportName.toLowerCase()) {
      case 'football':
        return {
          description: 'Football, also known as soccer, is the world\'s most popular sport. It is played between two teams of eleven players on a rectangular field with a goal at each end.',
          benefits: [
            'Improves cardiovascular health',
            'Enhances coordination and balance',
            'Builds teamwork and communication skills',
            'Increases endurance and stamina',
          ],
          rules: [
            'Two teams of 11 players each',
            '90 minutes of play time',
            'No hands allowed (except for goalkeepers)',
            'Offside rule applies',
          ],
          equipment: [
            'Football boots',
            'Shin guards',
            'Football',
            'Goal posts',
          ],
        };
      case 'basketball':
        return {
          description: 'Basketball is a team sport in which two teams score points by throwing a ball through a hoop. It is one of the most popular sports in the world.',
          benefits: [
            'Improves hand-eye coordination',
            'Builds strength and endurance',
            'Enhances agility and speed',
            'Develops strategic thinking',
          ],
          rules: [
            'Five players per team',
            'Four quarters of 12 minutes each',
            'Dribbling required to move with the ball',
            'Three-point line for long-range shots',
          ],
          equipment: [
            'Basketball',
            'Basketball shoes',
            'Hoop and backboard',
            'Court',
          ],
        };
      case 'tennis':
        return {
          description: 'Tennis is a racket sport that can be played individually or between two teams of two players each. It is played on a rectangular court divided by a net.',
          benefits: [
            'Improves flexibility and coordination',
            'Builds strength and endurance',
            'Enhances mental focus',
            'Develops strategic thinking',
          ],
          rules: [
            'Scoring system: 15, 30, 40, game',
            'Best of three or five sets',
            'Serve must land in the service box',
            'Ball must bounce once before return',
          ],
          equipment: [
            'Tennis racket',
            'Tennis balls',
            'Tennis court',
            'Net',
          ],
        };
      case 'swimming':
        return {
          description: 'Swimming is an individual or team sport that involves moving through water using the arms and legs. It is both a competitive sport and a recreational activity.',
          benefits: [
            'Full-body workout',
            'Low impact on joints',
            'Improves cardiovascular health',
            'Builds endurance and strength',
          ],
          rules: [
            'Different strokes: freestyle, breaststroke, backstroke, butterfly',
            'Proper breathing techniques',
            'Lane discipline in competitions',
            'Turn techniques at pool ends',
          ],
          equipment: [
            'Swimsuit',
            'Goggles',
            'Swim cap',
            'Pool',
          ],
        };
      default:
        return {
          description: 'No details available for this sport.',
          benefits: [],
          rules: [],
          equipment: [],
        };
    }
  };

  const details = getSportDetails(sport.name);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: sport.color }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Icon name={sport.icon} size={60} color="#fff" />
          <Text style={styles.sportName}>{sport.name}</Text>
          <Text style={styles.sportDescription}>{sport.description}</Text>
        </View>

        {/* Content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.sectionText}>{details.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Benefits</Text>
          {details.benefits.map((benefit, index) => (
            <View key={index} style={styles.listItem}>
              <Icon name="check-circle" size={20} color="#4CAF50" />
              <Text style={styles.listItemText}>{benefit}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rules</Text>
          {details.rules.map((rule, index) => (
            <View key={index} style={styles.listItem}>
              <Icon name="sports" size={20} color="#4CAF50" />
              <Text style={styles.listItemText}>{rule}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Equipment</Text>
          {details.equipment.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Icon name="fitness-center" size={20} color="#4CAF50" />
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          ))}
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
  content: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 20,
    padding: 10,
  },
  sportName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    marginBottom: 5,
  },
  sportDescription: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  sectionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
    flex: 1,
  },
});

export default SportDetailsScreen;