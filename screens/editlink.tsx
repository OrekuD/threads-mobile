import Header from "@/components/Header";
import { CancelIcon } from "@/components/Icons";
import Typography from "@/components/Typography";
import { isAndroid } from "@/constants/Platform";
import useColors from "@/hooks/useColors";
import useIsDarkMode from "@/hooks/useIsDarkMode";
import useUpdateUserStore from "@/store/updateUserStore";
import { RootStackParamList } from "@/types";
import validateUrl from "@/utils/validateUrl";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Props
  extends NativeStackScreenProps<RootStackParamList, "EditLinkScreen"> {}

export default function EditLinkScreen(props: Props) {
  const colors = useColors();
  const isDarkMode = useIsDarkMode();
  const updateUserStore = useUpdateUserStore();
  const [value, setValue] = React.useState(updateUserStore.values.link || "");

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isAndroid ? colors.background : colors.modalBackground,
      }}
    >
      <Header
        title="Edit link"
        centerTitle
        hasCheckIcon
        isDoneButtonDisabled={!value.trim()}
        onDoneButtonPressed={() => {
          if (!validateUrl(value)) {
            Alert.alert("Please enter a valid link");
            return;
          }
          updateUserStore.updateValue("link", value);
          props.navigation.goBack();
        }}
      />
      <View style={styles.container}>
        <View
          style={[
            styles.textInputContainer,
            {
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.top}>
            <Typography variant="sm" fontWeight={600}>
              Link
            </Typography>
            {value.trim().length > 0 ? (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setValue("")}
                style={[
                  styles.clearButton,
                  {
                    backgroundColor: isDarkMode ? "#767676" : "#989898",
                  },
                ]}
              >
                <CancelIcon size={14} color={colors.background} />
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
          <TextInput
            style={[
              styles.textInput,
              {
                color: "#008AF5",
                verticalAlign: "top",
              },
            ]}
            value={value}
            onChangeText={setValue}
            placeholderTextColor={colors.textSecondary}
            placeholder="https://www.example.com/"
            multiline
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    position: "relative",
  },
  textInputContainer: {
    width: "100%",
    height: 140,
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
  },
  top: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  clearButton: {
    width: 18,
    height: 18,
    borderRadius: 18 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    fontSize: 14,
    flex: 1,
    fontFamily: "Inter",
  },
});
