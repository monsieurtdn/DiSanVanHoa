import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface INavigation {
  navigation: any;
  data: any;
  message: string; // Add the message prop
}

export const SearchItem: React.FC<INavigation> = props => {
  const {navigation, data, message} = props; // Destructure message prop

  const navigateToScreen = () => {
    const targetScreen =
      message === 'Event' ? 'EventContentScreen' : 'ContentScreen';
    navigation.navigate(targetScreen, {data: data});
    console.log('navigated', message);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToScreen}>
        <Image
          source={{
            uri: data.image_link,
          }}
          style={styles.itemImage}
        />
        <View style={styles.overlay} />
      </TouchableOpacity>
      <View style={styles.boxShadow}>
        <View style={styles.textContainer}>
          <Text style={styles.productName}>
            {message === 'Event' ? data.event_name : data.name}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    borderRadius: 10,
    overflow: 'hidden',
    paddingHorizontal: 5,
  },
  itemImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 15,
    textAlign: 'center',
    color: 'black',
  },
  boxShadow: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  textContainer: {
    paddingVertical: 5,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: '#000',
    opacity: 0.5,
  },
  minusButton: {
    position: 'absolute',
    bottom: 165,
    left: 10,
    height: 25,
    width: 25,
    borderRadius: 15, // Rounded corners
    backgroundColor: 'white', // White background
    paddingHorizontal: 10, // Horizontal padding
    paddingVertical: 5, // Vertical padding
    alignItems: 'center', // Center align text
    justifyContent: 'center', // Center align text vertically
  },
  minusButtonText: {
    color: 'blue', // Blue text color
    fontSize: 18, // Adjust the font size as needed
    fontWeight: 'bold', // Optional: bold text
  },
});
