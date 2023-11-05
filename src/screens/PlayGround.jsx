import {View, Text,TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import Draggable from '../utils-cmp/Draggable';
import createNavigationOptions from '../hooks/useCreateScreenOptions';
export default function PlayGround(props) {
  const [x, setX] = React.useState(0);

  // useEffect(() => {
  //   const navigationOptions = createNavigationOptions({
  //     headerTitle: ''+x,
  //     headerRight: () => (
  //       <TouchableOpacity onPress={()=>console.log(x)}>
  //         {/* Your custom headerRight content */}
  //         <Text>{x}</Text>
  //       </TouchableOpacity>
  //     ),
  //   })(props);

  //   // Set the navigation options for this screen
  //   props.navigation.setOptions({
  //     ...navigationOptions,
  //   });
  // }, [x]);
  return (
    <Draggable
      initialOffsetX={20}
      initialOffsetY={20}
      onDragStart={v => console.log(v)}
      onDraggging={v => console.log(v)}
      onDragRelease={v => setX(v.currentOffsetX)}>
      <View
        style={{
          width: 150,
          height: 80,
          backgroundColor: 'green',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
        }}>
        <Text>PlayGround</Text>
      </View>
    </Draggable>
  );
}
