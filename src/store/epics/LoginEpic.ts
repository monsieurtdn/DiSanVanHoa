/* eslint-disable prettier/prettier */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  catchError,
  concatMap,
  filter,
  switchMap,
} from 'rxjs';
import { AjaxError } from 'rxjs/ajax';
import IdentityApi from '../../api/identity.api';
import Utils, {
  ILoginInfo,
  Profile,
  RootEpic,
  UserData,
} from '../../common/Utils';
import {
  setLoginName,
  setPassword,
  setRefreshToken,
  setRememberLogin,
  setToken,
  setUserInfo,
} from './PersistToSave';
// import {store} from 'store/store';

type MessageLogin = {
  content: string;
  errorCode?: number;
  error?: any;
};
type MessageForgot = {
  ErrorCode?: number;
  Message: string;
};
interface LoginState {
  loading: boolean;
  isSuccess: boolean;
  user: UserData | null;
  message: MessageLogin | undefined;
  messageForgot: MessageForgot | undefined;
  departmentId: number;
  refresh_token: string;
  profile: Profile | null;
  errorMessage: string | null;
  remember: boolean | null;
  userJWT: any | null;
  captchaId: string;
  captchaUrl: string;
}

const initState: LoginState = {
  loading: false,
  isSuccess: false,
  user: null,
  departmentId: 1,
  message: undefined,
  messageForgot: undefined,
  refresh_token: '',
  profile: null,
  errorMessage: null,
  remember: false,
  userJWT: null,
  captchaId: '',
  captchaUrl: '',
};


const loginSlice = createSlice({
  name: 'login',
  initialState: initState,
  reducers: {
    loginRequest(state, _action: PayloadAction<ILoginInfo>) {
      state.loading = true;
    },
    loginSuccess(
      state,
      action: PayloadAction<{
        // user: any;
        remember: boolean;
      }>,
    ) {
      // var profile: Profile = action.payload.user
      //     ? JSON.parse(action.payload.user.profile)
      //     : null;
      state.loading = false;
      state.remember = action.payload.remember;
      state.isSuccess = true;
      // state.profile = profile;
      // state.userJWT = action.payload.user;
      state.captchaUrl = '';
      state.captchaId = '';
    },
    getInfoUser(state, action: PayloadAction<UserData | null>) {
      console.log(action.payload, 'user information');
      state.user = action.payload;
      if (state.remember) {
      console.log(action.payload, 'user information remember');
        Utils.setLocalStorage(Utils.constant.email, action.payload?.email);
        Utils.setLocalStorage(Utils.constant.user, action.payload);
      }
    },
    forgotRequest(state, _action: PayloadAction<string>) {
      state.loading = true;
    },
    sendMailSuccess(state, action: PayloadAction<{message: MessageLogin}>) {
      state.message = action.payload.message;
      state.loading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setLoginSuccess(
      state,
      action: PayloadAction<{
        status: boolean;
        token: string;
        user: UserData;
      }>,
    ) {
      Utils.token = action.payload.token;
      state.user = action.payload.user;
      state.loading = false;
      state.isSuccess = action.payload.status;
      state.captchaUrl = '';
      state.captchaId = '';
    },
    message(state, action: PayloadAction<MessageLogin>) {
      state.message = action.payload;
      state.loading = false;
    },
    messageForgot(state, action: PayloadAction<MessageForgot>) {
      state.messageForgot = action.payload;
      state.loading = false;
    },
    clearMessageRequests(state) {
      state.loading = true;
    },
    clearMessage(state) {
      state.messageForgot = undefined;
      state.message = undefined;
      state.loading = false;
    },
    logout(state) {
      state.messageForgot = undefined;
      state.message = undefined;
      state.loading = false;
      state.user = null;
      state.isSuccess = false;
      Utils.clear();
    },
    getProfile: (state, _action: PayloadAction<void>) => {
      state.loading = true;
    },

    updateProfile: (state, _action: PayloadAction<UserData>) => {
      state.loading = true;
    },
    updateProfileSuccess: (state, action: PayloadAction<UserData>) => {
      state.loading = false;
      state.user = action.payload;
    },
    setCaptcha: (
      state,
      action: PayloadAction<{captchaId: string; captchaUrl: string}>,
    ) => {
      state.captchaId = action.payload.captchaId;
      state.captchaUrl = action.payload.captchaUrl;
    },
    getCaptcha: (_state, _action: PayloadAction<string>) => {},

    failRequest: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      state.loading = false;
      state.errorMessage = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});
// const getProfile$: RootEpic = action$ =>
//   action$.pipe(
//       filter(getProfile.match),
//       switchMap(_re => {
//           return IdentityApi.getProfile().pipe(
//               concatMap((profile: any) => {
//                   console.log(profile, 'profile ở getProfile epic');
//                   return [loginSlice.actions.getInfoUser(profile)];
//               }),
//               catchError((_e: AjaxError) => [
//                   loginSlice.actions.failRequest(
//                       'Có lỗi xảy ra, vui lòng thử lại sau',
//                   ),
//               ]),
//           );
//       }),
//   );
const login$: RootEpic = action$ =>
  action$.pipe(
    filter(loginRequest.match),
    switchMap(re => {
      console.log('Login request received:', re.payload); // Log action received
      return IdentityApi.login({
        identifier: re.payload.userName,
        password: re.payload.password,
      }).pipe(
        concatMap((res: any) => {
          console.log(res, 'esponse'); // Log API response
          const token = res.accessToken;
          const refreshToken = res.refreshToken;
          const userData: UserData = {
            email: res.email,
            userName: res.username,
            phoneNumber: null,
            id: res._id,
            fullName: res.fullname,
            interest_Heritage: res.interest_heritage,
            interest_event: res.interest_event,
          };
          console.log('user Data: ', userData);
          if (re.payload.rememberLogin){
            console.log(token,'::remem');
            Utils.setLocalStorage(Utils.constant.token, token);
            Utils.setLocalStorage(Utils.constant.refresh, refreshToken);
          }
          return [
            loginSlice.actions.loginSuccess({
              remember: re.payload.rememberLogin,
            }),
            getInfoUser(userData),
            setToken(token),
            setRefreshToken(refreshToken),
            setLoginName(re.payload.userName),
            setPassword(re.payload.password),
            setRememberLogin(re.payload.rememberLogin),
            setUserInfo(userData),
          ];
        }),
        catchError((err: AjaxError) => {
          console.log(err, 'error'); // Log errors
          if (err?.name === 'AjaxError') {
            const { status } = err;
            if (err.response) {
              if (status === 400 && err.response.error === 'invalid_grant') {
                return [
                  loginSlice.actions.failRequest(
                    'Đăng nhập lỗi, kiểm tra lại tên đăng nhập và mật khẩu',
                  ),
                ];
              }
              if (status === 400 && err.response.error === 'invalid_request') {
                return [
                  loginSlice.actions.failRequest(
                    'Tài khoản đã bị khóa. Nhập mã captcha để mở lại tài khoản',
                  ),
                  loginSlice.actions.setCaptcha({
                    captchaId: err.response.CaptchaId,
                    captchaUrl: `data:image/png;base64,${err.response.Captcha}`,
                  }),
                ];
              }
            }
          }
          return [
            loginSlice.actions.failRequest(
              'Đăng nhập lỗi, kiểm tra lại tên đăng nhập và mật khẩu',
            ),
          ];
        }),
      );
    }),
  );


export const LoginEpics = [
  login$,
];
export const {
  loginRequest,
  forgotRequest,
  clearMessageRequests,
  getInfoUser,
  updateProfile,
  setCaptcha,
  getCaptcha,
  setErrorMessage,
  logout,
  getProfile,
  setLoginSuccess,
} = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
