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
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [show, setShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    key: string;
    value: string;
  } | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<{
    key: string;
    value: string;
  } | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string | null>(null);
  const [selected, setSelected] = useState<{
    key: string;
    value: string;
  } | null>(null);
  const [menu1, setMenu1] = useState<
    | {
        key: string;
        value: string;
      }[]
  >([]);
  const [menu2, setMenu2] = useState<
    | {
        key: string;
        value: string;
      }[]
  >([]);
  const [noResults, setNoResults] = useState(false);

  const types = ['Di sản', 'Sự kiện'];
  const categories = [
    {key: 'tangible', value: 'Di sản vật thể'},
    {key: 'intangible', value: 'Di sản phi vật thể'},
  ];
  const tangibles = [
    {key: 'historical sites', value: 'Di tích lịch sử'},
    {key: 'scenic views', value: 'Danh lam thắng cảnh'},
    {key: 'artifacts', value: 'Cổ vật'},
  ];
  const intangibles = [
    {key: 'festivals', value: 'Lễ hội'},
    {key: 'foods', value: 'Ẩm thực'},
    {key: 'costumes', value: 'Trang phục'},
  ];
  const regions = [
    {key: 'Bac', value: 'Miền Bắc'},
    {key: 'Trung', value: 'Miền Trung'},
    {key: 'Nam', value: 'Miền Nam'},
  ];
  const navigation = useNavigation();

  useEffect(() => {
    if (query === '') {
      setIsFocused(false);
    } else {
      setIsFocused(true);
    }
  }, [query]);

  useEffect(() => {
    setSelectedCategory(null);
    setSelected(null);
    if (selectedTypes === 'Di sản') {
      setMenu1(categories);
    } else {
      setMenu1([]);
      setMenu2([]);
    }
  }, [selectedTypes]);

  useEffect(() => {
    if (selectedCategory?.value === 'Di sản vật thể') {
      setMenu2(tangibles);
    } else if (selectedCategory?.value === 'Di sản phi vật thể') {
      setMenu2(intangibles);
    } else {
      setMenu2([]);
    }
  }, [selectedCategory]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const KeyboardDismiss = () => Keyboard.dismiss();

  const handleSearch = () => {
    let results = [];
    if (selectedTypes === 'Di sản') {
      results = siteList.filter(e => {
        if (selectedCategory === null) {
          return true;
        } else if (selected === null) {
          return e.category === selectedCategory.key;
        } else if (selected !== null) {
          return e.category === selectedCategory.key && e.type === selected.key;
        }
        return false;
      });
      results = results.filter(result => result.name.includes(query));
      setMessage('');
    } else {
      results = eventList.filter(result => result.event_name.includes(query));

      setMessage('Event');
    }
    setSearchList(results);
    setShow(true);
    setNoResults(results.length === 0);
  };

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
          {types.map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.categoryItem,
                selectedTypes === type && styles.selectedCategoryItem,
              ]}
              onPress={() => setSelectedTypes(type)}>
              <Text
                style={{
                  color: selectedTypes === type ? 'white' : 'black',
                }}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {menu1.length > 0 && (
          <>
            <Text style={{color: 'black', fontSize: 16}}>Loại di sản: </Text>
            <ScrollView
              horizontal
              style={{flexDirection: 'row', paddingLeft: 10}}>
              {menu1.map(category => (
                <TouchableOpacity
                  key={category.key}
                  style={[
                    styles.categoryItem,
                    selectedCategory?.key === category.key &&
                      styles.selectedCategoryItem,
                  ]}
                  onPress={() => setSelectedCategory(category)}>
                  <Text
                    style={{
                      color: selectedCategory === category ? 'white' : 'black',
                    }}>
                    {category.value}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}
        {menu2.length > 0 && (
          <>
            <Text style={{color: 'black', fontSize: 16}}>Chi tiết: </Text>
            <ScrollView
              horizontal
              style={{flexDirection: 'row', paddingLeft: 10}}>
              {menu2.map(tangible => (
                <TouchableOpacity
                  key={tangible.key}
                  style={[
                    styles.categoryItem,
                    selected?.key === tangible.key &&
                      styles.selectedCategoryItem,
                  ]}
                  onPress={() => setSelected(tangible)}>
                  <Text
                    style={{
                      color: selected === tangible ? 'white' : 'black',
                    }}>
                    {tangible.value}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}
        <Text style={{color: 'black', fontSize: 16}}>Vùng miền:</Text>
        <ScrollView horizontal style={{flexDirection: 'row', paddingLeft: 10}}>
          {regions.map(region => (
            <TouchableOpacity
              key={region.key}
              style={[
                styles.categoryItem,
                selectedRegion?.key === region.key &&
                  styles.selectedCategoryItem,
              ]}
              onPress={() => setSelectedRegion(region)}>
              <Text
                style={{
                  color: selectedRegion?.key === region.key ? 'white' : 'black',
                }}>
                {region.value}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity onPress={handleSearch} style={styles.button}>
          <Text style={styles.buttonText}>Tìm kiếm</Text>
        </TouchableOpacity>
        {show && searchList.length === 0 && (
          <Text style={{color: 'red', textAlign: 'center', marginTop: 10}}>
            Không tìm thấy kết quả
          </Text>
        )}
        {show && searchList.length > 0 && (
          <SearchList dataList={searchList} message={message} />
        )}
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
