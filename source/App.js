import React from 'react';
import {LogBox} from 'react-native';
import BaseStack from './Base';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducer';
import thunk from 'redux-thunk';
import { getData } from './utils/async-storage';

const App = () => {
  const store = createStore(reducers, applyMiddleware(thunk));
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <BaseStack />
    </Provider>
  );
};

export default App;
