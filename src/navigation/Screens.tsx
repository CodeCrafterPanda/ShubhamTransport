import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Articles,
  Components,
  Home,
  Profile,
  Register,
  Pro,
  PlayGround,
  Notes,
  Videos,
  Videos_Notes,
  Exam,
  Timer,
} from '../screens';
import {useScreenOptions, useTranslation, useAuth} from '../hooks';

const Stack = createStackNavigator();

export default () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();
  const {token} = useAuth();

  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
      {token ? (
        <></>
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={PlayGround}
            options={{title: t('navigation.home')}}
          />
          <Stack.Screen
            name="Components"
            component={Components}
            options={screenOptions.components}
          />

          <Stack.Screen
            name="Articles"
            component={Articles}
            options={{title: t('navigation.articles')}}
          />

          <Stack.Screen
            name="Notes"
            component={Notes}
            options={{title: t('navigation.articles')}}
          />

          <Stack.Screen
            name="Videos"
            component={Videos}
            options={{title: t('navigation.articles')}}
          />

          <Stack.Screen
            name="Videos_Notes"
            component={Videos_Notes}
            options={{title: t('navigation.articles')}}
          />
          <Stack.Screen
            name="Timer"
            component={Timer}
            options={{title: t('navigation.articles')}}
          />
          <Stack.Screen
            name="Exam"
            component={Exam}
            options={{title: t('navigation.articles')}}
          />
          <Stack.Screen
            name="Pro"
            component={Pro}
            options={screenOptions.pro}
          />

          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
