/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Header } from '../../components/Header';
import { RootState } from '../../store/reducers';
import { useSelectorRoot } from '../../store/store';
import { ItemsList } from './components/ItemsList';

export const InterestSitesScreen: React.FC = () => {
  const navigation = useNavigation();
  const interestList = useSelectorRoot(
    (state: RootState) => state.persist.userInfo.interest_Heritage,
  );
  console.log('Heritage: ', interestList);
  return (
    <View style={styles.container}>
      <Header
        shadowElevation={6}
        hasShadow={true}
        content={
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              position: 'absolute',
              left: 40,
              paddingLeft: 20,
              color: 'white',
            }}>
            Danh sách Di sản quan tâm
          </Text>
        }
        handleGoBack={() => {
          navigation.goBack();
        }}
      />

      <ScrollView style={{paddingLeft: 5}}>
        <ItemsList dataList={interestList} message={''} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
    alignItems: 'center',
    paddingVertical: 10,
    zIndex: 50,
  },
  search: {
    flex: 2,
    backgroundColor: '#F1F1F1',
    borderRadius: 20,
    marginLeft: 10,
    height: 36,
    marginRight: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchFocused: {
    borderColor: 'red', // Đặt màu viền khi thanh tìm kiếm được chọn
    borderWidth: 1, // Thêm viền
  },
  categoryItem: {
    margin: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 15,
    backgroundColor: '#99CCFF',
  },
  selectedCategoryItem: {
    backgroundColor: 'gray',
  },
  button: {
    backgroundColor: '#005BA5',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 10,
    borderRadius: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#005BA5',
  },
  buttonText: {
    color: 'white', // Màu văn bản trắng
    textAlign: 'center', // Canh giữa văn bản
    fontWeight: 'bold',
  },
});
