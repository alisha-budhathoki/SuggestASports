import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LiveMarketList = ({ markets }) => {
  const getChangeColor = (change) => {
    return change >= 0 ? '#4CAF50' : '#F44336';
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {markets.map((market) => (
        <TouchableOpacity key={market.id} style={styles.marketCard}>
          <View style={[styles.marketIconContainer, { backgroundColor: market.color }]}>
            <Icon name={market.icon} size={24} color="#fff" />
          </View>
          <View style={styles.marketInfo}>
            <Text style={styles.marketTitle}>{market.name}</Text>
            <Text style={styles.marketPrice}>${market.price.toFixed(2)}</Text>
            <Text style={[styles.marketChange, { color: getChangeColor(market.change) }]}>
              {market.change >= 0 ? '+' : ''}{market.change}%
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 15,
  },
  marketCard: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#eee',
  },
  marketIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  marketInfo: {
    flex: 1,
  },
  marketTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  marketPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 2,
  },
  marketChange: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default LiveMarketList;