import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import AwesomeGallery, {
  GalleryRef,
  RenderItemInfo,
} from "react-native-awesome-gallery";
import { Image } from "expo-image";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";
import { useIsFocused } from "@react-navigation/native";

const renderItem = ({
  item,
  setImageDimensions,
}: RenderItemInfo<{ uri: string }>) => {
  return (
    <Image
      source={{ uri: item.uri }}
      style={StyleSheet.absoluteFillObject}
      contentFit="contain"
      onLoad={(e) => {
        const { width, height } = e.source;
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

  React.useEffect(() => {
    StatusBar.setBarStyle(isFocused ? "light-content" : "dark-content", true);
    if (!isFocused) {
      StatusBar.setHidden(false, "fade");
    }
  }, [isFocused]);

  const onTap = () => {
    StatusBar.setHidden(infoVisible, "slide");
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
