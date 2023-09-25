import {
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
  Image,
  ScrollView,
  Share,
  ActivityIndicator,
  ViewStyle,
} from "react-native";
import {
  ChevronLeftIcon,
  HeartFilledIcon,
  HeartIcon,
  LinkIcon,
  MenuIcon,
  MessageIcon,
  QuoteIcon,
  RepostIcon,
  RepostedIcon,
  SendIcon,
  ShareIcon,
  ThreadLineIcon,
  VerifiedIcon,
} from "./Icons";
import useColors from "@/hooks/useColors";
import React from "react";
import Typography from "./Typography";
import useScreensize from "@/hooks/useScreensize";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";
import BottomSheet from "./BottomSheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EmbeddedThreadView from "./EmbeddedThreadView";
import Thread from "@/models/Thread";
import formatDistance from "@/utils/formatDistance";
import useLikeThreadMutation from "@/hooks/mutations/useLikeThreadMutation";
import useRepostThreadMutation from "@/hooks/mutations/useRepostThreadMutation";
import * as Clipboard from "expo-clipboard";
import useUserStore from "@/store/userStore";
import useToggleThreadLikesVisibilityMutation from "@/hooks/mutations/useToggleThreadLikesVisibilityMutation";
import useToastsStore from "@/store/toastsStore";
import ThreadReport from "@/namespaces/ThreadReport";
import {
  BottomSheetScrollView,
  TouchableOpacity as BottomSheetTouchableOpacity,
} from "@gorhom/bottom-sheet";
import useCreateThreadReportMutation from "@/hooks/mutations/useCreateThreadReportMutation";

type ThreadViewVariant =
  | "reply"
  | "thread"
  | "list-thread"
  | "reply-thread"
  | "quote";

interface Props {
  variant: ThreadViewVariant;
  thread: Thread;
  pointerEvents?: "none" | "auto";
  hideBorder?: boolean;
  hideLoop?: boolean;
  showReplyingTo?: boolean;
  style?: ViewStyle;
}

function ThreadViewComponent(props: Props) {
  const colors = useColors();
  const { width } = useScreensize();
  const [hasLiked, setHasLiked] = React.useState(
    props.thread.hasCurrentUserLiked
  );
  const [hasReposted, setHasReposted] = React.useState(
    props.thread.hasCurrentUserReposted
  );
  const [likesCount, setLikesCount] = React.useState(props.thread.likesCount);
  const [isRepostBottomSheetVisible, setIsRepostBottomSheetVisible] =
    React.useState(false);
  const [isSendPostBottomSheetVisible, setIsSendPostBottomSheetVisible] =
    React.useState(false);
  const [isPostOptionsBottomSheetVisible, setIsPostOptionsBottomSheetVisible] =
    React.useState(false);
  const [
    isReportThreadBottomSheetVisible,
    setIsReportThreadBottomSheetVisible,
  ] = React.useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const containerRef = React.useRef<TouchableOpacity>(null);
  const user = useUserStore((state) => state.user);
  const likeThreadMutation = useLikeThreadMutation();
  const [isLikesHidden, setIsLikesHidden] = React.useState(
    props.thread.isLikesHidden
  );
  const [svgHeight, setSvgHeight] = React.useState(0);
  const [mount, setMount] = React.useState(false);

  React.useEffect(() => {
    if (!mount) return;
    if (containerRef?.current) {
      containerRef.current.measure((_, __, ___, height) => {
        setSvgHeight(Math.floor(height) - 36 - 16);
      });
    }
  }, [containerRef?.current, mount]);

  const belongsToCurrentUser = user?.id === props.thread.user?.id;

  // this way I don't have to invalidate the threads query if a user updates their profile
  const threadCreator = React.useMemo(() => {
    return belongsToCurrentUser ? user : props.thread.user;
  }, [belongsToCurrentUser, user, props.thread.user]);

  return (
    <>
      <RepostBottomSheet
        isOpen={isRepostBottomSheetVisible}
        onClose={() => setIsRepostBottomSheetVisible(false)}
        thread={props.thread}
        hasReposted={hasReposted}
        setHasReposted={setHasReposted}
      />
      <ReportThreadBottomSheet
        isOpen={isReportThreadBottomSheetVisible}
        onClose={() => setIsReportThreadBottomSheetVisible(false)}
        thread={props.thread}
      />
      <PostOptionsBottomSheet
        isOpen={isPostOptionsBottomSheetVisible}
        onClose={() => setIsPostOptionsBottomSheetVisible(false)}
        thread={props.thread}
        isLikesHidden={isLikesHidden}
        setIsLikesHidden={setIsLikesHidden}
        openReportThreadBottomSheet={() => {
          setIsPostOptionsBottomSheetVisible(false);
          setTimeout(() => {
            setIsReportThreadBottomSheetVisible(true);
          }, 400);
        }}
      />
      <SendPostOptionsBottomSheet
        isOpen={isSendPostBottomSheetVisible}
        onClose={() => setIsSendPostBottomSheetVisible(false)}
        thread={props.thread}
      />
      <TouchableOpacity
        activeOpacity={props.variant === "thread" ? 1 : 0.8}
        disabled={props.variant === "thread"}
        onPress={() => {
          navigation.navigate("ThreadScreen", {
            thread: props.thread,
          });
        }}
        ref={containerRef}
        style={[
          styles.container,
          {
            borderColor: colors.cardBorder,
            width,
            borderBottomWidth: props.variant === "reply-thread" ? 0 : 1,
            paddingLeft: props.variant === "thread" ? 16 : 0,
            pointerEvents: props.pointerEvents,
            paddingBottom: props.variant === "reply-thread" ? 0 : 12,
          },
          props.style,
        ]}
        onLayout={() => {
          setMount(true);
        }}
      >
        {props.variant === "thread" ? (
          <></>
        ) : (
          <View style={styles.leftContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.avatarContainer}
              onPress={() => {
                if (user?.id === threadCreator?.id) {
                  navigation.navigate("MainScreen", {
                    screen: "ProfileScreen",
                  });
                } else {
                  navigation.navigate("UserProfileScreen", {
                    username: threadCreator?.username || "",
                  });
                }
              }}
            >
              <Image
                style={styles.avatar}
                source={
                  threadCreator?.profile?.profilePicture
                    ? { uri: threadCreator.profile.profilePicture }
                    : require("../assets/images/no-avatar.jpeg")
                }
              />
            </TouchableOpacity>
            {props.hideLoop ? null : (
              <View style={styles.lineContainer}>
                {props.variant === "reply-thread" ? (
                  <ThreadLineIcon
                    height={svgHeight}
                    color={colors.border}
                    style={{
                      marginRight: 12,
                    }}
                  />
                ) : (
                  <View
                    style={[
                      styles.line,
                      {
                        backgroundColor: colors.border,
                      },
                    ]}
                  />
                )}
              </View>
            )}
          </View>
        )}
        <View style={{ flex: 1 }}>
          <View style={styles.top}>
            {props.variant === "thread" ? (
              <View
                style={[
                  styles.avatarContainer,
                  {
                    marginRight: 6,
                  },
                ]}
              >
                <Image
                  style={styles.avatar}
                  source={
                    threadCreator?.profile?.profilePicture
                      ? { uri: threadCreator.profile.profilePicture }
                      : require("../assets/images/no-avatar.jpeg")
                  }
                />
              </View>
            ) : (
              <></>
            )}
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.row,
                {
                  gap: 4,
                },
              ]}
              onPress={() => {
                if (user?.id === threadCreator?.id) {
                  navigation.navigate("MainScreen", {
                    screen: "ProfileScreen",
                  });
                } else {
                  navigation.navigate("UserProfileScreen", {
                    username: threadCreator?.username || "",
                  });
                }
              }}
            >
              <Typography variant="sm" fontWeight={600}>
                {threadCreator?.username}
              </Typography>
              {threadCreator?.profile?.isVerified ? (
                <VerifiedIcon size={12} />
              ) : null}
            </TouchableOpacity>
            <Typography
              variant="sm"
              color="secondary"
              style={{
                marginLeft: "auto",
              }}
            >
              {formatDistance(props.thread.createdAt)}
            </Typography>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setIsPostOptionsBottomSheetVisible(true)}
            >
              <MenuIcon size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          {props.showReplyingTo && props.thread.replyThead ? (
            <Typography variant="sm" color="secondary">
              Replying to @{props.thread.replyThead.user?.username}
            </Typography>
          ) : null}
          {props.thread.text.length > 0 ? (
            <View style={styles.content}>
              <Typography variant="sm">{props.thread.text}</Typography>
            </View>
          ) : null}
          {props.thread.media.length > 0 ? (
            <View
              style={[
                styles.imageContainer,
                {
                  width,
                  transform: [
                    {
                      translateX: props.variant === "thread" ? 0 : -70,
                    },
                  ],
                },
              ]}
            >
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  gap: 8,
                  paddingLeft: props.variant === "thread" ? 8 : 70,
                  paddingRight: props.variant === "thread" ? 8 : 16,
                }}
              >
                {props.thread.media.map((url, index) => {
                  const imageWidth =
                    props.variant === "thread" &&
                    props.thread.media.length === 1
                      ? width - 32
                      : props.thread.media.length === 1
                      ? width - 70 - 8
                      : (width - 70 - 8) * 0.65;

                  return (
                    <Pressable
                      key={index}
                      style={{
                        borderRadius: 8,
                        overflow: "hidden",
                        width: imageWidth,
                        height:
                          imageWidth *
                          (props.thread.media.length === 1 ? 1.1 : 1.3),
                      }}
                      onPress={() => {
                        navigation.navigate("ThreadImagesScreen", {
                          images: props.thread.media,
                          index,
                        });
                      }}
                      onLongPress={() => {
                        const url = `${process.env.EXPO_PUBLIC_CLIENT_URL}/@${threadCreator?.username}/post/${props.thread.threadId}`;
                        Share.share({
                          url,
                        });
                      }}
                    >
                      <Image
                        source={{ uri: url }}
                        style={{
                          borderRadius: 8,
                          width: "100%",
                          height: "100%",
                          resizeMode: "cover",
                        }}
                      />
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
          ) : (
            <></>
          )}
          {props.thread.quoteThead ? (
            <EmbeddedThreadView thread={props.thread.quoteThead} />
          ) : (
            <></>
          )}
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.5}
              onPress={() => {
                if (hasLiked) {
                  setLikesCount((prevValue) =>
                    prevValue === 0 ? 0 : prevValue - 1
                  );
                } else {
                  setLikesCount((prevValue) => prevValue + 1);
                }
                setHasLiked((value) => !value);
                likeThreadMutation.mutate({
                  threadId: props.thread.threadId,
                });
              }}
              // disabled={likeThreadMutation.isLoading}
            >
              {hasLiked ? (
                <HeartFilledIcon size={24} color="#FF2735" />
              ) : (
                <HeartIcon size={24} color={colors.text} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("CreateThreadScreen", {
                  type: "reply",
                  thread: props.thread,
                });
              }}
              activeOpacity={0.5}
            >
              <MessageIcon size={24} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsRepostBottomSheetVisible(true)}
              activeOpacity={0.5}
            >
              {hasReposted ? (
                <RepostedIcon size={22} color={colors.text} />
              ) : (
                <RepostIcon size={24} color={colors.text} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsSendPostBottomSheetVisible(true)}
              activeOpacity={0.5}
            >
              <SendIcon size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          {(props.thread.replies.length === 0 && likesCount === 0) ||
          props.thread.isLikesHidden ? null : (
            <Typography
              variant="sm"
              color="secondary"
              style={{
                marginTop: 5,
              }}
            >
              {`${
                props.thread.replies.length === 1
                  ? "1 reply"
                  : `${props.thread.replies.length} replies`
              } • ${likesCount === 1 ? "1 like" : `${likesCount} likes`}`}
            </Typography>
          )}
        </View>
      </TouchableOpacity>
    </>
  );
}

function ThreadView(props: Props) {
  return (
    <>
      {props.thread.replyThead && !props.showReplyingTo ? (
        <ThreadViewComponent
          thread={props.thread.replyThead}
          variant="reply-thread"
          hideBorder
        />
      ) : null}
      <ThreadViewComponent
        {...props}
        hideLoop={Boolean(props.thread.replyThead)}
        style={{
          marginTop: props.thread.replyThead
            ? props.variant === "thread"
              ? -4
              : -10
            : undefined,
        }}
      />
    </>
  );
}

export default React.memo(
  ThreadView,
  (prevProps, nextProps) => prevProps.thread.id === nextProps.thread.id
);

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  thread: Thread;
}

function RepostBottomSheet(
  props: BottomSheetProps & {
    hasReposted: boolean;
    setHasReposted: React.Dispatch<React.SetStateAction<boolean>>;
  }
) {
  const colors = useColors();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { bottom } = useSafeAreaInsets();
  const repostThreadMutation = useRepostThreadMutation();
  const toastsStore = useToastsStore();

  return (
    <BottomSheet
      isOpen={props.isOpen}
      onClose={props.onClose}
      height={54 * 2 + (bottom || 20) + 56}
    >
      <View
        style={{
          paddingHorizontal: 16,
          gap: 12,
          paddingTop: 6,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            if (props.hasReposted) {
              toastsStore.addToast("Removed");
            } else {
              toastsStore.addToast("Reposted");
            }
            props.setHasReposted((value) => !value);
            repostThreadMutation.mutate({
              threadId: props.thread.threadId,
            });
            props.onClose();
          }}
          style={[
            styles.bottomSheetButton,
            {
              backgroundColor: colors.bottomSheetButtonColor,
            },
          ]}
          // disabled={repostThreadMutation.isLoading}
        >
          <Typography
            variant="sm"
            fontWeight={600}
            color={props.hasReposted ? colors.destructive : colors.text}
          >
            {props.hasReposted ? "Remove" : "Repost"}
          </Typography>
          <RepostIcon
            size={24}
            color={props.hasReposted ? colors.destructive : colors.text}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            props.onClose();
            setTimeout(() => {
              navigation.navigate("CreateThreadScreen", {
                thread: props.thread,
                type: "quote",
              });
            }, 300);
          }}
          style={[
            styles.bottomSheetButton,
            {
              backgroundColor: colors.bottomSheetButtonColor,
            },
          ]}
        >
          <Typography variant="sm" fontWeight={600} color={colors.text}>
            Quote
          </Typography>
          <QuoteIcon size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
}

function PostOptionsBottomSheet(
  props: BottomSheetProps & {
    isLikesHidden: boolean;
    setIsLikesHidden: React.Dispatch<React.SetStateAction<boolean>>;
    openReportThreadBottomSheet: () => void;
  }
) {
  const colors = useColors();
  const user = useUserStore((state) => state.user);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { bottom } = useSafeAreaInsets();
  const toggleThreadLikesVisibilityMutation =
    useToggleThreadLikesVisibilityMutation();
  const toastsStore = useToastsStore();

  const isCurrentUserCreator = user?.id === props.thread.user?.id;

  const optionsList1 = React.useMemo(() => {
    if (isCurrentUserCreator) {
      return [
        {
          label: props.isLikesHidden ? "Unhide like count" : "Hide like count",
          onPress: () => {
            if (props.isLikesHidden) {
              toastsStore.addToast("Like count unhidden");
            } else {
              toastsStore.addToast("Like count hidden");
            }
            props.setIsLikesHidden((prevValue) => !prevValue);
            toggleThreadLikesVisibilityMutation.mutate({
              threadId: props.thread.threadId,
            });
          },
        },
      ];
    }
    return [
      { label: "Repost", onPress: () => {} },
      {
        label: "Quote",
        onPress: () => {
          props.onClose();
          setTimeout(() => {
            navigation.navigate("CreateThreadScreen", {
              thread: props.thread,
              type: "quote",
            });
          }, 300);
        },
      },
    ];
  }, [isCurrentUserCreator, props.isLikesHidden, props.thread.threadId]);

  const optionsList2 = React.useMemo(() => {
    if (isCurrentUserCreator) {
      return [
        {
          label: "Delete",
          onPress: () => {},
        },
      ];
    }
    return [{ label: "Report", onPress: props.openReportThreadBottomSheet }];
  }, [isCurrentUserCreator]);

  return (
    <BottomSheet
      isOpen={props.isOpen}
      onClose={props.onClose}
      height={54 * (isCurrentUserCreator ? 2 : 3) + (bottom || 20) + 44 + 24}
    >
      <View
        style={{
          paddingHorizontal: 16,
          gap: 16,
          paddingTop: 6,
        }}
      >
        <View
          style={{
            backgroundColor: colors.bottomSheetButtonColor,
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          {optionsList1.map(({ label, onPress }, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                key={label}
                onPress={onPress}
                style={[
                  styles.bottomSheetButton,

                  {
                    borderRadius: 0,
                    backgroundColor: colors.bottomSheetButtonColor,
                    borderTopWidth: index === 0 ? 0 : StyleSheet.hairlineWidth,
                    borderColor: colors.bottomSheetButtonBorderColor,
                  },
                ]}
              >
                <Typography variant="sm" fontWeight={600} color={colors.text}>
                  {label}
                </Typography>
              </TouchableOpacity>
            );
          })}
        </View>
        <View
          style={{
            backgroundColor: colors.bottomSheetButtonColor,
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          {optionsList2.map(({ label, onPress }, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                key={label}
                onPress={onPress}
                style={[
                  styles.bottomSheetButton,

                  {
                    borderRadius: 0,
                    backgroundColor: colors.bottomSheetButtonColor,
                    borderBottomWidth: 0,
                    borderBottomColor: colors.bottomSheetButtonBorderColor,
                  },
                ]}
              >
                <Typography variant="sm" fontWeight={600} color={"red"}>
                  {label}
                </Typography>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </BottomSheet>
  );
}

function SendPostOptionsBottomSheet(props: BottomSheetProps) {
  const colors = useColors();
  const { bottom } = useSafeAreaInsets();
  const user = useUserStore((state) => state.user);
  const belongsToCurrentUser = user?.id === props.thread.user?.id;

  // this way I don't have to invalidate the threads query if a user updates their profile
  const threadCreator = React.useMemo(() => {
    return belongsToCurrentUser ? user : props.thread.user;
  }, [belongsToCurrentUser, user, props.thread.user]);

  const optionsList2 = React.useMemo(
    () => [
      {
        label: "Copy link",
        icon: LinkIcon,
        onPress: async () => {
          const url = `${process.env.EXPO_PUBLIC_CLIENT_URL}/@${threadCreator?.username}/post/${props.thread.threadId}`;
          await Clipboard.setStringAsync(url);
        },
      },
      {
        label: "Share via...",
        icon: ShareIcon,
        onPress: () => {
          const url = `${process.env.EXPO_PUBLIC_CLIENT_URL}/@${threadCreator?.username}/post/${props.thread.threadId}`;
          Share.share({
            url,
          });
        },
      },
    ],
    []
  );

  return (
    <BottomSheet
      isOpen={props.isOpen}
      onClose={props.onClose}
      height={54 * 2 + (bottom || 20) + 44}
    >
      <View
        style={{
          paddingHorizontal: 16,
          gap: 16,
          paddingTop: 6,
        }}
      >
        <View
          style={{
            backgroundColor: colors.bottomSheetButtonColor,
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          {optionsList2.map(({ label, onPress, icon: Icon }, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                key={label}
                onPress={onPress}
                style={[
                  styles.bottomSheetButton,

                  {
                    borderRadius: 0,
                    backgroundColor: colors.bottomSheetButtonColor,
                    borderBottomWidth:
                      index === 0 ? StyleSheet.hairlineWidth : 0,
                    borderBottomColor:
                      index === 0
                        ? colors.bottomSheetButtonBorderColor
                        : undefined,
                  },
                ]}
              >
                <Typography variant="sm" fontWeight={600}>
                  {label}
                </Typography>
                <Icon size={24} color={colors.text} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </BottomSheet>
  );
}

function ReportThreadBottomSheet(props: BottomSheetProps) {
  const colors = useColors();
  const { height } = useScreensize();
  const { bottom } = useSafeAreaInsets();
  const createThreadReportMutation = useCreateThreadReportMutation();

  React.useEffect(() => {
    if (createThreadReportMutation.isSuccess) {
      props.onClose();
    }
  }, [createThreadReportMutation.isSuccess]);

  return (
    <BottomSheet
      isOpen={props.isOpen}
      onClose={props.onClose}
      height={height * 0.7}
    >
      <View
        style={{
          paddingBottom: bottom || 24,
          flex: 1,
        }}
      >
        <Typography variant="body" fontWeight={700} textAlign="center">
          Report
        </Typography>
        <View
          style={{
            paddingHorizontal: 24,
            borderTopWidth: 1,
            borderColor: colors.textInputBorderColor,
            marginTop: 12,
            paddingVertical: 14,
          }}
        >
          <Typography variant="sm" fontWeight={700}>
            Why are you reporting this post?
          </Typography>
        </View>
        <BottomSheetScrollView
          style={{
            backgroundColor: colors.textInputBackgroundColor,
          }}
        >
          {ThreadReport.list().map((id) => {
            return (
              <BottomSheetTouchableOpacity
                activeOpacity={0.8}
                key={id.toString()}
                style={[
                  styles.bottomSheetButton,
                  {
                    borderTopWidth: 1,
                    borderColor: colors.textInputBorderColor,
                    borderRadius: 0,
                    opacity: createThreadReportMutation.isLoading ? 0.5 : 1,
                  },
                ]}
                onPress={() => {
                  createThreadReportMutation.mutate({
                    threadId: props.thread.threadId,
                    descriptionId: id,
                  });
                }}
                disabled={createThreadReportMutation.isLoading}
              >
                <Typography variant="sm" fontWeight={500}>
                  {ThreadReport.text(id)}
                </Typography>
                {createThreadReportMutation.isLoading &&
                createThreadReportMutation.variables?.descriptionId === id ? (
                  <ActivityIndicator size="small" color={colors.text} />
                ) : (
                  <ChevronLeftIcon
                    size={12}
                    color={colors.text}
                    strokeWidth={1}
                    style={{
                      transform: [
                        {
                          rotate: "180deg",
                        },
                      ],
                    }}
                  />
                )}
              </BottomSheetTouchableOpacity>
            );
          })}
        </BottomSheetScrollView>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingRight: 12,
    paddingVertical: 12,
    flexDirection: "row",
  },
  buttons: {
    flexDirection: "row",
    alignContent: "center",
    gap: 4,
    marginTop: 2,
  },
  button: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  leftContainer: {
    alignItems: "center",
    height: "100%",
    paddingTop: 4,
    width: 64,
  },
  avatarContainer: {
    width: 34,
    height: 34,
    borderRadius: 34 / 2,
    position: "relative",
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 34 / 2,
    resizeMode: "cover",
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  content: {
    paddingVertical: 4,
  },
  lineContainer: {
    flex: 1,
    width: "100%",
    marginVertical: 5,
    alignItems: "center",
  },
  line: {
    flex: 1,
    width: 2,
  },
  twoImages: {
    flexDirection: "row",
    gap: -10,
    marginBottom: -2,
  },
  threeImages: {
    height: 25,
  },
  smallAvatarContainer: {
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  smallAvatar: {
    width: 16,
    height: 16,
    borderRadius: 16 / 2,
    borderWidth: 1,
    resizeMode: "cover",
  },
  imageContainer: {
    marginVertical: 8,
  },
  closeButton: {
    position: "absolute",
    left: 16,
    width: 38,
    height: 38,
    borderRadius: 38 / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E1E1E",
  },
  bottomSheetButton: {
    width: "100%",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    height: 54,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
