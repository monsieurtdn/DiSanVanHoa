import AsyncStorage from '@react-native-async-storage/async-storage';
import {AnyAction} from '@reduxjs/toolkit';
import {Epic} from 'redux-observable';
import {RootState} from '../store/reducers';

export interface Profile {
  Id: string;
  UserName: string;
  Firstname: string;
  Lastname: string;
  Email: string;
  PhoneNumber: string;
  InvitationStatus: string;
  ForcePasswordChange: boolean;
}

export interface UserData {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string | null;
  fullName: string;
  interest_Heritage: any[];
  interest_event: any[];
}

export interface ILoginInfo {
  userName: string;
  password: string;
  rememberLogin: boolean;
}
export interface ResponseToken {
  accessToken: string;
  refreshToken?: string;
  error: string;
  jwt: string;
  user: UserData;
}

export type RootEpic = Epic<AnyAction, AnyAction, RootState>;
class Utils {
  static token: any;
  static profile: Profile | null;
  static refresh: string;
  static loginInfo: ILoginInfo;
  static throttleTimer: boolean;
  static constant = {
    token: 'token',
    username: 'username',
    role: 'role',
    email: 'email',
    user: 'user',
    refresh: 'refresh_token',
    loginInfo: 'loginInfo',
  };

  static async setLocalStorage(key: string, value: unknown): Promise<void> {
    console.log('key:', key);
    console.log('value:', value);
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }
  static async getValueLocalStorage(key: string): Promise<any> {
    try {
      const value = await AsyncStorage.getItem(key);
      console.log('key:', key);
      console.log('value:', value);
      let parsedValue = null;
      if (value) {
        parsedValue = Utils.parseJson(value);
      }
      return parsedValue;
    } catch (error) {
      console.error('Failed to get local storage value', error);
      return null;
    }
  }

  static parseJson(str: string): any | null {
    try {
      return JSON.parse(str);
    } catch (e) {
      return null;
    }
  }

  static async clear(): Promise<void> {
    await AsyncStorage.clear();
  }
  static convertExpToDate = (exp: any) => {
    // Xác định xem số exp là giây hay mili giây
    if (exp.toString().length > 10) {
      // Nếu số exp đã là mili giây, sử dụng nó trực tiếp
      exp = parseInt(exp, 10);
    } else {
      // Nếu số exp là giây, chuyển đổi thành mili giây
      exp = parseInt(exp, 10) * 1000;
    }

    // Chuyển đổi thành ngày và giờ
    var date = new Date(exp);

    return date.getTime();
  };
}
export default Utils;
