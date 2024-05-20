import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface INavigation {
  navigation: any;
  data: any;
}
export const SearchItem: React.FC<INavigation> = props => {
  const {navigation, data} = props;
  useEffect(() => {
    console.log(data);
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ContentScreen', {data});
        }}>
        <Image
          source={require('../../../../images/DenHung.png')}
          style={styles.itemImage}
        />
        <View style={styles.overlay} />
      </TouchableOpacity>
      <View style={styles.boxShadow}>
        <View style={styles.textContainer}>
          <Text style={styles.productName}>{data.name}</Text>
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
  priceText: {
    fontSize: 14,
    textAlign: 'center',
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
});
