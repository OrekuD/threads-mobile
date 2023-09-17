import { isAndroid } from "@/constants/Platform";
import useColors from "@/hooks/useColors";
import React from "react";
import { Text, TextStyle } from "react-native";

interface Props {
  variant: "tiny" | "sm" | "body" | "body2" | "title" | "heading";
  fontWeight?: 300 | 400 | 500 | 600 | 700;
  color?: "primary" | "secondary" | Omit<string, "primary" | "secondary">;
  style?: TextStyle;
  lineLimit?: number;
  textAlign?: "left" | "center" | "right";
}

export default function Typography(props: React.PropsWithChildren<Props>) {
  const colors = useColors();
  const fontFamily = React.useMemo(() => {
    switch (props.fontWeight) {
      case 300:
        return "InterLight";
      case 400:
        return "Inter";
      case 500:
        return "InterMedium";
      case 600:
        return "InterSemiBold";
      case 700:
        return "InterBold";
      default:
        return "Inter";
    }
  }, [props.fontWeight]);

  const fontSize = React.useMemo(() => {
    switch (props.variant) {
      case "tiny":
        // return isAndroid ? 12 : 10;
        return 12;
      case "sm":
        // return isAndroid ? 14 : 12;
        return 14;
      case "body":
        // return isAndroid ? 16 : 14;
        return 16;
      case "body2":
        // return isAndroid ? 18 : 16;
        return 18;
      case "title":
        // return isAndroid ? 24 : 22;
        return 24;
      case "heading":
        // return isAndroid ? 34 : 30;
        return 34;
      default:
        // return isAndroid ? 16 : 14;
        return 14;
    }
  }, [props.variant]);

  const color: string = React.useMemo(() => {
    if (!props.color) return colors.text;
    switch (props.color) {
      case "primary":
        return colors.text;
      case "secondary":
        return colors.textSecondary;
      default:
        return props.color as string;
    }
  }, [props.color, colors.text, colors.textSecondary]);

  return (
    <Text
      style={[
        {
          fontFamily,
          fontSize,
          color,
          lineHeight: fontSize * 1.3,
          textAlign: props.textAlign,
        },
        props.style,
      ]}
      numberOfLines={props.lineLimit}
    >
      {props.children}
    </Text>
  );
}
