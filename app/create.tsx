import { AttachmentIcon, CancelIcon } from "@/components/Icons";
import Typography from "@/components/Typography";
import useColors from "@/hooks/useColors";
import useKeyboard from "@/hooks/useKeyboard";
import { CreateThread } from "@/types";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import uuid from "react-native-uuid";
import * as ImagePicker from "expo-image-picker";

const threadId = uuid.v4().toString();

const { width } = Dimensions.get("screen");

export default function CreateScreen() {
  const { keyboardHeight, isKeyboardVisible } = useKeyboard();
  const colors = useColors();
  const scrollRef = React.useRef<ScrollView>(null);
  const { bottom } = useSafeAreaInsets();
  const animation = useSharedValue(0);
  const router = useRouter();
  const [threads, setThreads] = React.useState<Array<CreateThread>>([
    {
      media: [],
      replyTo: "",
      text: "",
      threadId: threadId,
    },
  ]);
  const [activeThreadId, setActiveThreadId] = React.useState(threadId);

  React.useEffect(() => {
    animation.value = withTiming(isKeyboardVisible ? 1 : 0, {
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [isKeyboardVisible]);

  React.useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [threads]);

  const toolbarAnimatedStyle = useAnimatedStyle(() => {
    return {
      bottom: interpolate(animation.value, [0, 1], [0, keyboardHeight]),
      paddingBottom: interpolate(animation.value, [0, 1], [bottom, 16]),
    };
  }, [keyboardHeight, bottom]);

  const activeThread = React.useMemo(
    () => threads.find(({ threadId }) => threadId === activeThreadId),
    [activeThreadId, threads]
  );

  const selectImages = React.useCallback(async (threadId: string) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 4,
    });

    const index = threads.findIndex((thread) => threadId === thread.threadId);

    if (index !== -1 && result.assets) {
      const newThreads = [...threads];
      newThreads.splice(index, 1, {
        ...threads[index],
        media: result.assets.map(({ uri, height, width }) => ({
          url: uri,
          aspectRatio: width / height,
          height,
          width,
        })),
      });

      setThreads(newThreads);
    }
  }, []);

  const cannotCreateNewThread = React.useMemo(() => {
    if (threads.length === 0) return true;
    const lastThread = threads[threads.length - 1];

    return !lastThread.text;
  }, [threads]);

  return (
    <View
      style={{
        backgroundColor: colors.modalBackground,
        flex: 1,
      }}
    >
      <Animated.View
        style={[
          styles.toolbar,
          {
            backgroundColor: colors.modalBackground,
          },
          toolbarAnimatedStyle,
        ]}
      >
        <Typography variant="sm" color="secondary">
          Anyone can reply
        </Typography>
        <TouchableOpacity activeOpacity={0.5}>
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
            onPress={router.back}
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
                          const index = threads.findIndex(
                            ({ threadId }) => threadId === thread.threadId
                          );

                          if (index !== -1) {
                            const newThreads = [...threads];
                            newThreads.splice(index, 1, {
                              ...thread,
                              text,
                            });

                            setThreads(newThreads);
                          }
                        }}
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
                              // console.log({
                              //   width: item.width,
                              //   height: item.height,
                              //   aspectRatio: item.aspectRatio,
                              // });
                              const imageWidth =
                                thread.media.length === 1
                                  ? width - 70 - 8
                                  : width - 70 - 24; // convert width from image to percentage of available width
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
    </View>
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
});
