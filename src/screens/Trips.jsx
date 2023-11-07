import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Input, Product, Text} from '../components/';

const trips = [
  {
    id: '123',
    truckModel: 'Freightliner CAS ACADIA',
    tripNumber: 'TN 07 2 9898',
    price: '2000',
    origin: 'Philadelphia, PA',
    destination: 'San Antonio, TX',
    dates: '25 Aug - 8:00 AM to 28 Aug - 12:00 AM',
    imageUrl: 'https://your-image-url.com/truck1.png',
    completed: true,
  },
  {
    id: '1234',
    truckModel: 'Freightliner CAS ACADIA',
    tripNumber: 'TN 33 5 3533',
    price: '1400',
    origin: 'Charlotte, CH',
    destination: 'Boston, BO',
    dates: '25 Jan - 8:00 AM to 28 Jan - 12:00 AM',
    imageUrl: 'https://your-image-url.com/truck2.png',
    completed: false,
  },
  // ... other trips
];

const EditButton = ({onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.editButton}>
    <Text style={styles.editButtonText}>Edit</Text>
  </TouchableOpacity>
);

const FloatingActionButton = ({onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.fab}>
    <Text style={styles.fabIcon}>+</Text>
  </TouchableOpacity>
);
const TripItem = ({item}) => {
  const {assets, colors, fonts, gradients, sizes} = useTheme();
  return (
    <Block card margin={10}>
      <Block
        flex={1}
        row
        align="center"
        justify="space-between"
        marginBottom={5}>
        <Text h4 size={18}>
          {item.tripNumber}
        </Text>
        <Text p color={colors.info}>
          {item.truckModel}
        </Text>
      </Block>
      <Block
        flex={1}
        row
        align="center"
        justify="space-between"
        marginBottom={15}>
        <Text p color={colors.warning}>
          {item.origin}
        </Text>
        <Text p color={colors.warning}>
          {item.destination}
        </Text>
      </Block>

      <Block
        flex={1}
        row
        align="center"
        justify="space-between"
        marginBottom={5}>
        <Text h5 color={colors.info} bold>
          ₹{item.price}
        </Text>
        {item.completed ? (
          <Text h5 color={colors.success}>
            Complete
          </Text>
        ) : (
          <>
            <Text h5 color={colors.danger}>
              <Text h5 color={colors.warning}>
                ₹{+item.price - 200}
              </Text>
            </Text>
            <Text h5 color={colors.danger}>
              Partial
            </Text>
          </>
        )}
      </Block>
      {!item.completed && (
        <Block
          flex={1}
          row
          align="center"
          justify="space-between"
          marginBottom={5}
          marginTop={10}>
          <TouchableOpacity>
            <Block row flex={0} align="center">
              <Text
                p
                color={colors.success}
                semibold
                size={sizes.s * 2}
                marginRight={sizes.s}>
                Payment
              </Text>
            </Block>
          </TouchableOpacity>

          <TouchableOpacity>
            <Block row flex={0} align="center">
              <Text
                p
                color={colors.danger}
                semibold
                size={sizes.s * 2}
                marginRight={sizes.s}>
                Expense
              </Text>
            </Block>
          </TouchableOpacity>
        </Block>
      )}
    </Block>
  );
};

const App = () => (
  <SafeAreaView style={styles.container}>
    <FlatList
      data={trips}
      keyExtractor={item => item.id}
      renderItem={({item}) => <TripItem item={item} />}
    />
    <FloatingActionButton onPress={() => console.log('Create Trip pressed')} />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tripItem: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff', // Ensure the background color is set for shadow to appear
    borderRadius: 5, // Optional: if you want rounded corners
    margin: 10, // This adds margin around each trip item
    marginBottom: 15, // This adds additional bottom margin
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Elevation for Android
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  truckModel: {
    fontWeight: 'bold',
  },
  tripNumber: {
    color: 'gray',
  },
  price: {
    fontSize: 18,
    color: 'green',
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  location: {
    fontSize: 16,
  },
  dates: {
    fontSize: 16,
    color: 'gray',
  },
  readMoreButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: 'blue',
    padding: 10,
  },
  readMoreButtonText: {
    color: 'white',
  },
  editButton: {
    marginTop: 10,
    backgroundColor: 'orange',
    padding: 8,
    borderRadius: 4,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: 'blue',
    borderRadius: 28,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  fabIcon: {
    fontSize: 24,
    color: 'white',
  },
});

export default App;
