import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import eventsApi from '../../../api/events';
import heritagesApi from '../../../api/heritages';

interface INavigation {
  navigation: any;
  data: any;
  message: string; // Add the message prop
}

export const DeleteButton = () => {
  const buttonWidth = 16; // Chiều rộng của nút
  const buttonHeight = 16; // Chiều dài của nút
  return (
    <View style={{width: buttonWidth, height: buttonHeight}}>
      <Svg
        width={buttonWidth}
        height={buttonHeight}
        viewBox={`0 0 ${buttonWidth} ${buttonHeight}`}>
        {/* Vẽ hình tròn background màu đỏ */}
        <Circle
          cx={buttonWidth / 2}
          cy={buttonHeight / 2}
          r={buttonWidth / 2}
          fill="#FF6347"
        />
        {/* Vẽ dấu X màu trắng */}
        <Path
          d={`M${buttonWidth / 4} ${buttonHeight / 4} L${
            (buttonWidth * 3) / 4
          } ${(buttonHeight * 3) / 4} M${(buttonWidth * 3) / 4} ${
            buttonHeight / 4
          } L${buttonWidth / 4} ${(buttonHeight * 3) / 4}`}
          stroke="#FFFFFF"
          strokeWidth="2"
        />
      </Svg>
    </View>
  );
};

export const Items: React.FC<INavigation> = props => {
  const {navigation, data, message} = props; // Destructure message prop
  const [itemsHeritage, setItemsHeritage] = useState<any[]>([]);
  const [itemsEvents, setItemsEvents] = useState<any[]>([]);

  useEffect(() => {
    console.log('data: ', data);
  }, [data]);

  useEffect(() => {
    const interestHeritage = heritagesApi.getHeritagesbyID(data).subscribe(
      response => {
        console.log('Heritage response:', response); // Add this log
        setItemsHeritage(response);
      },
      error => {
        console.error('Error calling getHeritagesbyID:', error);
      },
    );

    const interestEvent = eventsApi.getEventbyID(data).subscribe(
      response => {
        console.log('Event response:', response); // Add this log
        setItemsEvents(response);
      },
      error => {
        console.error('Error calling getEventbyID:', error);
      },
    );

    return () => {
      interestHeritage.unsubscribe();
      interestEvent.unsubscribe();
    };
  }, [data]);

  const items = message === 'Event' ? itemsEvents : itemsHeritage;
  useEffect(() => console.log('items: ', items), [items]);
  const navigateToScreen = () => {
    const targetScreen =
      message === 'Event' ? 'EventContentScreen' : 'ContentScreen';
    navigation.navigate(targetScreen, {data: items});
    console.log('navigated', message);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToScreen}>
        <Image
          source={{
            uri: items.image_link,
          }}
          style={styles.itemImage}
        />
        <View style={styles.overlay} />
      </TouchableOpacity>
      <View>
        <TouchableOpacity
          style={styles.minusButton}
          onPress={() => {
            message === 'Event'
              ? eventsApi.removeEventToFavByID(items._id)
              : heritagesApi.removeHeritagesToFavByID(items._id);
          }}>
          <DeleteButton />
        </TouchableOpacity>
      </View>
      <View style={styles.boxShadow}>
        <View style={styles.textContainer}>
          <Text style={styles.productName}>
            {message === 'Event' ? items.event_name : items.name}
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
    width: '45%',
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
