import React from "react";
import ProfileView from "@/components/ProfileView";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";

interface Props
  extends NativeStackScreenProps<
    RootStackParamList,
    "UserProfileModalScreen"
  > {}

export default function UserProfileModalScreen(props: Props) {
  return <ProfileView user={props.route.params.user} isModal />;
}
