import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, spacing, fontSize, borderRadius, borderWidth } from '../styles/styles'
import { database } from '../Firebase/firebaseSetup'
import { collection, onSnapshot } from 'firebase/firestore'

export default function ItemsList({ type, navigation }) {
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

  function getScreenName() {
    return type === 'exercise' ? 'Edit Activity' : 'Edit Diet';
  }

  // Render items
  function renderItems({ item }) {
    return (
      <Pressable 
        style={styles.itemContainer}
        onPress={() => navigation.navigate(getScreenName(), { entryId: item.id })}
      >
        <View style={styles.itemNameContainer}>
          <Text 
            style={styles.itemName}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {type === 'exercise' ? item.activityType : item.description}
          </Text>
        </View>
        {item.isSpecial && 
          <Image 
            source={require('../assets/special.png')}
            alt='this is the special icon for the item'
            style={styles.icon}
          />
          
        }
        <View style={styles.itemDateContainer}>
          <Text 
            style={styles.itemDate} 
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.date}
          </Text>
        </View>
        <View style={styles.itemDetailsContainer}>
          <Text 
            style={styles.itemDetails}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {type === 'exercise' ? item.duration : item.calories}
          </Text>
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
    justifyContent: 'flex-start',
  },

  itemNameContainer: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: colors.background.transparent,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.small,
  },

  itemName: {
    color: colors.text.primary,
    fontSize: fontSize.subtitle,
    fontWeight: 'bold',
  },

  itemDateContainer: {
    flex: 3,
    marginHorizontal: spacing.xs,
    backgroundColor: colors.background.white,
    paddingVertical: spacing.small,
    borderRadius: borderRadius.small,
  },

  itemDate: {
    color: colors.primary,
    fontSize: fontSize.body,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  itemDetailsContainer: {
    flex: 1.5,
    marginHorizontal: spacing.small,
    backgroundColor: colors.background.white,
    paddingVertical: spacing.small,
    borderRadius: borderRadius.small,
  },

  itemDetails: {
    color: colors.primary,
    fontSize: fontSize.body,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  icon: {
    width: 20,
    height: 20,
    marginHorizontal: spacing.small,
  },
})