import React, { ReactElement, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { RootState } from '../../../store/reducers';
import { useSelectorRoot } from '../../../store/store';
import { Events } from './Events';
export const EventsList = () => {
  const eventList = useSelectorRoot((state: RootState) => state.site.events);
  const [items, setItems] = useState<ReactElement[]>([]);
  useEffect(() => {
    const res: ReactElement[] = [];
    eventList.map(item => {
      res.push(<Events data={item} />);
    });
    setItems(res);
  }, [eventList]);
  return (
    <ScrollView horizontal={true} contentContainerStyle={styles.scrollView}>
      {items}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
});
