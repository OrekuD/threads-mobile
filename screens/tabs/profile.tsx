import React from "react";
import { View } from "react-native";
import useColors from "@/hooks/useColors";
import Typography from "@/components/Typography";
import { useUserContext } from "@/context/UserContext";
import ProfileView from "@/components/ProfileView";

export default function ProfileScreen() {
  const colors = useColors();
  const userContext = useUserContext();

  const user = React.useMemo(
    () => userContext.state.user,
    [userContext.state.user]
  );

  if (!user) {
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

  return <ProfileView user={user} isModal />;
}
