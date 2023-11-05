import { DrawerActions } from '@react-navigation/native';
import { CardStyleInterpolators } from '@react-navigation/stack';
import React from 'react';

import Button from '../components/Button';
import Text from '../components/Text';

const createNavigationOptions = initialOptions => {
  return props => {
    const {
      headerStyle,
      headerTitleAlign,
      headerTitleContainerStyle,
      headerLeftContainerStyle,
      headerRightContainerStyle,
      cardStyleInterpolator,
      headerTitle,
      headerLeft,
      headerRight,
      ...rest
    } = initialOptions;

    return {
      headerStyle: headerStyle || {elevation: 0},
      headerTitleAlign: headerTitleAlign || 'left',
      headerTitleContainerStyle: headerTitleContainerStyle || {},
      headerLeftContainerStyle: headerLeftContainerStyle || {},
      headerRightContainerStyle: headerRightContainerStyle || {},
      cardStyleInterpolator:
        cardStyleInterpolator || CardStyleInterpolators.forHorizontalIOS,
      headerTitle: headerTitle || (({children}) => <Text p>{children}</Text>),
      headerLeft:
        headerLeft ||
        (() => (
          <Button 
            onPress={() =>
              props.navigation.dispatch(DrawerActions.toggleDrawer())
            }>
            <Text p>*</Text>
          </Button>
        )),
      headerRight: headerRight || null,
      ...rest,
    };
  };
};

export default createNavigationOptions;
