import useScreensize from "@/hooks/useScreensize";
import React from "react";
import { Image, View } from "react-native";
import Animated from "react-native-reanimated";

export default function ImagesScreen() {
  const { width } = useScreensize();
  const [dimensions, setDimensions] = React.useState({
    width: width,
    height: 0,
  });

  React.useEffect(() => {
    Image.getSize("https://picsum.photos/250", (imageWidth, imageHeight) => {
      // Calculate the correct height in accordance with width
      const scaleFactor = imageWidth / width;
      const height = imageHeight / scaleFactor;
      setDimensions({ width, height });
    });
  }, [width]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Animated.Image
        source={{ uri: "https://picsum.photos/250" }}
        style={[
          dimensions,
          {
            resizeMode: "contain",
          },
        ]}
        sharedTransitionTag="image-0"
      />
    </View>
  );
}

// import { Stack } from "expo-router";

// export default function Layout() {
//   <Stack>
//     <Stack.Screen name="[id]" />
//     <Stack.Screen name="images" />
//   </Stack>;
// }
