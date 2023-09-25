import React from "react";
import { View, StyleSheet, Image } from "react-native";
import AwesomeGallery, {
  GalleryRef,
  RenderItemInfo,
} from "react-native-awesome-gallery";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";
import { useIsFocused } from "@react-navigation/native";
import Animated, {
  withSpring,
  SharedTransition,
} from "react-native-reanimated";
import * as StatusBar from "expo-status-bar";

const transition = SharedTransition.custom((values) => {
  "worklet";
  return {
    height: withSpring(values.targetHeight),
    width: withSpring(values.targetWidth),
  };
});

const renderItem = ({
  item,
  setImageDimensions,
}: RenderItemInfo<{ uri: string }>) => {
  return (
    <Animated.Image
      source={{ uri: item.uri }}
      style={StyleSheet.absoluteFillObject}
      sharedTransitionStyle={transition}
      sharedTransitionTag={item.uri}
      resizeMode="contain"
      onLoad={(e) => {
        const { width, height } = e.nativeEvent.source;
        setImageDimensions({ width, height });
      }}
    />
  );
};

interface Props
  extends NativeStackScreenProps<RootStackParamList, "ThreadImagesScreen"> {}

export default function ThreadImagesScreen(props: Props) {
  const isFocused = useIsFocused();
  const gallery = React.useRef<GalleryRef>(null);
  const [infoVisible, setInfoVisible] = React.useState(true);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    StatusBar.setStatusBarStyle(isFocused ? "light" : "dark");
    if (!isFocused) {
      StatusBar.setStatusBarHidden(false, "fade");
    }
  }, [isFocused]);

  const onTap = () => {
    StatusBar.setStatusBarHidden(infoVisible, "slide");
    setInfoVisible(!infoVisible);
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <AwesomeGallery
        ref={gallery}
        data={props.route.params.images.map((uri) => ({ uri }))}
        keyExtractor={(item) => item.uri}
        renderItem={renderItem}
        initialIndex={props.route.params.index}
        numToRender={3}
        doubleTapInterval={150}
        onSwipeToClose={props.navigation.goBack}
        onTap={onTap}
        onScaleEnd={(scale) => {
          if (scale < 0.8) {
            props.navigation.goBack();
          }
        }}
      />
    </View>
  );
}
