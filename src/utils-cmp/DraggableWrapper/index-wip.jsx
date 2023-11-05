// import React, {Component} from 'react';
// import {Dimensions, PanResponder, View, Animated} from 'react-native';

// const {width, height} = Dimensions.get('window');
// const viewWidth = 200;
// const viewHeight = 200;
// class Draggable extends Component {
//   constructor(props) {
//     super(props);
//     const initialOffsetX = this.props.initialOffsetX;
//     const initialOffsetY = this.props.initialOffsetY;
//     this.isMounted = true; // Flag to track component mount status
//     this.offsetX = new Animated.Value(initialOffsetX || 0);
//     this.offsetY = new Animated.Value(initialOffsetY || 0);
//     this.previousOffsetX = new Animated.Value(initialOffsetX || 0);
//     this.previousOffsetY = new Animated.Value(initialOffsetY || 0);

//     this.panResponder = PanResponder.create({
//       onStartShouldSetPanResponder: () => this.props.shouldStartDrag,
//       onMoveShouldSetPanResponder: () => this.props.shouldStartDrag,
//       onPanResponderGrant: () => {
       
//       },
//       onPanResponderMove: (e, gestureState) => {
       
//           const newOffsetX = this.previousOffsetX + gestureState.dx;
//           const newOffsetY = this.previousOffsetY + gestureState.dy;

//           const maxX = width - viewWidth / 1.5;
//           const maxY = height - viewHeight;
//           const boundedOffsetX = Math.max(0, Math.min(newOffsetX, maxX));
//           const boundedOffsetY = Math.max(0, Math.min(newOffsetY, maxY));

       
         
//           this.updateAnimatedValues(
//             boundedOffsetX,
//             boundedOffsetY,
//             this.previousOffsetX,
//             this.previousOffsetY,
//           );
         
//       },
//       onPanResponderRelease: () => {
//         this.updateAnimatedValues(
//           this.offsetX,
//           this.offsetY,
//           this.offsetX,
//           this.offsetY,
//         );
        
//       },
//       onPanResponderTerminate: () => {
        
//       },
//     });
//   }

//   // This lifecycle method is called whenever props or state change
//   componentDidUpdate(prevProps) {
//     // Check if the relevant prop has changed
//     if (prevProps.shouldStartDrag !== this.props.shouldStartDrag) {
//       // Update the state based on the new prop value

//       const tempX = !this.props.shouldStartDrag
//         ? this.props.initialOffsetX
//         : width - viewWidth;
//       const tempY = !this.props.shouldStartDrag
//         ? this.props.initialOffsetY
//         : height - viewHeight;

     

//       this.updateAnimatedValues(tempX, tempY, tempX, tempY);
//     }
//   }

//   componentDidMount() {
//     this.isMounted = true;
//   }

//   componentWillUnmount() {
//     this.isMounted = false; // Set the flag to false when the component unmounts
//   }
//   // Function to reset the position to the initial state
//   resetPosition = () => {
//     const {initialOffsetX, initialOffsetY} = this.props;

   
//     this.updateAnimatedValues(initialOffsetX, initialOffsetY, 0, 0);
//   };

//   updateAnimatedValues(x, y, pX, pY) {
//     Animated.parallel([
//       Animated.timing(this.offsetX, {
//         toValue: x,
//         duration: 300, // Animation duration in milliseconds
//         useNativeDriver: false, // Required when not animating transform properties
//       }).start(),

//       Animated.timing(this.offsetY, {
//         toValue: y,
//         duration: 300, // Animation duration in milliseconds
//         useNativeDriver: false, // Required when not animating transform properties
//       }).start(),

//       Animated.timing(this.previousOffsetX, {
//         toValue: pX,
//         duration: 300, // Animation duration in milliseconds
//         useNativeDriver: false, // Required when not animating transform properties
//       }).start(),

//       Animated.timing(this.previousOffsetY, {
//         toValue: pY,
//         duration: 300, // Animation duration in milliseconds
//         useNativeDriver: false, // Required when not animating transform properties
//       }),
//     ]).start();
//   }
//   render() {
   
//     const {viewStyle} = this.props;

//     return (
//       <Animated.View
//         {...this.panResponder.panHandlers}
//         style={{
//           position: 'absolute',
//           zIndex: 9999,
//           top: this.offsetY,
//           left: this.offsetX,
//           ...viewStyle,
//         }}>
//         {this.props.children}
//       </Animated.View>
//     );
//   }
// }

// export default Draggable;