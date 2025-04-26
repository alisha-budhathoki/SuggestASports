import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const sports = [
  { id: '1', name: 'Football', icon: 'sports-soccer' },
  { id: '2', name: 'Basketball', icon: 'sports-basketball' },
  { id: '3', name: 'Tennis', icon: 'sports-tennis' },
  { id: '4', name: 'Swimming', icon: 'pool' },
  { id: '5', name: 'Running', icon: 'directions-run' },
  { id: '6', name: 'Cycling', icon: 'directions-bike' },
];

const AddActivityScreen = ({ navigation }) => {
  const [activity, setActivity] = useState({
    sport: '',
    duration: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });
  const [showSportPicker, setShowSportPicker] = useState(false);

  const saveActivity = async () => {
    try {
      // Validate form
      if (!activity.sport || !activity.duration) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }

      // Get existing activities
      const existingActivities = await AsyncStorage.getItem('activities');
      const activities = existingActivities ? JSON.parse(existingActivities) : [];

      // Add new activity
      const newActivity = {
        id: Date.now().toString(),
        ...activity,
        createdAt: new Date().toISOString(),
      };

      // Save updated activities
      await AsyncStorage.setItem('activities', JSON.stringify([...activities, newActivity]));

      Alert.alert('Success', 'Activity added successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save activity');
    }
  };

  const renderSportItem = ({ item }) => (
    <TouchableOpacity
      style={styles.sportItem}
      onPress={() => {
        setActivity({ ...activity, sport: item.name });
        setShowSportPicker(false);
      }}
    >
      <Icon name={item.icon} size={24} color="#4CAF50" />
      <Text style={styles.sportItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Sport *</Text>
          <TouchableOpacity
            style={styles.sportSelector}
            onPress={() => setShowSportPicker(true)}
          >
            {activity.sport ? (
              <View style={styles.selectedSport}>
                <Icon
                  name={sports.find(s => s.name === activity.sport)?.icon || 'sports'}
                  size={24}
                  color="#4CAF50"
                />
                <Text style={styles.selectedSportText}>{activity.sport}</Text>
              </View>
            ) : (
              <Text style={styles.placeholderText}>Select a sport</Text>
            )}
            <Icon name="arrow-drop-down" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Duration (minutes) *</Text>
          <TextInput
            style={styles.input}
            value={activity.duration}
            onChangeText={(value) => setActivity({ ...activity, duration: value })}
            keyboardType="numeric"
            placeholder="Enter duration in minutes"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Date</Text>
          <TextInput
            style={styles.input}
            value={activity.date}
            onChangeText={(value) => setActivity({ ...activity, date: value })}
            placeholder="YYYY-MM-DD"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={activity.notes}
            onChangeText={(value) => setActivity({ ...activity, notes: value })}
            placeholder="Add any notes about your activity"
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveActivity}>
          <Icon name="save" size={24} color="#fff" />
          <Text style={styles.saveButtonText}>Save Activity</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={showSportPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSportPicker(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Sport</Text>
              <TouchableOpacity onPress={() => setShowSportPicker(false)}>
                <Icon name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={sports}
              renderItem={renderSportItem}
              keyExtractor={(item) => item.id}
              style={styles.sportList}
            />
          </View>
        </View>
      </Modal>
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
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  sportSelector: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedSport: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedSportText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  sportList: {
    maxHeight: 400,
  },
  sportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sportItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default AddActivityScreen;