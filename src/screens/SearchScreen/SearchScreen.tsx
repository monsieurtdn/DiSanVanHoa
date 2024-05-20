/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Header } from '../../components/Header';
import { RootState } from '../../store/reducers';
import { useSelectorRoot } from '../../store/store';
import { SearchList } from './components/SearchList';

export const SearchScreen: React.FC = () => {
  const eventList = useSelectorRoot((state: RootState) => state.site.events);
  const siteList = useSelectorRoot((state: RootState) => state.site.sites);
  const [searchList, setSearchList] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const [show, setShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const types = [ 'Di sản', 'Sự kiện'];
  const categories = ['Di sản vật thể', 'Di sản phi vật thể'];
  const tangibles = ['Di tích lịch sử', 'Danh lam thắng cảnh', 'Cổ vật'];
  const intangibles = ['Lễ hội', 'Ẩm thực', 'Trang phục'];
  const regions = ['Miền Bắc', 'Miền Trung', 'Miền Nam'];
  const navigation = useNavigation();

  useEffect(() => {
    if (query === '') {
      setIsFocused(false);
    } else {
      setIsFocused(true);
    }
  }, [query]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const KeyboardDismiss = () => Keyboard.dismiss();

  const handleSearch = () => {};

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
            Tìm kiếm
          </Text>
        }
        handleGoBack={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.header}>
        <Searchbar
          style={[
            styles.search,
            (isFocused || query !== '') && styles.searchFocused,
          ]}
          value={query}
          placeholder="Tìm kiếm"
          onSubmitEditing={KeyboardDismiss}
          onChangeText={value => {
            setQuery(value);
            handleFocus();
          }}
          selectionColor={'grey'}
          numberOfLines={1}
          inputStyle={{
            fontSize: 16,
            height: 20,
            lineHeight: 18,
            textAlignVertical: 'top',
            marginTop: -5,
            marginLeft: -5,
          }}
        />
      </View>

      <ScrollView style={{paddingLeft: 5}}>
        <Text style={{color: 'black', fontSize: 16}}>Danh mục tìm kiếm: </Text>
        <ScrollView horizontal style={{flexDirection: 'row', paddingLeft: 10}}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryItem,
                selectedCategory === category && styles.selectedCategoryItem,
              ]}
              onPress={() => setSelectedCategory(category)}>
              <Text
                style={{
                  color: selectedCategory === category ? 'white' : 'black',
                }}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={{color: 'black', fontSize: 16}}>Vùng miền:</Text>
        <ScrollView horizontal style={{flexDirection: 'row', paddingLeft: 10}}>
          {regions.map(region => (
            <TouchableOpacity
              key={region}
              style={[
                styles.categoryItem,
                selectedRegion === region && styles.selectedCategoryItem,
              ]}
              onPress={() => setSelectedRegion(region)}>
              <Text
                style={{color: selectedRegion === region ? 'white' : 'black'}}>
                {region}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity onPress={handleSearch} style={styles.button}>
          <Text style={styles.buttonText}>Tìm kiếm</Text>
        </TouchableOpacity>
        {show && <SearchList dataList={searchList} />}
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
