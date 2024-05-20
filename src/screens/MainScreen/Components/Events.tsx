/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
interface Props {
  data: any;
}
export const Events: React.FC<Props> = (props: Props) => {
  const navigation = useNavigation();
  const {data} = props;
  return (
    <View style={{width: 195, marginHorizontal: 5}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('EventContentScreen', {data: data});
          console.log('data: ', data);
        }}>
        <Image
          source={{
            uri: data.image_link,
          }}
          style={styles.itemImage}
        />
      </TouchableOpacity>
      <View style={styles.boxShadow}>
        <View style={styles.textContainer}>
          <Text style={styles.productName}>{data.event_name}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  itemImage: {
    width: 195,
    height: 144,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    // Thêm style để có thể áp dụng shadow cho View chứa Text
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 20, // Chiều cao của vệt đen (có thể thay đổi)
    backgroundColor: '#000',
    opacity: 0.5, // Độ mờ của vệt đen (có thể thay đổi)
  },
  productName: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
    // fontWeight: 'bold',
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
});
