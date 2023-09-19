import { AttachmentIcon, CancelIcon } from "@/components/Icons";
import Typography from "@/components/Typography";
import useColors from "@/hooks/useColors";
import useKeyboard from "@/hooks/useKeyboard";
import { RootStackParamList } from "@/types";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import useScreensize from "@/hooks/useScreensize";
import { isAndroid } from "@/constants/Platform";
import Header from "@/components/Header";
import useIsDarkMode from "@/hooks/useIsDarkMode";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ThreadView from "@/components/ThreadView";
import EmbeddedThreadView from "@/components/EmbeddedThreadView";
import useUserStore from "@/store/userStore";
import useCreateThreadMutation from "@/hooks/mutations/useCreateThreadMutation";
import useToastsStore from "@/store/toastsStore";

const privateProfileMenuOptions = [
  "Your followers",
  "Profiles you follow",
  "Mentioned only",
];

const publicProfileMenuOptions = [
  "Anyone",
  "Profiles you follow",
  "Mentioned only",
];

const MENU_WIDTH = isAndroid ? 160 : 240;
const MENU_ITEM_HEIGHT = isAndroid ? 42 : 38;
const MENU_HEIGHT = MENU_ITEM_HEIGHT * 3;

interface Props
  extends NativeStackScreenProps<RootStackParamList, "CreateThreadScreen"> {}

export default function CreateThreadScreen(props: Props) {
  const { keyboardHeight, isKeyboardVisible } = useKeyboard();
  const isPrivateAccount = false;
  const colors = useColors();
  const scrollRef = React.useRef<ScrollView>(null);
  const textInputRef = React.useRef<TextInput>(null);
  const user = useUserStore((state) => state.user);
  const { bottom } = useSafeAreaInsets();
  const toolbarAnimation = useSharedValue(0);
  const popmenuAnimation = useSharedValue(0);
  const { width } = useScreensize();
  const isDarkMode = useIsDarkMode();

  const [scope, setScope] = React.useState(
    isPrivateAccount
      ? privateProfileMenuOptions[0]
      : publicProfileMenuOptions[0]
  );
  const [showPopupMenu, setShowPopupMenu] = React.useState(false);
  const [text, setText] = React.useState("");
  const [images, setImages] = React.useState<Array<string>>([]);
  const createThreadMutation = useCreateThreadMutation();

  React.useEffect(() => {
    if (createThreadMutation.isSuccess) {
      setText("");
      setImages([]);
      props.navigation.goBack();
    }
  }, [createThreadMutation.isSuccess]);

  const embeddedThread = React.useMemo(() => {
    if (props.route.params.type === "new") return undefined;

    return props.route.params.thread;
  }, [props.route.params.type]);

  const cannotPost = React.useMemo(
    () => text.trim().length === 0 && images.length === 0,
    [text, images]
  );

  const handlePost = React.useCallback(() => {
    if (createThreadMutation.isLoading || cannotPost) {
      return;
    }

    if (props.route.params.type !== "new" && !embeddedThread) {
      return;
    }

    createThreadMutation.mutate({
      payload: {
        media: images,
        text,
        replyThreadId:
          props.route.params.type === "reply"
            ? String(embeddedThread!.id)
            : null,
        quoteThreadId:
          props.route.params.type === "quote"
            ? String(embeddedThread!.id)
            : null,
      },
      quoteThreadQueryKeyId:
        props.route.params.type === "quote" ? embeddedThread!.threadId : null,
      replyThreadQueryKeyId:
        props.route.params.type === "reply" ? embeddedThread!.threadId : null,
    });
  }, [
    text,
    images,
    cannotPost,
    createThreadMutation.isLoading,
    embeddedThread?.id,
  ]);

  const menuOptions = React.useMemo(
    () =>
      isPrivateAccount ? privateProfileMenuOptions : publicProfileMenuOptions,
    [isPrivateAccount]
  );

  const title = React.useMemo(() => {
    switch (props.route.params.type) {
      case "reply":
        return "Reply";

      default:
        return "New Thread";
    }
  }, [props.route.params.type]);

  React.useEffect(() => {
    toolbarAnimation.value = withTiming(isKeyboardVisible ? 1 : 0, {
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [isKeyboardVisible]);

  React.useEffect(() => {
    setTimeout(() => {
      textInputRef.current?.focus();
    }, 500);
  }, []);

  React.useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [text, images]);

  React.useEffect(() => {
    popmenuAnimation.value = withSpring(showPopupMenu ? 1 : 0, {
      duration: 550,
    });
  }, [showPopupMenu]);

  const toolbarHeight = React.useMemo(() => 16 + 32, [bottom]);

  const toolbarAnimatedStyle = useAnimatedStyle(() => {
    return {
      bottom: interpolate(
        toolbarAnimation.value,
        [0, 1],
        [0, isAndroid ? 0 : keyboardHeight]
      ),
      paddingBottom: interpolate(
        toolbarAnimation.value,
        [0, 1],
        [(bottom || 20) + 6, 16]
      ),
    };
  }, [keyboardHeight, bottom]);

  const menuAnimatedStyle = useAnimatedStyle(() => {
    return {
      bottom: interpolate(
        toolbarAnimation.value,
        [0, 1],
        [70, (isAndroid ? 0 : keyboardHeight) + 52]
      ),
      transform: [
        { translateX: -MENU_WIDTH / 2 },
        { translateY: MENU_HEIGHT },
        { scale: interpolate(popmenuAnimation.value, [0, 1], [0, 1]) },
        { translateX: MENU_WIDTH / 2 },
        { translateY: -MENU_HEIGHT },
      ],
      opacity: interpolate(popmenuAnimation.value, [0, 0.5], [0, 1]),
    };
  }, [keyboardHeight, bottom, toolbarHeight]);

  const selectImages = React.useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.7,
      allowsMultipleSelection: true,
      selectionLimit: 4,
    });

    if (result.assets) {
      const newImages = result.assets.map(({ uri }) => uri);
      setImages((prevValues) => [...prevValues, ...newImages]);
    }
  }, []);

  const onCancelButtonPressed = React.useCallback(() => {
    if (cannotPost) {
      props.navigation.goBack();
    } else {
      Alert.alert("Discard thread?", "", [
        {
          style: "default",
          text: "Cancel",
        },
        {
          style: "destructive",
          text: "Discard",
          onPress: props.navigation.goBack,
        },
      ]);
    }
  }, [cannotPost]);

  return (
    <Pressable
      style={{
        backgroundColor: isAndroid ? colors.background : colors.modalBackground,
        flex: 1,
      }}
      onPress={() => setShowPopupMenu(false)}
    >
      <Animated.View
        style={[
          styles.menu,
          {
            backgroundColor: isAndroid
              ? colors.modalBackground
              : isDarkMode
              ? "#292929"
              : "#F5F4F5",
            shadowColor: isDarkMode ? "transparent" : "#000",
          },
          menuAnimatedStyle,
        ]}
      >
        {menuOptions.map((option, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setScope(option);
                setShowPopupMenu(false);
              }}
              key={option}
              style={[
                styles.menuItem,
                {
                  borderTopWidth: index === 0 ? 0 : 1,
                  borderTopColor: isAndroid
                    ? colors.border
                    : isDarkMode
                    ? "#535152"
                    : "#CDCCCC",
                },
              ]}
            >
              <Typography variant={isAndroid ? "tiny" : "sm"}>
                {option}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
      <Animated.View
        style={[
          styles.toolbar,
          {
            // height: toolbarHeight,
            backgroundColor: isAndroid
              ? colors.background
              : colors.modalBackground,
            paddingTop: 14,
          },
          toolbarAnimatedStyle,
        ]}
      >
        {/* <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setShowPopupMenu((prevValue) => !prevValue)}
        >
          <Typography variant="body" color="secondary">
            {scope}
          </Typography>
        </TouchableOpacity> */}
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            opacity: cannotPost || createThreadMutation.isLoading ? 0.5 : 1,
            marginLeft: "auto",
          }}
          onPress={handlePost}
          disabled={cannotPost || createThreadMutation.isLoading}
        >
          {createThreadMutation.isLoading ? (
            <ActivityIndicator size="small" color="#17A2FC" />
          ) : (
            <Typography variant="body" fontWeight={600} color="#17A2FC">
              Post
            </Typography>
          )}
        </TouchableOpacity>
      </Animated.View>
      <View style={{ flex: 1, zIndex: 4 }}>
        <Header
          title={title}
          hasBorder
          hideRightButton
          onCancelButtonPressed={onCancelButtonPressed}
        />
        <ScrollView
          contentContainerStyle={{
            paddingTop: 12,
            paddingBottom: isAndroid ? 64 : keyboardHeight + 94,
          }}
          ref={scrollRef}
        >
          {props.route.params.type === "reply" && embeddedThread ? (
            <ThreadView thread={embeddedThread} variant="reply-thread" />
          ) : (
            <></>
          )}
          <View style={styles.thread}>
            <View style={styles.left}>
              <Image
                style={[
                  styles.avatar,
                  {
                    borderColor: colors.border,
                  },
                ]}
                source={
                  user?.profile?.profilePicture
                    ? { uri: user.profile.profilePicture }
                    : require("../assets/images/no-avatar.jpeg")
                }
              />
              <View
                style={[
                  styles.line,
                  {
                    backgroundColor: colors.border,
                  },
                ]}
              />
            </View>
            <View style={styles.content}>
              <View style={styles.top}>
                <Typography variant="sm" fontWeight={600}>
                  {user?.username}
                </Typography>
                {cannotPost ? (
                  <></>
                ) : (
                  <TouchableOpacity
                    disabled={createThreadMutation.isLoading}
                    onPress={() => {
                      setText("");
                      setImages([]);
                    }}
                  >
                    <CancelIcon size={18} color={colors.textSecondary} />
                  </TouchableOpacity>
                )}
              </View>
              <TextInput
                placeholder="Start a thread..."
                placeholderTextColor={colors.textSecondary}
                multiline
                value={text}
                ref={textInputRef}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                onChangeText={setText}
                onFocus={() => setShowPopupMenu(false)}
              />
              {images.length === 0 ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={selectImages}
                  style={{ marginTop: 16 }}
                >
                  <AttachmentIcon size={18} color={colors.textSecondary} />
                </TouchableOpacity>
              ) : (
                <></>
              )}
              {images.length > 0 ? (
                <View
                  style={[
                    styles.imageContainer,
                    {
                      width,
                      transform: [
                        {
                          translateX: -70,
                        },
                      ],
                    },
                  ]}
                >
                  <FlatList
                    data={images}
                    keyExtractor={(image) => image}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      gap: 8,
                      paddingLeft: 70,
                      paddingRight: 16,
                    }}
                    renderItem={({ item }) => {
                      const imageWidth =
                        images.length === 1
                          ? width - 70 - 8
                          : (width - 70) * 0.6;
                      return (
                        <TouchableOpacity
                          activeOpacity={0.8}
                          style={{
                            borderRadius: 8,
                            overflow: "hidden",
                            width: imageWidth,
                            height: imageWidth * 1.2,
                          }}
                          onPress={selectImages}
                        >
                          <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.closeButton}
                            onPress={() => {
                              setImages((prevImages) =>
                                prevImages.filter((image) => image !== item)
                              );
                            }}
                          >
                            <CancelIcon size={20} color="#fff" />
                          </TouchableOpacity>
                          <Image
                            source={{ uri: item }}
                            style={{
                              borderRadius: 8,
                              width: "100%",
                              height: "100%",
                              resizeMode: "cover",
                            }}
                          />
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              ) : (
                <></>
              )}
              {props.route.params.type === "quote" && embeddedThread ? (
                <EmbeddedThreadView thread={embeddedThread} disableNavigation />
              ) : (
                <></>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    position: "absolute",
    left: 0,
    width: "100%",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
  },
  menu: {
    position: "absolute",
    left: 16,
    width: MENU_WIDTH,
    height: MENU_HEIGHT,
    zIndex: 11,
    borderRadius: isAndroid ? 8 : 12,
    shadowColor: "#000",
    shadowOffset: { height: 1.5, width: 1.5 },
    shadowOpacity: 0.5,
    shadowRadius: 100,
    elevation: 10,
  },
  menuItem: {
    paddingHorizontal: 16,
    height: MENU_ITEM_HEIGHT - 1,
    borderTopWidth: 1,
    justifyContent: "center",
  },
  textInput: {
    fontSize: 14,
    lineHeight: 14 * 1.5,
    fontFamily: "Inter",
  },
  thread: {
    width: "100%",
    flexDirection: "row",
    paddingRight: 12,
  },
  left: {
    width: 66,
    alignItems: "center",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    marginTop: 2,
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    paddingRight: 16,
    paddingBottom: 16,
  },
  imageContainer: {
    marginTop: 16,
  },
  top: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  line: {
    flex: 1,
    width: 2,
    marginVertical: 5,
  },
  smallAvatar: {
    width: 14,
    height: 14,
    borderRadius: 14 / 2,
    resizeMode: "cover",
  },
  closeButton: {
    position: "absolute",
    right: 12,
    top: 12,
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    zIndex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
