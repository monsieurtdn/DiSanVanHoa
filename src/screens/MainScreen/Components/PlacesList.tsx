import React, { ReactElement, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { RootState } from '../../../store/reducers';
import { useSelectorRoot } from '../../../store/store';
import { Places } from './Places';
export const PlacesList = () => {
  const sitesList = useSelectorRoot((state: RootState) => state.site.sites);
  const [items, setItems] = useState<ReactElement[]>([]);
  useEffect(() => {
    const res: ReactElement[] = [];
    sitesList.map(item => {
      res.push(<Places data={item} />);
    });
    setItems(res);
  }, [sitesList]);
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
