import { Logo } from "@/components/Icons";
import Post from "@/components/Post";
import useColors from "@/hooks/useColors";
import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const colors = useColors();
  const [isLoading, setIsLoading] = React.useState(true);
  const { top } = useSafeAreaInsets();

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <View
          style={[
            styles.header,
            {
              paddingTop: top + 6,
            },
          ]}
        >
          <Logo size={32} color={colors.text} />
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="small" color={colors.text} />
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <FlatList
        ListHeaderComponent={() => (
          <View
            style={[
              styles.header,
              {
                paddingTop: top + 6,
                marginBottom: 6,
              },
            ]}
          >
            <Logo size={32} color={colors.text} />
          </View>
        )}
        data={["3", "2", "1"]}
        keyExtractor={() => Math.random().toString()}
        renderItem={({ item }) => {
          return <Post />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
