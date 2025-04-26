import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import { Divider, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = ({ navigation }) => {
  return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				{/* Profile Header */}
				<View style={styles.header}>
					<Image
						source={require('../assets/default-avatar.jpg')}
						style={styles.avatar}
					/>
					<Text style={styles.name}>John Doe</Text>
					<Text style={styles.address}>New York, USA</Text>
				</View>

				<Divider style={styles.divider} />

				{/* Profile Options */}
				<View style={styles.optionsContainer}>
					<List.Item
						title="Settings"
						left={props => <List.Icon {...props} icon="settings" />}
						right={props => <List.Icon {...props} icon="chevron-right" />}
						onPress={() => {}}
					/>
					<List.Item
						title="Change Password"
						left={props => <List.Icon {...props} icon="lock" />}
						right={props => <List.Icon {...props} icon="chevron-right" />}
						onPress={() => {}}
					/>
					<List.Item
						title="Logout"
						titleStyle={styles.logoutText}
						left={props => <List.Icon {...props} icon="logout" color="#FF3B30" />}
						right={props => <List.Icon {...props} icon="chevron-right" />}
						onPress={() => {}}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
  },
  optionsContainer: {
    paddingHorizontal: 10,
  },
  logoutText: {
    color: '#FF3B30',
  },
});

export default ProfileScreen;