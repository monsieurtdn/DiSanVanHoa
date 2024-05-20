/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Badge } from 'react-native-paper';
import CQuestionModel from '../../components/CQuestionModel';
import { Header } from '../../components/Header';
import { logout } from '../../store/epics/LoginEpic';
import { RootState } from '../../store/reducers';
import { useDispatchRoot, useSelectorRoot } from '../../store/store';

interface INavigation {
  navigation: any;
}

export const UserInfoScreen: React.FC<INavigation> = props => {
  const {navigation} = props;
  const dispatch = useDispatchRoot();
  const [modalVisible, setModalVisible] = useState(false);
  const handleOpenWebsite = () => {
    Linking.openURL('https://example.com');
  };

  const userData = useSelectorRoot((state: RootState) => state.persist);
  const LogoutButton = () => (
    <>
      <CQuestionModel
        isVisible={modalVisible}
        title={'Đăng xuất'}
        message={'Bạn có chắc muốn đăng xuất không?'}
        onClick={value => {
          setModalVisible(false);
          if (value) {
            dispatch(logout());
            navigation.replace('LoginScreen');
          }
        }}
      />
    </>
  );
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
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
            Thông tin người dùng
          </Text>
        }
        handleGoBack={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.container}>
        <Image
          source={{
            uri: 'data:image/png;base64,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',
          }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.label}>Họ tên:</Text>
          <Text style={styles.info}>{userData.userInfo.fullName}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.info}>{userData.userInfo.email}</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate('InterestSites');
          }}>
          <Text style={styles.buttonText}>
            Quản lý danh sách di sản quan tâm
          </Text>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Badge style={styles.badgeContainer}>
              {userData.userInfo.interest_Heritage.length}
            </Badge>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate('InterestEvent');
          }}>
          <Text style={styles.buttonText}>
            Quản lý danh sách sự kiện quan tâm
          </Text>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Badge style={styles.badgeContainer}>
              {userData.userInfo.interest_event.length}
            </Badge>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginVertical: 20,
            width: 150,
            paddingHorizontal: 20,
            paddingVertical: 10,
            alignItems: 'center',
            backgroundColor: '#FF0000',
            alignSelf: 'center',
            borderRadius: 20,
          }}
          onPress={() => setModalVisible(true)}>
          <Text style={{fontSize: 15, color: 'white', fontWeight: 'bold'}}>
            Đăng xuất
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleOpenWebsite}
          style={{alignItems: 'center'}}>
          <Text style={styles.linkText}>Đến website cập nhật thông tin</Text>
        </TouchableOpacity>
      </View>
      {modalVisible && <LogoutButton />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    marginTop: 50,
  },
  userInfo: {
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  buttonContainer: {
    width: '100%',
    borderColor: 'black',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically in the center
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
    flex: 1, // Takes up remaining space, pushing badge to the right
  },
  linkText: {
    fontSize: 15,
    color: 'blue',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  badgeText: {
    color: '#fff',
  },
  badgeContainer: {
    borderColor: '#888888',
    borderWidth: 1,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
