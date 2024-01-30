/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import MenuNavigator from './src/Navigator';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import axios from 'axios';

// - Conexão com o Realtime Database do Firebase
axios.defaults.baseURL = 'https://lambe-2024-default-rtdb.firebaseio.com/';

const Redux = () => (
  <Provider store={store}>
    <MenuNavigator />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Redux);
