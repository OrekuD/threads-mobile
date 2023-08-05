import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  HeartIcon,
  MenuIcon,
  MessageIcon,
  RepostIcon,
  SendIcon,
} from "./Icons";
import { Image } from "expo-image";
import useColors from "@/hooks/useColors";
import React from "react";
import { blurhash } from "@/constants/Blurhash";
import Typography from "./Typography";
import { Link } from "expo-router";

const { width } = Dimensions.get("screen");

export default function Thread() {
  const colors = useColors();

  const buttons = React.useMemo(
    () => [
      {
        icon: MessageIcon,
        onPress: () => {},
      },
      {
        icon: RepostIcon,
        onPress: () => {},
      },
      {
        icon: SendIcon,
        onPress: () => {},
      },
    ],
    []
  );

  const images = React.useMemo(() => {
    return Math.random() > 0.5 ? Array(3).fill("s") : Array(2).fill("s");
  }, []);

  return (
    <Link href="/thread">
      <View
        style={[
          styles.container,
          {
            borderColor: colors.cardBorder,
          },
        ]}
      >
        <View style={styles.leftContainer}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source="https://picsum.photos/44"
              placeholder={blurhash}
              contentFit="cover"
              transition={500}
            />
          </View>
          <View
            style={[
              styles.line,
              {
                backgroundColor: colors.border,
              },
            ]}
          />
          {images.length === 3 ? (
            <View style={styles.threeImages}>
              {images.map((_, index) => {
                return (
                  <Image
                    key={index}
                    style={[
                      styles.smallAvatar,
                      {
                        borderColor: colors.border,
                        transform: [
                          { scale: 1 - index * 0.15 },
                          {
                            translateX:
                              index === 2 ? 0 : index === 0 ? 10 : -10,
                          },
                          {
                            translateY:
                              index === 2 ? -20 : index === 0 ? 3 : -10,
                          },
                        ],
                      },
                    ]}
                    source="https://picsum.photos/44"
                    placeholder={blurhash}
                    contentFit="cover"
                    transition={1000}
                  />
                );
              })}
            </View>
          ) : (
            <View style={styles.twoImages}>
              {images.map((_, index) => {
                return (
                  <View
                    key={index}
                    style={[
                      styles.smallAvatarContainer,
                      {
                        backgroundColor: colors.background,
                      },
                    ]}
                  >
                    <Image
                      style={[
                        styles.smallAvatar,
                        {
                          borderColor: colors.border,
                        },
                      ]}
                      source="https://picsum.photos/44"
                      placeholder={blurhash}
                      contentFit="cover"
                      transition={1000}
                    />
                  </View>
                );
              })}
            </View>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.top}>
            <Typography variant="sm" fontWeight={600} style={{ flex: 1 }}>
              oreku_
            </Typography>
            <Typography variant="sm" color="secondary">
              33m
            </Typography>
            <TouchableOpacity activeOpacity={0.5} style={styles.menuButton}>
              <MenuIcon size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <Typography variant="sm">
              Fugiat occaecat adipisicing est ullamco officia commodo nisi
              consequat id. Eiusmod officia dolor aute deserunt. consequat id.
              Eiusmod officia dolor aute deserunt.
            </Typography>
          </View>
          {Math.random() >= 0.5 ? (
            <View
              style={[
                styles.imageContainer,
                {
                  width,
                  transform: [
                    {
                      translateX: -70,
                    },
                  ],
                },
              ]}
            >
              <FlatList
                data={Array(3).fill("9")}
                keyExtractor={() => Math.random().toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  gap: 8,
                  paddingLeft: 70,
                  paddingRight: 16,
                }}
                renderItem={({ item }) => {
                  // const imageWidth =
                  //   thread.media.length === 1
                  //     ? width - 70 - 8
                  //     : width - 70 - 24;
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={{
                        borderRadius: 8,
                        overflow: "hidden",
                        width: 300,
                        height: 400,
                        // width: imageWidth,
                        // height:
                        //   thread.media.length > 1 ? 200 : undefined,
                        // aspectRatio:
                        //   thread.media.length > 1
                        //     ? undefined
                        //     : item.aspectRatio,
                      }}
                    >
                      <Image
                        source={{ uri: "https://picsum.photos/250" }}
                        style={{
                          borderRadius: 8,
                          width: "100%",
                          height: "100%",
                          resizeMode: "cover",
                        }}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          ) : (
            <></>
          )}
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} activeOpacity={0.5}>
              <HeartIcon size={24} color={colors.text} />
            </TouchableOpacity>
            {buttons.map(({ icon: Icon, onPress }, index) => {
              return (
                <TouchableOpacity
                  style={styles.button}
                  onPress={onPress}
                  key={index}
                  activeOpacity={0.5}
                >
                  <Icon size={24} color={colors.text} />
                </TouchableOpacity>
              );
            })}
          </View>
          <Typography
            variant="sm"
            color="secondary"
            style={{
              marginTop: 5,
            }}
          >
            26 replies • 112 Likes
          </Typography>
        </View>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingTop: 14,
    paddingBottom: 18,
    flexDirection: "row",
  },
  buttons: {
    flexDirection: "row",
    alignContent: "center",
    gap: 4,
    marginTop: 2,
  },
  button: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  leftContainer: {
    alignItems: "center",
    height: "100%",
    marginRight: 12,
    paddingTop: 6,
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    position: "relative",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuButton: {
    marginLeft: 6,
  },
  content: {
    paddingVertical: 4,
  },
  line: {
    flex: 1,
    width: 2,
    marginVertical: 5,
  },
  twoImages: {
    flexDirection: "row",
    gap: -10,
    marginBottom: -2,
  },
  threeImages: {
    height: 25,
  },
  smallAvatarContainer: {
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  smallAvatar: {
    width: 16,
    height: 16,
    borderRadius: 16 / 2,
    borderWidth: 1,
  },
  imageContainer: {
    marginVertical: 8,
  },
});
