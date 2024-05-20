import React, {ReactElement, useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {RootState} from '../../../store/reducers';
import {useSelectorRoot} from '../../../store/store';
import {Post} from './Post';

export const PostList = () => {
  const postList = useSelectorRoot((state: RootState) => state.site.post);
  const [items, setItems] = useState<ReactElement[]>([]);

  useEffect(() => {
    const res: ReactElement[] = [];
    postList.forEach(item => {
      res.push(<Post data={item} key={item.id} />); // Thêm key để tránh cảnh báo
    });
    setItems(res);
  }, [postList]);

  return (
    <ScrollView horizontal={true} contentContainerStyle={styles.scrollView}>
      {items.length > 0 ? items : <EmptyComponent />}
    </ScrollView>
  );
};

const EmptyComponent = () => {
  return null;
};

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
});
