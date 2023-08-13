import React from "react";
import { useWindowDimensions } from "react-native";

export default function useScreensize() {
  const { width, height } = useWindowDimensions();
  const [values, setValues] = React.useState(getValues());

  function getValues() {
    return {
      width,
      height,
      isBigDevice: width >= 393,
    };
  }

  React.useEffect(() => {
    setValues(getValues());
  }, [width, height]);

  return values;
}
