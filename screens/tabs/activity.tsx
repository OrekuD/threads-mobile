import ActivityView from "@/components/ActivityView";
import Typography from "@/components/Typography";
import useGetUserNotificationsQuery from "@/hooks/queries/useGetUserNotificationsQuery";
import useColors from "@/hooks/useColors";
import useScreensize from "@/hooks/useScreensize";
import NotificationTypes from "@/namespaces/NotificationTypes";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const tabs = [-1].concat(NotificationTypes.list());

export default function ActivityScreen() {
  const { top } = useSafeAreaInsets();
  const scrollRef = React.useRef<FlatList>(null);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const colors = useColors();
  const [selectedTab, setSelectedTab] = React.useState(-1);
  const { height } = useScreensize();
  const userNotificationsQuery = useGetUserNotificationsQuery();

  const notifications = React.useMemo(() => {
    if (!userNotificationsQuery.data) return [];

    if (selectedTab === -1) {
      return userNotificationsQuery.data;
    }

    return userNotificationsQuery.data.filter(
      (notification) => notification.notificationType === selectedTab
    );
  }, [selectedTab, userNotificationsQuery.data]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <View
        style={[
          {
            paddingTop: top + 12,
            backgroundColor: colors.background,
          },
        ]}
      >
        <View style={[styles.heading]}>
          <Typography variant="heading" fontWeight={700}>
            Activity
          </Typography>
          {userNotificationsQuery.isLoading ? (
            <ActivityIndicator size="small" color={colors.text} />
          ) : (
            <></>
          )}
        </View>

        <View style={[styles.tabsContainer]}>
          <FlatList
            data={tabs}
            horizontal
            keyExtractor={(key) => key.toString()}
            contentContainerStyle={{
              paddingHorizontal: 16,
              gap: 6,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              const isActiveTab = item === selectedTab;
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={[
                    styles.tab,
                    {
                      backgroundColor: isActiveTab
                        ? colors.text
                        : colors.background,
                      borderColor: isActiveTab ? colors.text : colors.border,
                    },
                  ]}
                  onPress={() => setSelectedTab(item)}
                >
                  <Typography
                    variant="sm"
                    fontWeight={600}
                    color={isActiveTab ? colors.background : colors.text}
                  >
                    {item === -1 ? "All" : `${NotificationTypes.title(item)}`}
                  </Typography>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
      <FlatList
        data={notifications}
        ref={scrollRef as any}
        keyExtractor={({ id }) => id}
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
        refreshing={isRefreshing}
        refreshControl={
          <RefreshControl
            progressViewOffset={14}
            refreshing={isRefreshing}
            onRefresh={async () => {
              setIsRefreshing(true);
              await userNotificationsQuery.refetch();
              setIsRefreshing(false);
            }}
          />
        }
        scrollEventThrottle={16}
        renderItem={({ item }) => {
          return <ActivityView notification={item} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    zIndex: 4,
  },
  header: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    marginBottom: 8,
    zIndex: 5,
  },
  tabsContainer: {
    width: "100%",
    height: 36,
    marginTop: 6,
    zIndex: 10,
  },
  tab: {
    width: 90,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
