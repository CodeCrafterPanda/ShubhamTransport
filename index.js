/**
 * @format
 */

import {AppRegistry,Platform } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
// if (Platform.OS === 'web') {
//     const rootTag = document.getElementById('root') || document.getElementById(appName);
//     AppRegistry.runApplication(appName, { rootTag });
// }



