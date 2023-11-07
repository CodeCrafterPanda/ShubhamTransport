import React, {useEffect} from 'react';
import {Platform, StatusBar} from 'react-native';
// import {useFonts} from 'expo-font';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
// import * as SplashScreen from 'expo-splash-screen';
import Menu from './Menu';
import {Register,Login,Splash} from '../screens';
import {useData, ThemeProvider, TranslationProvider, useAuth} from '../hooks';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default () => {
  const {isDark, theme, setTheme} = useData();
  const {initializing, user} = useAuth();

  /* set the status bar based on isDark constant */
  useEffect(() => {
    Platform.OS === 'android' && StatusBar.setTranslucent(true);
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content');
    return () => {
      StatusBar.setBarStyle('default');
    };
  }, [isDark]);

 

  const navigationTheme = {
    ...DefaultTheme,
    dark: isDark,
    colors: {
      ...DefaultTheme.colors,
      border: 'rgba(0,0,0,0)',
      text: String(theme.colors.text),
      card: String(theme.colors.card),
      primary: String(theme.colors.primary),
      notification: String(theme.colors.primary),
      background: String(theme.colors.background),
    },
  };

  if (initializing) return <Splash/>;
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <TranslationProvider>
        <ThemeProvider theme={theme} setTheme={setTheme}>
          <NavigationContainer theme={navigationTheme}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              {!user ? (
                <>
                  <Stack.Screen name="Register" component={Register} />
                  <Stack.Screen name="Login" component={Login} />
                </>
              ) : (
                <Stack.Screen name="Home" component={Menu} />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </TranslationProvider>
    </>
  );
};
