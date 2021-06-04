import React from 'react';
import { registerRootComponent } from 'expo'
import { Provider } from 'react-redux';
import configureStore from './core/store/configStore';
import RooterApp from './router'

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <RooterApp />
    </Provider>
  );
}

export default registerRootComponent(App);