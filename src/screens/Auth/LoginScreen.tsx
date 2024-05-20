/* eslint-disable react-native/no-inline-styles */
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import Utils from '../../common/Utils';
import CCheckBox from '../../components/CCheckBox';
import CTextInput from '../../components/CTextInput';
import { loginRequest, setErrorMessage } from '../../store/epics/LoginEpic';
import { useDispatchRoot, useSelectorRoot } from '../../store/store';

export const LoginScreen = () => {
  const dispatch = useDispatchRoot();
  const {message, loading, isSuccess, errorMessage} = useSelectorRoot(
    state => state.login,
  );
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = (value: boolean) => {
    setIsChecked(value);
  };

  useEffect(() => {
    if (isSuccess) {
      loginSuccess();
    }
  }, [isSuccess]);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (message && message.content && message.content !== '') {
      showError(message.content.split('_').join(' '));
    } else {
      if (isLoading) {
        setLoading(false);
      }
    }
  }, [message]);

  useEffect(() => {
    console.log('data: ', message, loading, isSuccess, errorMessage);
  }, [errorMessage, isSuccess, loading, message]);

  const showError = (error: any) => {
    if (isLoading) {
      setLoading(false);
    }
    if (error.error) {
      setErrorText(error.error);
    }
    if (error as string) {
      setErrorText(error);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      showError(errorMessage);
      dispatch(setErrorMessage(''));
    }
  }, [errorMessage]);

  const handleLogin = () => {
    setErrorText('');
    console.log(isChecked);
    if (!userEmail) {
      showError('Email không được để trống');
      return;
    }
    if (!userPassword) {
      showError('Mật khẩu không được để trống');
      return;
    }
    setLoading(true);
    dispatch(
      loginRequest({
        userName: userEmail,
        password: userPassword,
        rememberLogin: isChecked,
      }),
    ); // Dispatch loginRequest action
  };

  const loginSuccess = () => {
    setLoading(false);
    console.log('success');
    const loginInfo = {
      userName: userEmail,
      password: userPassword,
      rememberLogin: isChecked,
    };
    Utils.loginInfo = loginInfo;
    dispatch(setErrorMessage(''));
    navigation.replace('UserInfoScreen');
  };
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../../images/LoginBackground.jpg')}
        style={{
          flex: 1,
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            justifyContent: 'center',
            alignContent: 'center',
            minHeight: '100%',
          }}>
          <KeyboardAvoidingView enabled>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: 20,
              }}>
              <Image
                source={require('../../../images/logo.jpg')}
                style={{
                  resizeMode: 'contain',
                  // margin: 15,
                  width: 120,
                  height: 120,
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
              <Text style={styles.labelStyle}>Email</Text>
              <CTextInput
                style={styles.inputStyle} // Thay đổi màu chữ thành màu đen
                onChangeText={x => setUserEmail(x)}
                placeholder="Nhập email đã đăng ký"
                keyboardType="email-address"
                placeholderTextColor={'#BFBFBF'}
              />
            </View>
            <View style={styles.SectionStyle}>
              <Text style={styles.labelStyle}>Mật khẩu</Text>
              <CTextInput
                onChangeText={x => setUserPassword(x)}
                placeholder="Nhập mật khẩu"
                secureTextEntry={!showPassword}
                onSubmitEditing={Keyboard.dismiss}
                rightComponnent={
                  <IconButton
                    icon={!showPassword ? 'eye' : 'eye-off'}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                placeholderTextColor={'#BFBFBF'}
                style={styles.inputStyle} // Thay đổi màu chữ thành màu đen
              />
            </View>

            <View style={styles.checkboxStyle}>
              <CCheckBox
                onChangeValue={handleOnChange}
                label={'Lưu đăng nhập'}
                labelColor="rgba(0, 91, 165, 1)"
              />
              {/* <TouchableOpacity
                            onPress={() => {
                                console.log('vừa nhấn');
                            }}>
                            <Text style={styles.forgetPasswordTextStyle}>
                                Quên mật khẩu
                            </Text>
                        </TouchableOpacity> */}
            </View>
            {errorText !== '' ? (
              <Text style={styles.errorTextStyle}>{errorText}</Text>
            ) : (
              <></>
            )}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleLogin}>
              <Text style={styles.buttonTextStyle}>Đăng nhập</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    alignContent: 'center',
  },
  inputTitle: {
    flexDirection: 'row',
    height: 19,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    marginBottom: -10,
    fontWeight: '500',
    color: '#1a2b40',
  },
  SectionStyle: {
    flexDirection: 'column',
    rowGap: 5,
    height: 75,
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    borderRadius: 0,
    justifyContent: 'space-between',
  },
  checkboxStyle: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 35,
    marginTop: 10,
  },
  bottomStyle: {
    flexDirection: 'row',
    height: 40,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    marginTop: 0,
    borderRadius: 0,
    justifyContent: 'center',
  },
  labelStyle: {
    fontWeight: '700',
    letterSpacing: 0.5,
    color: 'rgba(0, 91, 165, 1)',
  },
  buttonStyle: {
    backgroundColor: 'rgba(0, 91, 165, 1)',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '##667080',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 15,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 7,
  },
  buttonTextStyle: {
    color: '#ffffff',
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: '500',
  },
  inputStyle: {
    flex: 1,
    color: '#18273A',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  noAccountTexttyle: {
    color: '#7A7A7A',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  registerTextStyle: {
    color: '#1676F3',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
    paddingHorizontal: 20,
  },
  captchaContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  captchaImg: {
    flex: 1,
    resizeMode: 'contain',
  },
  forgetPasswordTextStyle: {
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    color: 'rgba(0, 91, 165, 1)',
  },
});
