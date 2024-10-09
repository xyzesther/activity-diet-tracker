import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
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
        {item.isSpecial && 
          <Image 
            source={require('../assets/special.png')}
            alt='this is the special icon for the item'
            style={styles.image}
          />
        }
        <View style={styles.itemDateContainer}>
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
    flex: 1,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemName: {
    flexGrow: 1,
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },

  itemDateContainer: {
    marginHorizontal: 2,
    backgroundColor: colors.whiteBackground,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },

  itemDate: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  itemDetailsContainer: {
    marginHorizontal: 2,
    backgroundColor: colors.whiteBackground,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },

  itemDetails: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  image: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  }
})