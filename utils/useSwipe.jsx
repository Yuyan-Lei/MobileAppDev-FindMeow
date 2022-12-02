// reference: https://stackoverflow.com/questions/45854450/detect-swipe-left-in-react-native
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;

export function useSwipe(onSwipeLeft, onSwipeRight, rangeOffset = 3) {
  let firstTouchX = 0;
  let firstTouchY = 0;

  function onTouchStart(e) {
    firstTouchX = e.nativeEvent.pageX;
    firstTouchY = e.nativeEvent.pageY;
  }

  function onTouchEnd(e) {
    const positionX = e.nativeEvent.pageX;
    const positionY = e.nativeEvent.pageY;
    const range = windowWidth / rangeOffset;

    // ignore moving by Y axis
    if (Math.abs(positionY - firstTouchY) > windowWidth / 8) return;

    if (positionX - firstTouchX > range) {
      onSwipeRight && onSwipeRight();
    } else if (firstTouchX - positionX > range) {
      onSwipeLeft && onSwipeLeft();
    }
  }

  return { onTouchStart, onTouchEnd };
}

export function useSwipePressable(onPress, rangeOffset = 8) {
  let firstTouchX = 0;
  let firstTouchY = 0;

  function onTouchStart(e) {
    firstTouchX = e.nativeEvent.pageX;
    firstTouchY = e.nativeEvent.pageY;
  }

  function onTouchEnd(e) {
    const positionX = e.nativeEvent.pageX;
    const positionY = e.nativeEvent.pageY;
    const range = windowWidth / rangeOffset;

    if (
      Math.abs(positionX - firstTouchX) < range &&
      Math.abs(positionY - firstTouchY) < range
    ) {
      onPress && onPress();
    }
  }

  return { onTouchStart, onTouchEnd };
}
