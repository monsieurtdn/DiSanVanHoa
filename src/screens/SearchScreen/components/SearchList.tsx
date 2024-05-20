import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SearchItem } from './SearchItem';

interface Props {
  dataList: any;
}

export const SearchList: React.FC<Props> = (props: Props) => {
  const {dataList} = props;
  const navigation = useNavigation();
  const renderSearchItem = ({item}: {item: any}) => (
    <SearchItem navigation={navigation} data={item} /> // Use item instead of data
  );

  return (
    <FlatList
      data={dataList}
      renderItem={renderSearchItem}
      numColumns={2}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
});
