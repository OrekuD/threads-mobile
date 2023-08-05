import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const [shortDimension, longDimension] =
  SCREEN_WIDTH < SCREEN_HEIGHT
    ? [SCREEN_WIDTH, SCREEN_HEIGHT]
    : [SCREEN_HEIGHT, SCREEN_WIDTH];

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const normalizeX = (size: number) =>
  Math.round(
    PixelRatio.roundToNearestPixel((shortDimension / guidelineBaseWidth) * size)
  );
export const normalizeY = (size: number) =>
  Math.round(
    PixelRatio.roundToNearestPixel((longDimension / guidelineBaseHeight) * size)
  );
