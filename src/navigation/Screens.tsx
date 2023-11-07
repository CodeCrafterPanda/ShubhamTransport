import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Home,
  Profile,
  Register,
  Customers,
  Users,
  Trucks,
  Trips,
  Payments,
  Expenses,
  Savings,
  Drivers,
  Login
} from '../screens';
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
        name="Users"
        component={Users}
        options={{title: t('navigation.users')}}
      />

      <Stack.Screen
        name="Trucks"
        component={Trucks}
        options={{title: t('navigation.trucks')}}
      />

      <Stack.Screen
        name="Trips"
        component={Trips}
        options={{title: t('navigation.trips')}}
      />

      <Stack.Screen
        name="Payments"
        component={Payments}
        options={{title: t('navigation.payments')}}
      />

      <Stack.Screen
        name="Expenses"
        component={Expenses}
        options={{title: t('navigation.expenses')}}
      />
      <Stack.Screen
        name="Savings"
        component={Savings}
        options={{title: t('navigation.savings')}}
      />
      <Stack.Screen
        name="Customers"
        component={Customers}
        options={{title: t('navigation.customers')}}
      />
      <Stack.Screen
        name="Drivers"
        component={Drivers}
        options={{title: t('navigation.drivers')}}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{title: t('navigation.home')}}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
