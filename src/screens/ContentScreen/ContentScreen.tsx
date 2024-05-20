/* eslint-disable react-native/no-inline-styles */
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-paper';
import PushNotification from 'react-native-push-notification';
import Sound from 'react-native-sound';
import YoutubePlayer from 'react-native-youtube-iframe';
import heritagesApi from '../../api/heritages';
import textToSpeechApi from '../../api/textToSpeech';
import { Header } from '../../components/Header';
interface ContentItem {
  name: string;
  description: string;
}
const getYoutubeVideoId = (url: string) => {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
};
export const ContentScreen: React.FC<any> = ({route}) => {
  const {data: item} = route.params || {};
  const navigation = useNavigation();
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [textContent, setTextContent] = useState<string>('');
  const [showContent, setShowContent] = useState<Record<string, boolean>>(
    Object.fromEntries(contents.map(content => [content.name, true])),
  );
  const contentHeight = React.useMemo(
    () =>
      Object.fromEntries(
        contents.map(content => [content.name, new Animated.Value(0)]),
      ),
    [contents],
  );
  useEffect(() => {
    console.log(item);
  }, [item]);
  // Inside your component
  const soundRef = useRef<Sound | null>(null); // Step 2: Define a ref to hold the sound object

  const showNotification = () => {
    PushNotification.localNotification({
      channelId: 'default-channel-id',
      message: 'Thêm thành công!', // (required)
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 'high', // (optional) default: high
      vibrate: true, // (optional) default: true
    });
  };

  const playSound = (
    soundUrl: string,
    retryCount = 3,
    delayBetweenRetries = 1000,
  ) => {
    const retryPlaySound = (retryLeft: number) => {
      let sound = new Sound(soundUrl, null, error => {
        if (error) {
          console.error('Failed to load the sound', error);
          if (retryLeft > 0) {
            console.log(`Retrying to play sound. Retries left: ${retryLeft}`);
            setTimeout(() => {
              retryPlaySound(retryLeft - 1);
            }, delayBetweenRetries);
          } else {
            console.error('Reached maximum retries. Cannot play sound.');
          }
          return;
        }

        sound.play(success => {
          if (success) {
            console.log('Sound played successfully');
          } else {
            console.error('Failed to play the sound');
          }
          sound.release();
        });
      });

      // Step 3: Update the playSound function to use the ref
      soundRef.current = sound;
    };

    retryPlaySound(retryCount);
  };

  useFocusEffect(
    React.useCallback(() => {
      // This will be called when the screen is focused
      return () => {
        // This will be called when the screen is unfocused
        if (soundRef.current) {
          soundRef.current.stop(); // Stop the sound if it's playing
          soundRef.current.release(); // Release the sound resources
          soundRef.current = null; // Reset the ref
        }
      };
    }, []),
  );
  const toggleContent = (name: string) => {
    setShowContent(prevState => ({
      ...prevState,
      [name]: !prevState[name],
    }));
    Animated.timing(contentHeight[name] as Animated.Value, {
      toValue: showContent[name] ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    setContents(item.content);
  }, [item.content]);
  const [voice, setVoice] = useState<string>('');
  useEffect(() => {
    const subscription = textToSpeechApi
      .getSpeechFromText(textContent)
      .subscribe(
        (response: any) => {
          // Handle the successful response here
          console.log('response:::', response);
          setVoice(response?.async ? response.async : '');
        },
        (error: any) => {
          // Handle errors here
          console.error('Error calling api:', error);
        },
      );

    // Cleanup subscription when component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, [textContent]);
  useEffect(() => {
    playSound(voice);
  }, [voice]);
  const getLocation = (item: any) => {
    if (item.location && item.location.trim() !== '') {
      return item.location;
    }
    return `${item.address}, ${item.province_name}`;
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
            {item.name}
          </Text>
        }
        handleGoBack={() => {
          navigation.goBack();
        }}
      />
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ImageBackground
          source={{
            uri: item.image_link,
          }}
          style={styles.backgroundImage}
        />
        <ScrollView style={{paddingTop: 20}}>
          <Text
            style={{
              fontSize: 23,
              fontWeight: 'bold',
              color: 'black',
              textAlign: 'center',
              marginBottom: 15,
            }}>
            {item.name}
          </Text>
          <View style={{flexDirection: 'row', paddingLeft: 10}}>
            <Icon size={20} source={'map-marker'} color="black" />
            <Text style={{fontSize: 15, color: 'black'}}>
              {getLocation(item)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.interestButton}
            onPress={() => {
              heritagesApi.addHeritagesToFavByID(item._id);
              showNotification();
            }}>
            <Text style={styles.buttonText}>Quan tâm</Text>
          </TouchableOpacity>
          {contents.map((content, index) => (
            <View
              key={index}
              style={{paddingHorizontal: 10, paddingVertical: 20}}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {
                    toggleContent(content.name);
                  }}
                  style={{flexDirection: 'row'}}>
                  <Text
                    style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>
                    {content.name}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setTextContent(content.description);
                  }}>
                  <Icon size={20} source={'volume-source'} color="black" />
                </TouchableOpacity>
              </View>
              {showContent[content.name] && (
                <Animated.View
                  style={{
                    height: 'auto',
                  }}>
                  <Text style={{fontSize: 15, color: 'black'}}>
                    {content.description}
                  </Text>
                </Animated.View>
              )}
            </View>
          ))}
          <YoutubePlayer
            videoId={getYoutubeVideoId(item.video_link) || undefined}
            height={300}
          />
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  interestButton: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    backgroundColor: '#005BA5',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: 150,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
