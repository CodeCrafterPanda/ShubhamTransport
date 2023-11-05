import React, {Component} from 'react';
import {Dimensions, PanResponder, View} from 'react-native';

const {width, height} = Dimensions.get('window');
const viewWidth = 200;
const viewHeight = 200;
class Draggable extends Component {
  constructor(props) {
    super(props);

    const initialOffsetX = this.props.initialOffsetX || 0;
    const initialOffsetY = this.props.initialOffsetY || 0;

    this.state = {
      isDragging: false,
      offsetX: initialOffsetX,
      offsetY: initialOffsetY,
      previousOffsetX: 0,
      previousOffsetY: 0,
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
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

          const maxX = width - viewWidth / 1.5;
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

  render() {
    const {offsetX, offsetY} = this.state;
    const {viewStyle} = this.props;

    return (
      <View
        {...this.panResponder.panHandlers}
        style={{
          position: 'absolute',
          zIndex: 9999,
          top: offsetY,
          left: offsetX,
          ...viewStyle,
        }}>
        {this.props.children}
      </View>
    );
  }
}

export default Draggable;
