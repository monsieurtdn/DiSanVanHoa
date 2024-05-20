import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { LoginScreen } from './src/screens/Auth/LoginScreen';
import { UserInfoScreen } from './src/screens/Auth/UserInfoScreen';
import { ContentScreen } from './src/screens/ContentScreen/ContentScreen';
import { EventContentScreen } from './src/screens/ContentScreen/EventContentScreen';
import { InterestEventsScreen } from './src/screens/Interest/InterestEvents';
import { InterestSitesScreen } from './src/screens/Interest/InterestSites';
import { MainScreen } from './src/screens/MainScreen/MainScreen';
import { SearchScreen } from './src/screens/SearchScreen/SearchScreen';
import { WelcomeScreen } from './src/screens/WelcomeScreen/WelcomeScreen';

import { store } from './src/store/store';
import TabNavigatorRoutesLead from './src/tab/TabNavigatorRoutesLead';
const Stack = createStackNavigator();
const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const persistor = persistStore(store);
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
              <Stack.Screen
                name="Auth"
                component={Auth}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="UserInfoScreen"
                component={UserInfoScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="InterestEvent"
                component={InterestEventsScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="InterestSites"
                component={InterestSitesScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ContentScreen"
                component={ContentScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EventContentScreen"
                component={EventContentScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Main"
                component={MainScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="TabNavigatorRoutesLead"
                component={TabNavigatorRoutesLead}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
