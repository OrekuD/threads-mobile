import useColors from "@/hooks/useColors";
import React from "react";
import { StyleSheet, View, TextInput as RNTextInput } from "react-native";
import Typography from "./Typography";

interface Props {
  label: string;
  onChange?: (text: string) => void;
  placeholder: string;
  value?: string;
  borderColor?: string;
  editable?: boolean;
  noBorder?: boolean;
}

export default function TextInput(props: Props) {
  const colors = useColors();
  return (
    <View
      style={[
        styles.container,
        {
          borderColor: props.borderColor || colors.border,
          borderBottomWidth: props.noBorder ? 0 : 1,
        },
      ]}
    >
      <Typography variant="sm" fontWeight={600}>
        {props.label}
      </Typography>
      {/* <RNTextInput
        value={props.value}
        onChangeText={props.onChange}
        placeholder={props.placeholder}
        placeholderTextColor={colors.textSecondary}
        style={[
          styles.textInput,
          {
            color: colors.text,
          },
        ]}
        editable={props.editable}
      /> */}
      <View style={styles.textInput}>
        <Typography
          variant="sm"
          color={props.value ? colors.text : colors.textSecondary}
        >
          {props.value || props.placeholder}
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomWidth: 1,
    paddingVertical: 4,
  },
  textInput: {
    // fontSize: 14,
    // fontFamily: "Inter",
    height: 24,
    marginBottom: 5,
    justifyContent: "center",
  },
});
