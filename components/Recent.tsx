import useColors from "@/hooks/useColors";
import React from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "./Typography";
import { CancelIcon, VerifiedIcon } from "./Icons";
import { Image } from "react-native";

interface Props {}

function Recent(props: Props) {
  const colors = useColors();
  return (
    <Pressable style={[styles.container]}>
      <Image
        style={[
          styles.avatar,
          {
            borderColor: colors.border,
          },
        ]}
        source={{ uri: "https://picsum.photos/44" }}
      />
      <View
        style={[
          styles.content,
          {
            borderColor: colors.cardBorder,
          },
        ]}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <View style={styles.username}>
            <Typography
              variant="sm"
              fontWeight={700}
              style={{
                marginBottom: 2,
              }}
              lineLimit={1}
            >
              username
            </Typography>
            <VerifiedIcon size={12} />
          </View>
          <Typography variant="sm" color="secondary" lineLimit={1}>
            Fan page for FC Barcelona Fan page for FC Barcelona
          </Typography>
        </View>
        <TouchableOpacity activeOpacity={0.5} style={[styles.cancelButton]}>
          <Typography variant="sm" fontWeight={500}>
            <CancelIcon size={18} color={colors.textSecondary} />
          </Typography>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}

export default React.memo(Recent);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 44,
    borderWidth: 1,
    marginLeft: 16,
    marginRight: 12,
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    borderBottomWidth: 1,
    paddingVertical: 16,
    flexDirection: "row",
    paddingRight: 16,
  },
  cancelButton: {
    paddingVertical: 12,
    marginLeft: 16,
  },
  username: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
