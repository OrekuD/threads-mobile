import React from "react";
import { ActivityIndicator, View } from "react-native";
import useColors from "@/hooks/useColors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";
import Header from "@/components/Header";
import { isAndroid } from "@/constants/Platform";
import { FlashList } from "@shopify/flash-list";
import useGetUserLikesQuery from "@/hooks/queries/useGetUserLikesQuery";
import ThreadView from "@/components/ThreadView";
import Typography from "@/components/Typography";
import useScreensize from "@/hooks/useScreensize";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props
  extends NativeStackScreenProps<RootStackParamList, "YourLikesScreen"> {}

export default function YourLikesScreen(props: Props) {
  const colors = useColors();
  const userLikesQuery = useGetUserLikesQuery();
  const { height } = useScreensize();
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isAndroid ? colors.background : colors.modalBackground,
        paddingTop: top,
      }}
    >
      <Header title="Your Likes" hideRightButton hasArrowIcon hasBorder />
      {userLikesQuery.isLoading ? (
        <View
          style={{
            paddingTop: height * 0.3,
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="small" color={colors.text} />
        </View>
      ) : (
        <FlashList
          data={userLikesQuery.data || []}
          estimatedItemSize={150}
          keyExtractor={({ threadId }) => threadId}
          renderItem={({ item }) => (
            <ThreadView variant="list-thread" thread={item} showReplyingTo />
          )}
          ListEmptyComponent={() => (
            <View
              style={{
                paddingTop: height * 0.3,
              }}
            >
              <Typography variant="body" textAlign="center" color="secondary">
                Nothing to see here yet.
              </Typography>
            </View>
          )}
        />
      )}
    </View>
  );
}
