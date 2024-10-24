import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, spacing, fontSize, borderRadius, borderWidth } from '../styles/styles'
import { database } from '../Firebase/firebaseSetup'
import { collection, onSnapshot } from 'firebase/firestore'

export default function ItemsList({ type }) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, type), (querySnapshot) => {
        let fetchedEntries = [];
        querySnapshot.forEach((docSnapshot) => {
          fetchedEntries.push({ ...docSnapshot.data(), id: docSnapshot.id });
        });
        setEntries(fetchedEntries);
      });
      return () => unsubscribe();
  }, [type]);

  // Render items
  function renderItems({ item }) {
    return (
      <Pressable 
        style={styles.itemContainer}
        onPress={() => navigation.navigate('Edit Entry', { itemId: item.id })}
      >
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
      </Pressable>
    )
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={entries}
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
    borderWidth: borderWidth.medium,
    borderRadius: borderRadius.medium,
    padding: spacing.small,
    marginBottom: spacing.medium,
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemName: {
    flexGrow: 1,
    color: colors.text.primary,
    fontSize: fontSize.subtitle,
    fontWeight: 'bold',
  },

  itemDateContainer: {
    marginHorizontal: spacing.xs,
    backgroundColor: colors.background.white,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    borderRadius: borderRadius.small,
  },

  itemDate: {
    color: colors.primary,
    fontSize: fontSize.body,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  itemDetailsContainer: {
    width: 80,
    height: 30,
    marginHorizontal: spacing.small,
    backgroundColor: colors.background.white,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    borderRadius: borderRadius.small,
  },

  itemDetails: {
    color: colors.primary,
    fontSize: fontSize.body,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  image: {
    width: 20,
    height: 20,
    marginHorizontal: spacing.medium,
  }
})