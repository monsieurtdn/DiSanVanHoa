/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-paper';

export const SearchBar = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'rgba(223, 216, 216, 0.5)',
        padding: 8,
        borderRadius: 25,
        width: 351,
        height: 36,
      }}>
      <View style={{marginLeft: 4}}>
        <Icon source="magnify" color="rgba(113, 104, 104, 0.7)" size={24} />
      </View>
      <Text
        style={{
          color: 'rgba(113, 104, 104, 0.7)',
          fontSize: 18,
          marginTop: -4,
          paddingLeft: 6,
        }}>
        Search
      </Text>
    </View>
  );
};
