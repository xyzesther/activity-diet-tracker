import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { EntriesContext } from './EntriesContext'
import { colors } from '../Colors'

export default function ItemsList({ type }) {
  const { entries } = useContext(EntriesContext);

  const filteredEntries = entries[type];
  
  function renderItems({ item }) {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.itemDetailsContainer}>
          <Text style={styles.itemDate}>{item.date}</Text>
        </View>
        <View style={styles.itemDetailsContainer}>
          <Text style={styles.itemDetails}>{item.details}</Text>
        </View>
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItems}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  itemName: {
    color: colors.text.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.whiteBackground,
  },
  itemDate: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDetails: {
    color: colors.primary,
    fontSize: 16,
  }
  

})