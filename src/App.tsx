import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';
import Routes from './routes';
import store from './redux/index'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FlashMessage from "react-native-flash-message";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </Provider>
      <FlashMessage position="top" />
    </GestureHandlerRootView>
  );
};

export default App;
