import React, {Component} from 'react';
import {Dimensions, PanResponder, View} from 'react-native';

const {width, height} = Dimensions.get('window');
const viewWidth = 200;
const viewHeight = 200;
class Draggable extends Component {
  constructor(props) {
    super(props);
    const initialOffsetX = this.props.initialOffsetX;
    const initialOffsetY = this.props.initialOffsetY;

    this.state = {
      isDragging: false,
      offsetX: initialOffsetX,
      offsetY: initialOffsetY,
      previousOffsetX: initialOffsetX,
      previousOffsetY: initialOffsetY,
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => {
        if (this.props.shouldStartDrag) {
          return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
        }
        return false;
      },
      onMoveShouldSetPanResponder: (e, gestureState) => {
        if (this.props.shouldStartDrag) {
          return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
        }
        return false;r
      },
      onPanResponderGrant: () => {
        this.setState({isDragging: true});
        if (this.props.onDragStart) {
          this.props.onDragStart({
            isDragging: true,
            previousOffsetX: this.state.previousOffsetX,
            previousOffsetY: this.state.previousOffsetY,
            currentOffsetX: this.state.offsetX,
            currentOffsetY: this.state.offsetY,
          });
        }
      },
      onPanResponderMove: (e, gestureState) => {
        if (this.state.isDragging) {
          const {previousOffsetX, previousOffsetY} = this.state;
          const newOffsetX = previousOffsetX + gestureState.dx;
          const newOffsetY = previousOffsetY + gestureState.dy;

          const maxX = width - viewWidth;
          const maxY = height - viewHeight;
          const boundedOffsetX = Math.max(0, Math.min(newOffsetX, maxX));
          const boundedOffsetY = Math.max(0, Math.min(newOffsetY, maxY));

          this.setState({
            offsetX: boundedOffsetX,
            offsetY: boundedOffsetY,
          });

          if (this.props.onDraggging) {
            this.props.onDraggging({
              isDragging: true,
              previousOffsetX: this.state.previousOffsetX,
              previousOffsetY: this.state.previousOffsetY,
              currentOffsetX: boundedOffsetX,
              currentOffsetY: boundedOffsetY,
            });
          }
        }
      },
      onPanResponderRelease: () => {
        this.setState(
          prevState => ({
            isDragging: false,
            previousOffsetX: prevState.offsetX,
            previousOffsetY: prevState.offsetY,
          }),
          () => {
            if (this.props.onDragRelease) {
              this.props.onDragRelease({
                isDragging: false,
                previousOffsetX: this.state.previousOffsetX,
                previousOffsetY: this.state.previousOffsetY,
                currentOffsetX: this.state.offsetX,
                currentOffsetY: this.state.offsetY,
              });
            }
          },
        );
      },
      onPanResponderTerminate: () => {
        this.setState({isDragging: false});
      },
    });
  }

  // This lifecycle method is called whenever props or state change
  componentDidUpdate(prevProps) {
    // Check if the relevant prop has changed
    if (prevProps.shouldStartDrag !== this.props.shouldStartDrag) {
      // Update the state based on the new prop value

      const tempX = !this.props.shouldStartDrag
        ? this.props.initialOffsetX
        : (width * 2) / 3 - viewWidth;
      const tempY = !this.props.shouldStartDrag
        ? this.props.initialOffsetY
        : (height * 2) / 3 - viewHeight;

      this.setState({
        offsetX: tempX,
        offsetY: tempY,
        previousOffsetX: tempX,
        previousOffsetY: tempY,
      });
    }
  }
  // Function to reset the position to the initial state
  resetPosition = () => {
    const {initialOffsetX, initialOffsetY} = this.props;

    this.setState({
      isDragging: false,
      offsetX: initialOffsetX || 0,
      offsetY: initialOffsetY || 0,
      previousOffsetX: 0,
      previousOffsetY: 0,
    });
  };

  render() {
    const {offsetX, offsetY} = this.state;
    const {viewStyle, shouldStartDrag} = this.props;

    return (
      <View
        {...this.panResponder.panHandlers}
        style={{
          position: 'absolute',
          top: offsetY,
          left: offsetX,
          ...(shouldStartDrag && {zIndex: 9999}),
          ...viewStyle,
        }}>
        {this.props.children}
      </View>
    );
  }
}

export default Draggable;
