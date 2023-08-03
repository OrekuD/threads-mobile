import React from "react";
import { Keyboard, Platform } from "react-native";

export default function useKeyboard() {
  const [isKeyboardVisible, setIsKeyboardVisible] = React.useState(false);
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);

  React.useEffect(() => {
    const onKeyboardShow = Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow",
      (event) => {
        setIsKeyboardVisible(true);
        setKeyboardHeight(event.endCoordinates.height);
      }
    );

    const onKeyboardHide = Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide",
      () => {
        setIsKeyboardVisible(false);
        setKeyboardHeight(0);
      }
    );

    return () => {
      onKeyboardShow.remove();
      onKeyboardHide.remove();
    };
  }, []);

  return {
    isKeyboardVisible,
    keyboardHeight,
  };
}
