import React from "react";
import ProfileView from "@/components/ProfileView";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";
import Typography from "@/components/Typography";
import { ActivityIndicator, View } from "react-native";
import useGetUserQuery from "@/hooks/queries/useGetUserQuery";
import useColors from "@/hooks/useColors";

interface Props
  extends NativeStackScreenProps<RootStackParamList, "UserProfileScreen"> {}

export default function UserProfileScreen(props: Props) {
  const getUserQuery = useGetUserQuery(props.route.params.username);
  const colors = useColors();

  if (getUserQuery.isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="small" color={colors.text} />
      </View>
    );
  }

  if (!getUserQuery.data) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.background,
        }}
      >
        <Typography variant="sm" fontWeight={600}>
          User not found
        </Typography>
      </View>
    );
  }

  return <ProfileView user={getUserQuery.data} />;
}
