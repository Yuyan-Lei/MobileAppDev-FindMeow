// reference: https://stackoverflow.com/questions/45854450/detect-swipe-left-in-react-native
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

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
    if (Math.abs(positionY - firstTouchY) > windowHeight / 8) return;

    // Identify as a valid swipe, only if the swipe distance is 
    // larger than 1/3 width.
    if (positionX - firstTouchX > range) {
      onSwipeRight && onSwipeRight();
    } else if (firstTouchX - positionX > range) {
      onSwipeLeft && onSwipeLeft();
    }
  }

  return { onTouchStart, onTouchEnd };
}

// If the user is swiping, then make pressables on the catcard 
// and breeder card not pressed.
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
