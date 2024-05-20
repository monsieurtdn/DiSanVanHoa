/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootState} from '../../store/reducers';
import {useSelectorRoot} from '../../store/store';
import {SearchBar} from '../SearchScreen/components/Buttons';
import {EventsList} from './Components/EventList';
import {PlacesList} from './Components/PlacesList';
interface INavigation {
  navigation: any;
}

export const MainScreen: React.FC<INavigation> = props => {
  const {navigation} = props;
  const sitesList = useSelectorRoot((state: RootState) => state.site.sites);
  const EventList = useSelectorRoot((state: RootState) => state.site.events);
  useEffect(() => {
    console.log('site: ', sitesList);
    console.log('event: ', EventList);
  }, [EventList, sitesList]);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ImageBackground
        source={require('../../../images/cover.png')}
        style={styles.backgroundImage}>
        <View
          style={{
            width: '100%',
            height: 250,
            justifyContent: 'center',
            backgroundColor:
              'linear-gradient(90deg, rgba(0,0,0,0.47522759103641454) 0%, rgba(0,0,0,1) 100%)',
          }}
        />
      </ImageBackground>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SearchScreen');
          }}>
          <View style={styles.header}>
            <SearchBar />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: 'absolute',
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          alignSelf: 'flex-end',
          width: '100%',
          height: '100%',
          paddingTop: 250,
          zIndex: 1,
        }}>
        <KeyboardAvoidingView
          enabled
          behavior="position"
          keyboardVerticalOffset={-100}>
          <ScrollView>
            <View
              style={{
                flex: 1,
                flexWrap: 'wrap',
                width: '100%',
                height: '100%',
                backgroundColor: '#FFFFFF',
                borderTopRightRadius: 12,
                borderTopLeftRadius: 12,
              }}>
              <View style={{paddingTop: 20}}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    paddingLeft: 10,
                    color: 'black',
                  }}>
                  Các địa danh
                </Text>
                <View style={{paddingLeft: 5}}>
                  <PlacesList />
                </View>
              </View>
              <View style={{paddingTop: 20}}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                    paddingLeft: 10,
                    color: 'black',
                  }}>
                  Các sự kiện sắp diễn ra
                </Text>
                <View style={{paddingLeft: 5}}>
                  <EventsList />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    backgroundColor: 'white',
    alignContent: 'center',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 25,
    marginLeft: '7%',
    margin: -10,
    zIndex: 50,
  },
  modalContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    position: 'relative',
  },
  mainView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  modalContentHeadAndBody: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  backgroundImage: {
    // flex: 1,
    width: '100%',
    height: 250,
    resizeMode: 'contain', // Để hình nền căn vừa với kích thước của view
    justifyContent: 'center',
  },
  container: {
    position: 'absolute',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 20,
    zIndex: 2,
  },
  headerLeftStyle: {
    width: '100%',
    display: 'flex',
    // flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  search: {
    backgroundColor: 'white', // Thay đổi màu nền của Searchbar thành trắng
    borderRadius: 20,
    marginLeft: 10,
    height: 36,
    marginRight: 10,
    width: '95%',
  },
});
