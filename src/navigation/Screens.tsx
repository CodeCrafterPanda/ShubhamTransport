import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Home, Profile, Register, Login} from '../screens';
import {useScreenOptions, useTranslation, useAuth} from '../hooks';

const Stack = createStackNavigator();

export default () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();
  const {token} = useAuth();

  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: t('navigation.home')}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{title: t('navigation.home')}}
      />
    </Stack.Navigator>
  );
};
