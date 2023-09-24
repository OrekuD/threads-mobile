import Header from "@/components/Header";
import { CancelIcon } from "@/components/Icons";
import Typography from "@/components/Typography";
import { isAndroid } from "@/constants/Platform";
import useSubmitReportMutation from "@/hooks/mutations/useSubmitReportMutation";
import useColors from "@/hooks/useColors";
import useIsDarkMode from "@/hooks/useIsDarkMode";
import useToastsStore from "@/store/toastsStore";
import { RootStackParamList } from "@/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface Props
  extends NativeStackScreenProps<RootStackParamList, "ReportAProblemScreen"> {}

export default function ReportAProblemScreen(props: Props) {
  const colors = useColors();
  const isDarkMode = useIsDarkMode();
  const [description, setDescription] = React.useState("");
  const submitReportMutation = useSubmitReportMutation();
  const toastsStore = useToastsStore();

  const handleSubmit = React.useCallback(() => {
    if (submitReportMutation.isLoading || !description.trim()) {
      return;
    }

    submitReportMutation.mutate({ message: description });
  }, [description, submitReportMutation.isLoading]);

  React.useEffect(() => {
    if (submitReportMutation.isSuccess) {
      toastsStore.addToast("Thank you for reporting this problem.");
      props.navigation.goBack();
      setDescription("");
    }
  }, [submitReportMutation.isSuccess]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isAndroid ? colors.background : colors.modalBackground,
      }}
    >
      <Header
        title="Report a problem"
        centerTitle
        isDoneButtonDisabled={!description}
        onDoneButtonPressed={handleSubmit}
        isDoneButtonLoading={submitReportMutation.isLoading}
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
              Description
            </Typography>
            {description.trim().length > 0 ? (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setDescription("")}
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
                color: colors.text,
                verticalAlign: "top",
              },
            ]}
            value={description}
            onChangeText={setDescription}
            placeholderTextColor={colors.textSecondary}
            placeholder="Please include as many details as possible..."
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
