import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Items } from './Items';

interface Props {
  dataList: string[];
  message: string; // Add the message prop
}

export const ItemsList: React.FC<Props> = (props: Props) => {
  const {dataList, message} = props; // Destructure message prop

  const navigation = useNavigation();
  const windowWidth = useWindowDimensions().width;
  const itemWidth = 160; // Assuming each item is 160 in width

  const numColumns = Math.floor(windowWidth / itemWidth);

  const renderSearchItem = ({item}: {item: string}) => (
    <View style={styles.itemContainer}>
      <Items data={item} navigation={navigation} message={message} />
    </View>
  );

  return (
    <FlatList
      data={dataList}
      renderItem={renderSearchItem}
      numColumns={numColumns}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  itemContainer: {
    flex: 1,
    padding: 5,
  },
});
