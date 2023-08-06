import { AttachmentIcon, CancelIcon } from "@/components/Icons";
import Typography from "@/components/Typography";
import useColors from "@/hooks/useColors";
import useKeyboard from "@/hooks/useKeyboard";
import { CreateThread } from "@/types";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
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
import uuid from "react-native-uuid";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "expo-router";
import useScreensize from "@/hooks/useScreensize";

const threadId = uuid.v4().toString();

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

const MENU_WIDTH = 240;
const MENU_ITEM_HEIGHT = 38;
const MENU_HEIGHT = MENU_ITEM_HEIGHT * 3;

export default function CreateScreen() {
  const { keyboardHeight, isKeyboardVisible } = useKeyboard();
  const isPrivateAccount = false;
  const colors = useColors();
  const scrollRef = React.useRef<ScrollView>(null);
  const { bottom } = useSafeAreaInsets();
  const toolbarAnimation = useSharedValue(0);
  const popmenuAnimation = useSharedValue(0);
  const { width } = useScreensize();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [threads, setThreads] = React.useState<Array<CreateThread>>([
    {
      media: [],
      replyTo: "",
      text: "",
      threadId: threadId,
    },
  ]);
  const [activeThreadId, setActiveThreadId] = React.useState(threadId);
  const [scope, setScope] = React.useState(
    isPrivateAccount
      ? privateProfileMenuOptions[0]
      : publicProfileMenuOptions[0]
  );
  const [showPopupMenu, setShowPopupMenu] = React.useState(false);

  const menuOptions = React.useMemo(
    () =>
      isPrivateAccount ? privateProfileMenuOptions : publicProfileMenuOptions,
    [isPrivateAccount]
  );

  React.useEffect(() => {
    toolbarAnimation.value = withTiming(isKeyboardVisible ? 1 : 0, {
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [isKeyboardVisible]);

  React.useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [threads]);

  React.useEffect(() => {
    popmenuAnimation.value = withSpring(showPopupMenu ? 1 : 0, {
      duration: 550,
    });
  }, [showPopupMenu]);

  const toolbarHeight = React.useMemo(() => bottom + 16 + 28, [bottom]);

  const toolbarAnimatedStyle = useAnimatedStyle(() => {
    return {
      bottom: interpolate(toolbarAnimation.value, [0, 1], [0, keyboardHeight]),
      paddingBottom: interpolate(toolbarAnimation.value, [0, 1], [bottom, 16]),
    };
  }, [keyboardHeight, bottom]);

  const menuAnimatedStyle = useAnimatedStyle(() => {
    return {
      bottom: interpolate(
        toolbarAnimation.value,
        [0, 1],
        [toolbarHeight - 6, keyboardHeight + toolbarHeight - 6]
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

  const activeThread = React.useMemo(
    () => threads.find(({ threadId }) => threadId === activeThreadId),
    [activeThreadId, threads]
  );

  const selectImages = React.useCallback(async (threadId: string) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 4,
    });

    setThreads((prevThreads) => {
      const index = prevThreads.findIndex(
        (thread) => threadId === thread.threadId
      );

      if (index !== -1 && result.assets) {
        const newThreads = [...prevThreads];
        newThreads.splice(index, 1, {
          ...prevThreads[index],
          media: result.assets.map(({ uri, height, width }) => ({
            url: uri,
            aspectRatio: width / height,
            height,
            width,
          })),
        });
        return newThreads;
      }
      return prevThreads;
    });
  }, []);

  const cannotCreateNewThread = React.useMemo(() => {
    if (threads.length === 0) return true;
    const lastThread = threads[threads.length - 1];

    return !lastThread.text && lastThread.media.length === 0;
  }, [threads]);

  const hasCreatedThreads = React.useMemo(() => {
    if (threads.length === 0) return false;
    for (const { media, text } of threads) {
      if (media.length > 0 || text) {
        return true;
      }
    }
    return false;
  }, [threads]);

  const onCancelButtonPressed = React.useCallback(() => {
    if (!hasCreatedThreads) {
      router.back();
    } else {
      Alert.alert("Discard thread?", "", [
        {
          style: "default",
          text: "Cancel",
        },
        {
          style: "destructive",
          text: "Discard",
          onPress: router.back,
        },
      ]);
    }
  }, [hasCreatedThreads]);

  return (
    <Pressable
      style={{
        backgroundColor: colors.modalBackground,
        flex: 1,
      }}
      onPress={() => setShowPopupMenu(false)}
    >
      <Animated.View
        style={[
          styles.menu,
          {
            backgroundColor: colorScheme === "dark" ? "#292929" : "#F5F4F5",
            bottom: toolbarHeight,
            shadowColor: colorScheme === "dark" ? "transparent" : "#000",
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
                  borderTopColor:
                    colorScheme === "dark" ? "#535152" : "#CDCCCC",
                },
              ]}
            >
              <Typography variant="sm">{option}</Typography>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
      <Animated.View
        style={[
          styles.toolbar,
          {
            height: toolbarHeight,
            backgroundColor: colors.modalBackground,
          },
          toolbarAnimatedStyle,
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setShowPopupMenu((prevValue) => !prevValue)}
        >
          <Typography variant="sm" color="secondary">
            {scope}
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            opacity: hasCreatedThreads ? 1 : 0.5,
          }}
        >
          <Typography variant="body2" fontWeight={600} color="#17A2FC">
            Post
          </Typography>
        </TouchableOpacity>
      </Animated.View>
      <View style={{ flex: 1 }}>
        <View
          style={[
            styles.header,
            {
              borderColor: colors.cardBorder,
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.cancelButton}
            onPress={onCancelButtonPressed}
          >
            <Typography variant="body2">Cancel</Typography>
          </TouchableOpacity>
          <Typography
            variant="body2"
            fontWeight={600}
            style={{
              fontSize: 20,
              lineHeight: 20 * 1.5,
            }}
          >
            New thread
          </Typography>
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingTop: 12,
            paddingBottom: keyboardHeight + 68,
          }}
          ref={scrollRef}
        >
          {threads.map((thread, index) => {
            const isActiveThread = activeThreadId === thread.threadId;
            return (
              <Animated.View style={styles.thread} key={index}>
                <View style={styles.left}>
                  <Image
                    style={[
                      styles.avatar,
                      {
                        borderColor: colors.border,
                      },
                    ]}
                    source={{ uri: "https://picsum.photos/44" }}
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
                      oreku__
                    </Typography>
                    {threads.length === 1 ? (
                      <></>
                    ) : (
                      <TouchableOpacity
                        disabled={threads.length === 1}
                        onPress={() => {
                          const index = threads.findIndex(
                            ({ threadId }) => thread.threadId === threadId
                          );
                          const newThreads = [...threads];
                          newThreads.splice(index, 1);
                          setThreads(newThreads);
                        }}
                      >
                        <CancelIcon size={18} color={colors.textSecondary} />
                      </TouchableOpacity>
                    )}
                  </View>
                  {isActiveThread ? (
                    <>
                      <TextInput
                        placeholder="Start a thread..."
                        placeholderTextColor={colors.textSecondary}
                        autoFocus
                        multiline
                        value={thread.text}
                        style={[
                          styles.textInput,
                          {
                            color: colors.text,
                          },
                        ]}
                        onChangeText={(text) => {
                          setThreads((prevThreads) => {
                            const index = prevThreads.findIndex(
                              ({ threadId }) => threadId === thread.threadId
                            );

                            if (index !== -1) {
                              const newThreads = [...prevThreads];
                              newThreads.splice(index, 1, {
                                ...thread,
                                text,
                              });

                              return newThreads;
                            }
                            return prevThreads;
                          });
                        }}
                        onFocus={() => setShowPopupMenu(false)}
                      />
                      {thread.media.length > 0 ? (
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
                            data={thread.media}
                            keyExtractor={() => Math.random().toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                              gap: 8,
                              paddingLeft: 70,
                              paddingRight: 16,
                            }}
                            renderItem={({ item }) => {
                              const imageWidth =
                                thread.media.length === 1
                                  ? width - 70 - 8
                                  : width - 70 - 24;
                              return (
                                <TouchableOpacity
                                  activeOpacity={0.8}
                                  style={{
                                    borderRadius: 8,
                                    overflow: "hidden",
                                    width: imageWidth,
                                    height:
                                      thread.media.length > 1 ? 200 : undefined,
                                    aspectRatio:
                                      thread.media.length > 1
                                        ? undefined
                                        : item.aspectRatio,
                                  }}
                                  onPress={() => selectImages(thread.threadId)}
                                >
                                  <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.closeButton}
                                    onPress={() => {
                                      setThreads((prevThreads) => {
                                        const index = prevThreads.findIndex(
                                          ({ threadId }) =>
                                            thread.threadId === threadId
                                        );

                                        if (index !== -1) {
                                          const newThreads = [...prevThreads];
                                          newThreads.splice(index, 1, {
                                            ...thread,
                                            media: thread.media.filter(
                                              (media) => media.url !== item.url
                                            ),
                                          });

                                          return newThreads;
                                        }
                                        return prevThreads;
                                      });
                                    }}
                                  >
                                    <CancelIcon size={20} color="#fff" />
                                  </TouchableOpacity>
                                  <Image
                                    source={{ uri: item.url }}
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
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => selectImages(thread.threadId)}
                          style={{ marginTop: 16 }}
                        >
                          <AttachmentIcon
                            size={18}
                            color={colors.textSecondary}
                          />
                        </TouchableOpacity>
                      )}
                    </>
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => setActiveThreadId(thread.threadId)}
                      style={{
                        marginTop: 6,
                      }}
                    >
                      <Typography
                        variant="sm"
                        color={thread.text ? colors.text : colors.textSecondary}
                      >
                        {thread.text ? thread.text : "Start a thread..."}
                      </Typography>
                    </TouchableOpacity>
                  )}
                </View>
              </Animated.View>
            );
          })}
          <TouchableOpacity
            activeOpacity={0.5}
            disabled={cannotCreateNewThread}
            style={[
              styles.thread,
              {
                opacity: cannotCreateNewThread ? 0.5 : 1,
              },
            ]}
            onPress={() => {
              const id = uuid.v4().toString();
              setThreads((prevValues) => [
                ...prevValues,
                {
                  media: [],
                  replyTo: "",
                  text: "",
                  threadId: id,
                },
              ]);
              setActiveThreadId(id);
              scrollRef.current?.scrollToEnd({ animated: true });
            }}
          >
            <View
              style={[
                styles.left,
                {
                  justifyContent: "center",
                },
              ]}
            >
              <Image
                style={[styles.smallAvatar]}
                source={{ uri: "https://picsum.photos/44" }}
              />
            </View>
            <View
              style={[
                styles.content,
                {
                  paddingBottom: 0,
                  padding: 0,
                },
              ]}
            >
              <Typography color="secondary" variant="sm">
                Add to thread
              </Typography>
            </View>
          </TouchableOpacity>
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
    padding: 16,
    backgroundColor: "red",
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
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { height: 1.5, width: 1.5 },
    shadowOpacity: 0.5,
    shadowRadius: 100,
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
  },
  left: {
    width: 70,
    alignItems: "center",
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 38 / 2,
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
  header: {
    width: "100%",
    borderBottomWidth: 1,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  cancelButton: {
    position: "absolute",
    left: 16,
    top: 16,
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
