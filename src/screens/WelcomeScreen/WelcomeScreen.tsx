/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import eventsApi from '../../api/events';
import heritagesApi from '../../api/heritages';
import Utils, { ResponseToken } from '../../common/Utils';
import Carousel from '../../components/Carousel';
import { setLoginSuccess } from '../../store/epics/LoginEpic';
import { addEvent, addSite, resetValue } from '../../store/slices/siteSlices';
import { useDispatchRoot } from '../../store/store';
interface INavigation {
  navigation: any;
}
type ImageData = {img: number}[];

const imageData: ImageData = [
  {img: require('../../../images/welcome1.jpg')},
  {img: require('../../../images/welcome2.jpg')},
  {img: require('../../../images/welcome3.jpg')},
];
export const WelcomeScreen: React.FC<INavigation> = props => {
  const {navigation} = props;
  const [access, setAccess] = useState<boolean>(false);
  useEffect(() => {
    if (access === true) {
      navigation.navigate('TabNavigatorRoutesLead');
    }
  });
  const [dataHeritage, setDataHeritage] = useState<any[]>([]);
  const [dataEvent, setDataEvent] = useState<any[]>([]);

  useEffect(() => {
    if (!Utils.token) {
      Utils.getValueLocalStorage(Utils.constant.token).then(
        async (token: ResponseToken) => {
          if (token != null) {
            var data = await Utils.getValueLocalStorage(Utils.constant.user);
            dispatch(
              setLoginSuccess({
                status: true,
                token: token.jwt,
                user: data,
              }),
            );
          }
        },
      );
    }
  }, []);

  useEffect(() => {
    const subscriptionHeritage = heritagesApi.getAllHeritages().subscribe(
      response => {
        console.log('heritage: ', response);
        // Handle the successful response here
        setDataHeritage(response);
      },
      error => {
        // Handle errors here
        console.error('Error calling getAllSites:', error);
      },
    );
    const subscriptionEvent = eventsApi.getAllEvents().subscribe(
      response => {
        console.log('events: ', response);
        // Handle the successful response here
        setDataEvent(response);
      },
      error => {
        // Handle errors here
        console.error('Error calling getAllSites:', error);
      },
    );
    // Cleanup subscription when component unmounts
    return () => {
      subscriptionHeritage.unsubscribe();
      subscriptionEvent.unsubscribe();
    };
  }, []);
  const dispatch = useDispatchRoot();
  useEffect(() => {
    dispatch(resetValue());
    dataHeritage.map(item => {
      dispatch(
        // addListProduct(Products[`${data.name}`])
        addSite({
          _id: item._id,
          name: item.name,
          location: item.address + ', ' + item.province_name,
          content: item.content,
          source: item.author,
          image_link: item.image_link,
          region: item.region,
          video_link: item.video_link,
          type: item.type,
          category: item.category,
        }),
      );
      console.log('success heritage!');
    });

    dataEvent.map(item => {
      dispatch(
        addEvent({
          _id: item._id,
          event_name: item.event_name,
          event_date: item.event_date,
          author: item.author,
          content: item.content,
          image_link: item.image_link,
          video_link: item.video_link,
        }),
      );
      console.log('success Event!');
    });
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundImage}>
        <Carousel data={imageData} />
      </View>
      <View>
        <View style={{marginTop: -325}}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              maxWidth: 300,
              marginBottom: 40,
              paddingLeft: 0,
            }}>
            <Image
              source={require('../../../images/logo.jpg')}
              style={{
                height: 60,
                width: 60,
                marginHorizontal: 20,
              }}
            />
            <Text
              style={{
                color: 'white',
                fontSize: 34,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Di Sản Việt Nam
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
                textAlign: 'center',
                paddingBottom: 15,
              }}>
              Welcome to Viet Nam!
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#005BA5',
              gap: 10,
              borderRadius: 6,
              width: 342,
              position: 'absolute',
              top: 500,
              left: -20,
              height: 48,
            }}
            activeOpacity={0.7}
            onPress={() => setAccess(true)}>
            <Text style={styles.buttonText}>Bắt đầu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Hoặc 'contain' tùy thuộc vào yêu cầu của bạn
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
  },
});
