/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { LoginScreen } from '../screens/Auth/LoginScreen';
import { UserInfoScreen } from '../screens/Auth/UserInfoScreen'; // Đảm bảo rằng bạn đã tạo và xuất màn hình này
import { MainScreen } from '../screens/MainScreen/MainScreen';
import { RootState } from '../store/reducers'; // Đảm bảo đường dẫn đúng
import { useSelectorRoot } from '../store/store';

const Tab = createBottomTabNavigator();

const BottomNavigationBar: React.FC = () => {
  // Sử dụng useSelector để truy cập trạng thái đăng nhập từ Redux
  const isLoggedIn = useSelectorRoot((state: RootState) => state.login.isSuccess);
  const renderTabBarLabel = (focused: boolean, label: string) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        style={{
          color: focused ? '#1381E7' : '#595959',
          fontSize: 14,
          fontWeight: focused ? '600' : '400',
        }}>
        {label}
      </Text>
    </View>
  );

  const renderTabBarIcon = (focused: boolean, iconName: string) => (
    <IconButton
      icon={iconName}
      iconColor={focused ? '#1381E7' : '#595959'}
      style={{ height: 24, width: 24 }}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            height: '8%',
            padding: 5,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={MainScreen}
          options={{
            headerShown: false,
            tabBarLabel: ({ focused }) => renderTabBarLabel(focused, 'Menu'),
            tabBarIcon: ({ focused }) => renderTabBarIcon(focused, 'home'),
          }}
        />
        <Tab.Screen
          name="Login"
          component={isLoggedIn ? UserInfoScreen : LoginScreen}
          options={{
            headerShown: false,
            tabBarLabel: ({ focused }) => renderTabBarLabel(focused, 'Account'),
            tabBarIcon: ({ focused }) => renderTabBarIcon(focused, 'account'),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default BottomNavigationBar;
