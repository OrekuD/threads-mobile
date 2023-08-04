import React from "react";
import { Dimensions } from "react-native";

export default function useScreensize() {
  const [values, setValues] = React.useState(getValues());

  function getValues() {
    return {
      isBigDevice: Dimensions.get("screen").width >= 393,
    };
  }

  Dimensions.addEventListener("change", (event) => {
    setValues({
      isBigDevice: event.screen.width >= 393,
    });
  });

  return values;
}
