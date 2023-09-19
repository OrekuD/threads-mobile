import { ViewStyle } from "react-native";
import Svg, {
  Circle,
  ClipPath,
  Defs,
  G,
  Path,
  RadialGradient,
  Rect,
  Stop,
} from "react-native-svg";

export interface BaseSvgProps {
  size: number;
  style?: ViewStyle;
  strokeWidth?: number;
}

export interface SvgProps extends BaseSvgProps {
  color: string;
}

export const HomeActiveIcon = ({ color, size, style }: SvgProps) => (
  <Svg width={size} height={size} style={style} viewBox="0 0 32 32" fill="none">
    <Path
      d="M27.8738 24.1632V15.3473C27.8738 14.0238 27.3452 12.7537 26.3839 11.844C25.2571 10.7776 23.6938 9.33896 22.4316 8.33137C20.0442 6.42542 18.8527 4.86816 16 4.86816C13.1473 4.86816 11.9557 6.42542 9.56828 8.33137C8.30616 9.33896 6.74281 10.7776 5.61599 11.844C4.65473 12.7537 4.1261 14.0238 4.1261 15.3473V24.1632C4.1261 25.8026 5.45513 27.1317 7.09456 27.1317H11.0525C12.1455 27.1317 13.0315 26.2456 13.0315 25.1527V20.8044C13.0315 19.8119 13.5275 18.8851 14.3534 18.3345C15.3505 17.6698 16.6495 17.6698 17.6466 18.3345C18.4724 18.8851 18.9684 19.8119 18.9684 20.8044V25.1527C18.9684 26.2456 19.8544 27.1317 20.9474 27.1317H24.9054C26.5448 27.1317 27.8738 25.8026 27.8738 24.1632Z"
      fill={color}
    />
  </Svg>
);

export const ImportIcon = ({ color, size, style }: SvgProps) => (
  <Svg width={size} height={size} style={style} viewBox="0 0 17 16" fill="none">
    <Path
      d="M8.5 1V11M8.5 11L6 8.57576M8.5 11L11 8.57576"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.9 5H3.3C2.95522 5 2.62456 5.13546 2.38076 5.37658C2.13696 5.6177 2 5.94472 2 6.28571V12.7143C2 13.0553 2.13696 13.3823 2.38076 13.6234C2.62456 13.8645 2.95522 14 3.3 14H13.7C14.0448 14 14.3754 13.8645 14.6192 13.6234C14.863 13.3823 15 13.0553 15 12.7143V6.28571C15 5.94472 14.863 5.6177 14.6192 5.37658C14.3754 5.13546 14.0448 5 13.7 5H11.1"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ProfileActiveIcon = ({ color, size, style }: SvgProps) => (
  <Svg width={size} height={size} style={style} viewBox="0 0 32 32" fill="none">
    <Path
      d="M8.46647 26.4103H23.4972C24.9332 26.4103 25.9244 24.9722 25.4134 23.6302C24.2021 20.4495 21.1523 18.3474 17.7487 18.3474H14.1657C10.7482 18.3474 7.70253 20.5034 6.56673 23.7266C6.10499 25.0369 7.07717 26.4103 8.46647 26.4103Z"
      fill={color}
    />
    <Path
      d="M16.0465 13.7292C18.2942 13.7292 20.1162 11.9071 20.1162 9.65952C20.1162 7.4119 18.2942 5.58984 16.0465 5.58984C13.7989 5.58984 11.9769 7.4119 11.9769 9.65952C11.9769 11.9071 13.7989 13.7292 16.0465 13.7292Z"
      fill={color}
    />
    <Path
      d="M8.46647 26.4103H23.4972C24.9332 26.4103 25.9244 24.9722 25.4134 23.6302C24.2021 20.4495 21.1523 18.3474 17.7487 18.3474H14.1657C10.7482 18.3474 7.70253 20.5034 6.56673 23.7266C6.10499 25.0369 7.07717 26.4103 8.46647 26.4103Z"
      stroke={color}
      strokeWidth="2"
    />
    <Path
      d="M16.0465 13.7292C18.2942 13.7292 20.1162 11.9071 20.1162 9.65952C20.1162 7.4119 18.2942 5.58984 16.0465 5.58984C13.7989 5.58984 11.9769 7.4119 11.9769 9.65952C11.9769 11.9071 13.7989 13.7292 16.0465 13.7292Z"
      stroke={color}
      strokeWidth="2"
    />
  </Svg>
);

export const CreateIcon = ({ color, size, style }: SvgProps) => (
  <Svg width={size} height={size} style={style} viewBox="0 0 33 32" fill="none">
    <Path
      d="M16.5 6.25H12.75C9.43629 6.25 6.75 8.93629 6.75 12.25V19.75C6.75 23.0637 9.43629 25.75 12.75 25.75H20.25C23.5637 25.75 26.25 23.0637 26.25 19.75V16M16.981 15.4534L25.396 7.03838"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </Svg>
);

export const QuoteIcon = ({ color, size, style }: SvgProps) => (
  <Svg width={size} height={size} style={style} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.4954 5C19.0697 5 19.6204 5.22811 20.0264 5.63415C20.4325 6.04019 20.6606 6.5909 20.6606 7.16513V17.9908C20.6606 18.565 20.4325 19.1157 20.0264 19.5218C19.6204 19.9278 19.0697 20.1559 18.4954 20.1559L14.2488 20.1548L12.7654 22.6382C12.579 22.8246 12.331 22.9366 12.0679 22.9531C11.8048 22.9697 11.5447 22.8897 11.3364 22.7281L11.2347 22.6382L9.75128 20.1548L5.50467 20.1559C4.93044 20.1559 4.37973 19.9278 3.97369 19.5218C3.56765 19.1157 3.33954 18.565 3.33954 17.9908V7.16513C3.33954 6.5909 3.56765 6.04019 3.97369 5.63415C4.37973 5.22811 4.93044 5 5.50467 5H18.4954Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.999 13.6602C12.5403 13.6602 13.0816 13.119 13.0816 12.5777C13.0816 12.0364 12.5403 11.4951 11.999 11.4951C11.4577 11.4951 10.9175 12.0364 10.9175 12.5777C10.9175 13.119 11.4577 13.6602 11.999 13.6602ZM7.66876 13.6602C8.21004 13.6602 8.75133 13.119 8.75133 12.5777C8.75133 12.0364 8.21004 11.4951 7.66876 11.4951C7.12748 11.4951 6.58728 12.0364 6.58728 12.5777C6.58728 13.119 7.12748 13.6602 7.66876 13.6602ZM16.3293 13.6602C16.8706 13.6602 17.4118 13.119 17.4118 12.5777C17.4118 12.0364 16.8706 11.4951 16.3293 11.4951C15.788 11.4951 15.2478 12.0364 15.2478 12.5777C15.2478 13.119 15.788 13.6602 16.3293 13.6602Z"
      fill={color}
    />
  </Svg>
);

export const TwitterIcon = ({ color, size, style }: SvgProps) => (
  <Svg
    width={size * 1.038}
    height={size}
    viewBox="0 0 322 310"
    fill="none"
    style={style}
  >
    <Path
      d="M0 2.71324H95.2341L183.262 121.121L292.834 0L318.868 0.452206L196.241 138.155L322 307.287H226.804L143.719 196.944L42.2215 310H16.6018L131.117 180.814L0 2.71324ZM86.2541 20.1993H35.958L237.18 289.348H286.57L86.2541 20.1993Z"
      fill={color}
    />
  </Svg>
);

export const MoreIcon = ({ color, size, style }: SvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <G clip-path="url(#clip0_33_24502)">
      <Path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke={color}
        strokeWidth="2"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 13.5C6.67157 13.5 6 12.8284 6 12C6 11.1716 6.67157 10.5 7.5 10.5C8.32843 10.5 9 11.1716 9 12C9 12.8284 8.32843 13.5 7.5 13.5Z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12C13.5 12.8284 12.8284 13.5 12 13.5Z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.5 13.5C15.6716 13.5 15 12.8284 15 12C15 11.1716 15.6716 10.5 16.5 10.5C17.3284 10.5 18 11.1716 18 12C18 12.8284 17.3284 13.5 16.5 13.5Z"
        fill={color}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_33_24502">
        <Rect width="24" height="24" fill={color} />
      </ClipPath>
    </Defs>
  </Svg>
);

export const ActivityActiveIcon = ({ color, size, style }: SvgProps) => (
  <Svg
    width={size * 1.0315}
    height={size}
    style={style}
    viewBox="0 0 33 32"
    fill="none"
  >
    <Path
      d="M24.6483 7.3849C21.344 4.72015 17.9651 7.3849 16.75 8.60979C15.5348 7.3849 12.156 4.72015 8.85169 7.3849C5.54734 10.0497 4.82919 15.579 9.45925 20.2463C14.0893 24.9136 16.75 25.7584 16.75 25.7584C16.75 25.7584 19.4107 24.9136 24.0407 20.2463C28.6708 15.579 27.9526 10.0497 24.6483 7.3849Z"
      fill={color}
      stroke={color}
      strokeWidth="2"
    />
  </Svg>
);

export const HomeIcon = ({ color, size, style }: SvgProps) => (
  <Svg width={size} height={size} style={style} viewBox="0 0 32 32" fill="none">
    <Path
      d="M26.7632 23.3452V15.354C26.7632 14.1543 26.2841 13.003 25.4127 12.1783C24.3913 11.2117 22.9742 9.9076 21.8301 8.99426C19.666 7.26658 18.5859 5.85498 16 5.85498C13.4141 5.85498 12.334 7.26658 10.1699 8.99426C9.02584 9.9076 7.60871 11.2117 6.58729 12.1783C5.71594 13.003 5.23676 14.1543 5.23676 15.354V23.3452C5.23676 24.8313 6.44147 25.6378 7.92757 25.6378H11.7639C12.3161 25.6378 12.7639 25.1901 12.7639 24.6378V20.3006V19.3398C12.7639 17.529 14.2318 16.061 16.0427 16.061C17.8536 16.061 19.3216 17.529 19.3216 19.3398V20.3006V24.6378C19.3216 25.1901 19.7693 25.6378 20.3216 25.6378H24.0724C25.5585 25.6378 26.7632 24.8313 26.7632 23.3452Z"
      stroke={color}
      strokeWidth="2.5"
    />
  </Svg>
);

export const SearchIcon = ({ color, size, style }: SvgProps) => (
  <Svg
    width={size * 1.03125}
    height={size}
    style={style}
    viewBox="0 0 33 32"
    fill="none"
  >
    <Path
      d="M21.4332 21.1673C23.0977 19.4947 24.1265 17.1888 24.1265 14.6426C24.1265 9.53394 19.9851 5.39258 14.8765 5.39258C9.76783 5.39258 5.62646 9.53394 5.62646 14.6426C5.62646 19.7512 9.76783 23.8926 14.8765 23.8926C17.4389 23.8926 19.758 22.8506 21.4332 21.1673ZM21.4332 21.1673L26.8735 26.6076"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </Svg>
);

export const ProfileIcon = ({ color, size, style }: SvgProps) => (
  <Svg width={size} height={size} style={style} viewBox="0 0 32 32" fill="none">
    <Path
      d="M8.46647 26.4103H23.4972C24.9332 26.4103 25.9244 24.9722 25.4134 23.6302C24.2021 20.4495 21.1523 18.3474 17.7487 18.3474H14.1657C10.7482 18.3474 7.70253 20.5034 6.56673 23.7266C6.10499 25.0369 7.07717 26.4103 8.46647 26.4103Z"
      stroke={color}
      strokeWidth="2.5"
    />
    <Path
      d="M16.0465 13.7292C18.2942 13.7292 20.1162 11.9071 20.1162 9.65952C20.1162 7.4119 18.2942 5.58984 16.0465 5.58984C13.7989 5.58984 11.9769 7.4119 11.9769 9.65952C11.9769 11.9071 13.7989 13.7292 16.0465 13.7292Z"
      stroke={color}
      strokeWidth="2.5"
    />
  </Svg>
);

export const PlusIcon = ({ color, size, style }: SvgProps) => (
  <Svg
    width={size}
    height={size}
    style={style}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={4}
    stroke={color}
  >
    <Path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </Svg>
);

export const CheckIcon = ({ color, size, style }: SvgProps) => (
  <Svg viewBox="0 0 30 30" width={size} height={size} style={style}>
    <Path
      d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z"
      fill={color}
    />
  </Svg>
);

export const ActivityIcon = ({ color, size, style }: SvgProps) => (
  <Svg
    width={size * 1.03125}
    height={size}
    style={style}
    viewBox="0 0 33 32"
    fill="none"
  >
    <Path
      d="M24.6483 7.3849C21.344 4.72015 17.9651 7.3849 16.75 8.60979C15.5348 7.3849 12.156 4.72015 8.85169 7.3849C5.54734 10.0497 4.82919 15.579 9.45925 20.2463C14.0893 24.9136 16.75 25.7584 16.75 25.7584C16.75 25.7584 19.4107 24.9136 24.0407 20.2463C28.6708 15.579 27.9526 10.0497 24.6483 7.3849Z"
      stroke={color}
      strokeWidth="2.5"
    />
  </Svg>
);

export const Logo = ({ color, size, style }: SvgProps) => (
  <Svg
    width={size}
    height={size * 1.143}
    style={style}
    viewBox="0 0 28 32"
    fill="none"
  >
    <Path
      d="M21.788 14.8315C21.6479 14.7654 21.5055 14.7019 21.3612 14.641C21.11 10.0898 18.5808 7.48429 14.3339 7.45762C14.3147 7.45751 14.2955 7.45751 14.2763 7.45751C11.7361 7.45751 9.62349 8.52361 8.32318 10.4636L10.6588 12.0389C11.6302 10.5898 13.1547 10.2809 14.2774 10.2809C14.2904 10.2809 14.3034 10.2809 14.3162 10.281C15.7146 10.2898 16.7698 10.6896 17.4527 11.4691C17.9497 12.0367 18.2821 12.821 18.4467 13.8108C17.2069 13.6036 15.8661 13.5399 14.4328 13.6207C10.395 13.8494 7.79925 16.1648 7.97359 19.3821C8.06205 21.0141 8.88895 22.4181 10.3018 23.3353C11.4964 24.1106 13.035 24.4898 14.634 24.404C16.7457 24.2901 18.4023 23.498 19.558 22.0495C20.4357 20.9495 20.9908 19.524 21.236 17.7278C22.2423 18.325 22.9882 19.1108 23.4001 20.0555C24.1005 21.6613 24.1413 24.3001 21.9514 26.4515C20.0328 28.3361 17.7265 29.1515 14.241 29.1766C10.3746 29.1485 7.45052 27.9293 5.54937 25.553C3.76909 23.3278 2.84904 20.1138 2.81471 16.0001C2.84904 11.8864 3.76909 8.67239 5.54937 6.44724C7.45052 4.07094 10.3745 2.85179 14.2409 2.82354C18.1353 2.85201 21.1103 4.07702 23.0843 6.46479C24.0522 7.63572 24.7819 9.10826 25.263 10.8252L28 10.1072C27.4169 7.99382 26.4993 6.17274 25.2507 4.66246C22.7202 1.60124 19.0191 0.0326467 14.2504 0.00012207H14.2314C9.47237 0.0325337 5.81278 1.60709 3.35427 4.68001C1.16654 7.41452 0.0380376 11.2194 0.000118655 15.9889L0 16.0001L0.000118655 16.0114C0.0380376 20.7808 1.16654 24.5858 3.35427 27.3203C5.81278 30.3931 9.47237 31.9678 14.2314 32.0001H14.2504C18.4815 31.9713 21.4638 30.8821 23.9206 28.4686C27.135 25.3111 27.0382 21.3533 25.9788 18.9236C25.2187 17.1813 23.7696 15.7662 21.788 14.8315ZM14.4828 21.5846C12.7132 21.6826 10.8747 20.9016 10.784 19.2288C10.7168 17.9885 11.6818 16.6045 14.5914 16.4396C14.9247 16.4207 15.2516 16.4115 15.5729 16.4115C16.6297 16.4115 17.6185 16.5124 18.5174 16.7056C18.1821 20.8226 16.2155 21.4911 14.4828 21.5846Z"
      fill={color}
    />
  </Svg>
);

export const HeartIcon = ({ color, size, style }: SvgProps) => (
  <Svg width={size} height={size} style={style} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18.4999 4.96682C15.7806 2.79133 12.9999 4.96681 11.9999 5.96681C10.9999 4.96681 8.2193 2.79133 5.49996 4.96682C2.78062 7.1423 2.18961 11.6564 5.99996 15.4668C9.81031 19.2771 11.9999 19.9668 11.9999 19.9668C11.9999 19.9668 14.1896 19.2771 17.9999 15.4668C21.8103 11.6564 21.2193 7.1423 18.4999 4.96682Z"
      stroke={color}
      strokeWidth="1.5"
    />
  </Svg>
);

export const ArrowLeftIcon = ({ color, size, style }: SvgProps) => (
  <Svg
    width={size}
    height={size}
    style={style}
    viewBox="0 0 24 24"
    strokeWidth={2}
    fill="none"
    stroke={color}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
    />
  </Svg>
);

export const HeartFilledIcon = ({ color, size, style }: SvgProps) => (
  <Svg width={size} height={size} style={style} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18.4999 4.96682C15.7806 2.79133 12.9999 4.96681 11.9999 5.96681C10.9999 4.96681 8.2193 2.79133 5.49996 4.96682C2.78062 7.1423 2.18961 11.6564 5.99996 15.4668C9.81031 19.2771 11.9999 19.9668 11.9999 19.9668C11.9999 19.9668 14.1896 19.2771 17.9999 15.4668C21.8103 11.6564 21.2193 7.1423 18.4999 4.96682Z"
      fill={color}
      stroke={color}
      strokeWidth="1.5"
    />
  </Svg>
);

export const SendIcon = ({ color, size, style }: SvgProps) => (
  <Svg width={size} height={size} style={style} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19.5 5.5H4.5L10 11M19.5 5.5L12 18.5L10 11M19.5 5.5L10 11"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </Svg>
);

export const MessageIcon = ({ color, size, style }: SvgProps) => (
  <Svg width={size} height={size} style={style} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 12C4 16.4183 7.58172 20 12 20C13.2552 20 14.4428 19.7109 15.5 19.1958L19.5 20L19 15.876C19.6372 14.7278 20 13.4063 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z"
      stroke={color}
      strokeWidth="1.5"
    />
  </Svg>
);

export const ShareIcon = ({ color, size, style }: SvgProps) => (
  <Svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    style={style}
    fill={color}
  >
    <Path d="M8.71,7.71,11,5.41V15a1,1,0,0,0,2,0V5.41l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42l-4-4a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-4,4A1,1,0,1,0,8.71,7.71ZM21,12a1,1,0,0,0-1,1v6a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V13a1,1,0,0,0-2,0v6a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V13A1,1,0,0,0,21,12Z" />
  </Svg>
);

export const LinkIcon = ({ color, size, style }: SvgProps) => (
  <Svg
    viewBox="0 0 24 24"
    id="link"
    width={size}
    height={size}
    style={[
      style,
      {
        transform: [{ rotate: "-45deg" }],
      },
    ]}
    fill={color}
  >
    <Path
      d="M10,15H7c-1.7,0-3-1.3-3-3s1.3-3,3-3h3c0.6,0,1-0.4,1-1s-0.4-1-1-1H7c-2.8,0-5,2.2-5,5s2.2,5,5,5h3c0.6,0,1-0.4,1-1
	S10.6,15,10,15z M17,7h-3c-0.6,0-1,0.4-1,1s0.4,1,1,1h3c1.7,0,3,1.3,3,3s-1.3,3-3,3h-3c-0.6,0-1,0.4-1,1s0.4,1,1,1h3
	c2.8,0,5-2.2,5-5S19.8,7,17,7z M8,12c0,0.6,0.4,1,1,1h6c0.6,0,1-0.4,1-1s-0.4-1-1-1H9C8.4,11,8,11.4,8,12z"
    />
  </Svg>
);

export const AddToStoryIcon = ({ color, size, style }: SvgProps) => (
  <Svg
    width={size}
    height={size}
    style={style}
    fill="none"
    viewBox="0 0 24 24"
    id="add-instagram-story"
  >
    <Path
      fill={color}
      fillRule="evenodd"
      d="M12 5.25C12.4142 5.25 12.75 5.58579 12.75 6V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V6C11.25 5.58579 11.5858 5.25 12 5.25Z"
      clipRule="evenodd"
    />
    <Path
      fill={color}
      fillRule="evenodd"
      d="M5.25 12C5.25 11.5858 5.58579 11.25 6 11.25H18C18.4142 11.25 18.75 11.5858 18.75 12 18.75 12.4142 18.4142 12.75 18 12.75H6C5.58579 12.75 5.25 12.4142 5.25 12zM10.2263 2.128C10.3296 2.52914 10.0881 2.93802 9.68694 3.04127 9.19056 3.16903 8.7103 3.33698 8.24979 3.54149 7.87123 3.7096 7.42806 3.539 7.25994 3.16044 7.09183 2.78187 7.26243 2.3387 7.64099 2.17059 8.17667 1.9327 8.73547 1.73727 9.31306 1.58861 9.7142 1.48537 10.1231 1.72686 10.2263 2.128zM5.75633 4.15238C6.03781 4.45625 6.01966 4.93078 5.71579 5.21226 4.97148 5.90172 4.34093 6.71184 3.85525 7.61113 3.65841 7.97559 3.2034 8.11148 2.83894 7.91464 2.47448 7.71781 2.33859 7.26279 2.53543 6.89834 3.1 5.85298 3.83243 4.91218 4.69645 4.11183 5.00032 3.83035 5.47485 3.8485 5.75633 4.15238zM2.25612 9.61903C2.66481 9.6865 2.94142 10.0725 2.87396 10.4812 2.79247 10.9748 2.75 11.4821 2.75 11.9999 2.75 12.5177 2.79247 13.025 2.87396 13.5186 2.94142 13.9273 2.66481 14.3133 2.25612 14.3808 1.84744 14.4482 1.46145 14.1716 1.39399 13.7629 1.29922 13.1888 1.25 12.5998 1.25 11.9999 1.25 11.4 1.29922 10.811 1.39399 10.2369 1.46145 9.82819 1.84744 9.55157 2.25612 9.61903zM2.83894 16.0851C3.2034 15.8883 3.65841 16.0242 3.85525 16.3887 4.34093 17.288 4.97147 18.0981 5.71578 18.7875 6.01966 19.069 6.03781 19.5435 5.75633 19.8474 5.47485 20.1513 5.00032 20.1694 4.69644 19.888 3.83243 19.0876 3.1 18.1468 2.53543 17.1015 2.33859 16.737 2.47448 16.282 2.83894 16.0851zM7.25994 20.8394C7.42805 20.4608 7.87122 20.2902 8.24979 20.4583 8.7103 20.6628 9.19056 20.8308 9.68694 20.9585 10.0881 21.0618 10.3296 21.4707 10.2263 21.8718 10.1231 22.2729 9.7142 22.5144 9.31306 22.4112 8.73547 22.2625 8.17667 22.0671 7.64099 21.8292 7.26243 21.6611 7.09183 21.2179 7.25994 20.8394zM11.25 2C11.25 1.58579 11.5858 1.25 12 1.25 17.9371 1.25 22.75 6.06294 22.75 12 22.75 12.4142 22.4142 12.75 22 12.75 21.5858 12.75 21.25 12.4142 21.25 12 21.25 6.89137 17.1086 2.75 12 2.75 11.5858 2.75 11.25 2.41421 11.25 2zM21.4682 15.3127C21.8478 15.4786 22.021 15.9207 21.8552 16.3003 20.197 20.0954 16.4094 22.75 12 22.75 11.5858 22.75 11.25 22.4142 11.25 22 11.25 21.5858 11.5858 21.25 12 21.25 15.7919 21.25 19.0526 18.9682 20.4806 15.6997 20.6465 15.3202 21.0886 15.1469 21.4682 15.3127z"
      clipRule="evenodd"
    />
  </Svg>
);

export const InstagramIcon = ({ color, size, style }: SvgProps) => (
  <Svg width={size} height={size} style={style} viewBox="0 0 23 22" fill="none">
    <Path
      d="M8.32599 11C8.32599 8.97503 9.96809 7.33304 11.9943 7.33304C14.0205 7.33304 15.6634 8.97503 15.6634 11C15.6634 13.025 14.0205 14.667 11.9943 14.667C9.96809 14.667 8.32599 13.025 8.32599 11ZM6.34251 11C6.34251 14.1196 8.8728 16.6484 11.9943 16.6484C15.1157 16.6484 17.646 14.1196 17.646 11C17.646 7.8804 15.1157 5.35163 11.9943 5.35163C8.8728 5.35163 6.34251 7.8804 6.34251 11ZM16.549 5.12767C16.5489 5.38874 16.6262 5.64398 16.7713 5.86111C16.9163 6.07824 17.1225 6.24751 17.3638 6.34752C17.6051 6.44752 17.8707 6.47377 18.1269 6.42294C18.3832 6.37211 18.6185 6.24649 18.8033 6.06195C18.9881 5.87742 19.114 5.64227 19.1651 5.38624C19.2161 5.1302 19.1901 4.86478 19.0902 4.62355C18.9904 4.38231 18.8211 4.17608 18.604 4.03095C18.3869 3.88582 18.1315 3.8083 17.8703 3.8082H17.8698C17.5196 3.80836 17.1838 3.94741 16.9362 4.19481C16.6886 4.44221 16.5493 4.77773 16.549 5.12767ZM7.54761 19.9537C6.47451 19.9049 5.89124 19.7263 5.50363 19.5753C4.98976 19.3754 4.62311 19.1373 4.23761 18.7525C3.85212 18.3678 3.61349 18.0017 3.41432 17.4882C3.26322 17.101 3.08447 16.5179 3.03569 15.4454C2.98233 14.2859 2.97168 13.9376 2.97168 11.0001C2.97168 8.06256 2.98321 7.71522 3.03569 6.55477C3.08456 5.48231 3.26463 4.90037 3.41432 4.51202C3.61437 3.99846 3.85264 3.63202 4.23761 3.24676C4.62258 2.8615 4.98888 2.62302 5.50363 2.42396C5.89107 2.27295 6.47451 2.09431 7.54761 2.04556C8.70779 1.99223 9.0563 1.98158 11.9943 1.98158C14.9322 1.98158 15.2811 1.99311 16.4423 2.04556C17.5154 2.0944 18.0977 2.27436 18.4862 2.42396C19.0001 2.62302 19.3668 2.86202 19.7523 3.24676C20.1377 3.6315 20.3755 3.99846 20.5755 4.51202C20.7266 4.89922 20.9054 5.48231 20.9542 6.55477C21.0075 7.71522 21.0182 8.06256 21.0182 11.0001C21.0182 13.9376 21.0075 14.285 20.9542 15.4454C20.9053 16.5179 20.7257 17.1008 20.5755 17.4882C20.3755 18.0017 20.1372 18.3682 19.7523 18.7525C19.3673 19.1369 19.0001 19.3754 18.4862 19.5753C18.0988 19.7263 17.5154 19.905 16.4423 19.9537C15.2821 20.0071 14.9336 20.0177 11.9943 20.0177C9.05498 20.0177 8.70744 20.0071 7.54761 19.9537ZM7.45647 0.066616C6.28475 0.119944 5.48409 0.305624 4.78486 0.577544C4.06071 0.858352 3.44769 1.23508 2.83511 1.84633C2.22252 2.45758 1.84654 3.0712 1.56556 3.79491C1.29348 4.49416 1.10769 5.2939 1.05433 6.46492C1.00009 7.63778 0.987671 8.01275 0.987671 11C0.987671 13.9872 1.00009 14.3622 1.05433 15.5351C1.10769 16.7062 1.29348 17.5058 1.56556 18.2051C1.84654 18.9284 2.22261 19.5427 2.83511 20.1537C3.4476 20.7647 4.06071 21.1409 4.78486 21.4225C5.48541 21.6944 6.28475 21.8801 7.45647 21.9334C8.63065 21.9867 9.00523 22 11.9943 22C14.9833 22 15.3585 21.9876 16.5321 21.9334C17.7039 21.8801 18.504 21.6944 19.2037 21.4225C19.9274 21.1409 20.5409 20.7649 21.1534 20.1537C21.766 19.5424 22.1412 18.9284 22.423 18.2051C22.6951 17.5058 22.8817 16.7061 22.9342 15.5351C22.9876 14.3613 23 13.9872 23 11C23 8.01275 22.9876 7.63778 22.9342 6.46492C22.8809 5.29382 22.6951 4.49372 22.423 3.79491C22.1412 3.07164 21.7651 2.45854 21.1534 1.84633C20.5418 1.23411 19.9274 0.858352 19.2046 0.577544C18.504 0.305624 17.7038 0.119064 16.533 0.066616C15.3594 0.013288 14.9842 0 11.9952 0C9.00611 0 8.63065 0.012408 7.45647 0.066616Z"
      fill={color}
    />
    <Path
      d="M8.32599 11C8.32599 8.97503 9.96809 7.33304 11.9943 7.33304C14.0205 7.33304 15.6634 8.97503 15.6634 11C15.6634 13.025 14.0205 14.667 11.9943 14.667C9.96809 14.667 8.32599 13.025 8.32599 11ZM6.34251 11C6.34251 14.1196 8.8728 16.6484 11.9943 16.6484C15.1157 16.6484 17.646 14.1196 17.646 11C17.646 7.8804 15.1157 5.35163 11.9943 5.35163C8.8728 5.35163 6.34251 7.8804 6.34251 11ZM16.549 5.12767C16.5489 5.38874 16.6262 5.64398 16.7713 5.86111C16.9163 6.07824 17.1225 6.24751 17.3638 6.34752C17.6051 6.44752 17.8707 6.47377 18.1269 6.42294C18.3832 6.37211 18.6185 6.24649 18.8033 6.06195C18.9881 5.87742 19.114 5.64227 19.1651 5.38624C19.2161 5.1302 19.1901 4.86478 19.0902 4.62355C18.9904 4.38231 18.8211 4.17608 18.604 4.03095C18.3869 3.88582 18.1315 3.8083 17.8703 3.8082H17.8698C17.5196 3.80836 17.1838 3.94741 16.9362 4.19481C16.6886 4.44221 16.5493 4.77773 16.549 5.12767ZM7.54761 19.9537C6.47451 19.9049 5.89124 19.7263 5.50363 19.5753C4.98976 19.3754 4.62311 19.1373 4.23761 18.7525C3.85212 18.3678 3.61349 18.0017 3.41432 17.4882C3.26322 17.101 3.08447 16.5179 3.03569 15.4454C2.98233 14.2859 2.97168 13.9376 2.97168 11.0001C2.97168 8.06256 2.98321 7.71522 3.03569 6.55477C3.08456 5.48231 3.26463 4.90037 3.41432 4.51202C3.61437 3.99846 3.85264 3.63202 4.23761 3.24676C4.62258 2.8615 4.98888 2.62302 5.50363 2.42396C5.89107 2.27295 6.47451 2.09431 7.54761 2.04556C8.70779 1.99223 9.0563 1.98158 11.9943 1.98158C14.9322 1.98158 15.2811 1.99311 16.4423 2.04556C17.5154 2.0944 18.0977 2.27436 18.4862 2.42396C19.0001 2.62302 19.3668 2.86202 19.7523 3.24676C20.1377 3.6315 20.3755 3.99846 20.5755 4.51202C20.7266 4.89922 20.9054 5.48231 20.9542 6.55477C21.0075 7.71522 21.0182 8.06256 21.0182 11.0001C21.0182 13.9376 21.0075 14.285 20.9542 15.4454C20.9053 16.5179 20.7257 17.1008 20.5755 17.4882C20.3755 18.0017 20.1372 18.3682 19.7523 18.7525C19.3673 19.1369 19.0001 19.3754 18.4862 19.5753C18.0988 19.7263 17.5154 19.905 16.4423 19.9537C15.2821 20.0071 14.9336 20.0177 11.9943 20.0177C9.05498 20.0177 8.70744 20.0071 7.54761 19.9537ZM7.45647 0.066616C6.28475 0.119944 5.48409 0.305624 4.78486 0.577544C4.06071 0.858352 3.44769 1.23508 2.83511 1.84633C2.22252 2.45758 1.84654 3.0712 1.56556 3.79491C1.29348 4.49416 1.10769 5.2939 1.05433 6.46492C1.00009 7.63778 0.987671 8.01275 0.987671 11C0.987671 13.9872 1.00009 14.3622 1.05433 15.5351C1.10769 16.7062 1.29348 17.5058 1.56556 18.2051C1.84654 18.9284 2.22261 19.5427 2.83511 20.1537C3.4476 20.7647 4.06071 21.1409 4.78486 21.4225C5.48541 21.6944 6.28475 21.8801 7.45647 21.9334C8.63065 21.9867 9.00523 22 11.9943 22C14.9833 22 15.3585 21.9876 16.5321 21.9334C17.7039 21.8801 18.504 21.6944 19.2037 21.4225C19.9274 21.1409 20.5409 20.7649 21.1534 20.1537C21.766 19.5424 22.1412 18.9284 22.423 18.2051C22.6951 17.5058 22.8817 16.7061 22.9342 15.5351C22.9876 14.3613 23 13.9872 23 11C23 8.01275 22.9876 7.63778 22.9342 6.46492C22.8809 5.29382 22.6951 4.49372 22.423 3.79491C22.1412 3.07164 21.7651 2.45854 21.1534 1.84633C20.5418 1.23411 19.9274 0.858352 19.2046 0.577544C18.504 0.305624 17.7038 0.119064 16.533 0.066616C15.3594 0.013288 14.9842 0 11.9952 0C9.00611 0 8.63065 0.012408 7.45647 0.066616Z"
      fill={color}
    />
  </Svg>
);

export const InstagramColorIcon = ({ size, style }: BaseSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 39 40" fill="none" style={style}>
    <G clip-path="url(#clip0_33_23566)">
      <Path
        d="M29.8594 0.5H9.14062C4.09239 0.5 0 4.59239 0 9.64062V30.3594C0 35.4076 4.09239 39.5 9.14062 39.5H29.8594C34.9076 39.5 39 35.4076 39 30.3594V9.64062C39 4.59239 34.9076 0.5 29.8594 0.5Z"
        fill="url(#paint0_radial_33_23566)"
      />
      <Path
        d="M29.8594 0.5H9.14062C4.09239 0.5 0 4.59239 0 9.64062V30.3594C0 35.4076 4.09239 39.5 9.14062 39.5H29.8594C34.9076 39.5 39 35.4076 39 30.3594V9.64062C39 4.59239 34.9076 0.5 29.8594 0.5Z"
        fill="url(#paint1_radial_33_23566)"
      />
      <Path
        d="M19.5014 4.76562C15.364 4.76562 14.8447 4.78375 13.2198 4.85764C11.5979 4.93198 10.4908 5.18868 9.52224 5.56543C8.52013 5.95452 7.6702 6.47507 6.82348 7.3221C5.97599 8.16898 5.45543 9.01891 5.06512 10.0206C4.68731 10.9895 4.43031 12.097 4.35734 13.7181C4.28467 15.3432 4.26562 15.8626 4.26562 20.0001C4.26562 24.1376 4.28391 24.6553 4.35764 26.2802C4.43229 27.9021 4.68899 29.0091 5.06543 29.9777C5.45482 30.9799 5.97538 31.8298 6.82241 32.6765C7.66898 33.524 8.51891 34.0458 9.52026 34.4349C10.4896 34.8116 11.5969 35.0683 13.2184 35.1427C14.8435 35.2165 15.3623 35.2347 19.4995 35.2347C23.6373 35.2347 24.155 35.2165 25.7799 35.1427C27.4018 35.0683 28.5101 34.8116 29.4794 34.4349C30.4811 34.0458 31.3298 33.524 32.1762 32.6765C33.0237 31.8298 33.5441 30.9799 33.9346 29.9782C34.309 29.0091 34.5662 27.9018 34.6423 26.2805C34.7153 24.6556 34.7344 24.1376 34.7344 20.0001C34.7344 15.8626 34.7153 15.3435 34.6423 13.7184C34.5662 12.0966 34.309 10.9896 33.9346 10.021C33.5441 9.01891 33.0237 8.16898 32.1762 7.3221C31.3289 6.47477 30.4814 5.95421 29.4785 5.56558C28.5073 5.18868 27.3996 4.93183 25.7778 4.85764C24.1527 4.78375 23.6354 4.76562 19.4966 4.76562H19.5014ZM18.1347 7.51101C18.5404 7.5104 18.993 7.51101 19.5014 7.51101C23.5691 7.51101 24.0511 7.52564 25.6574 7.59861C27.1428 7.66655 27.949 7.91472 28.486 8.12328C29.197 8.39933 29.7038 8.72946 30.2367 9.26281C30.7699 9.79601 31.0999 10.3038 31.3767 11.0148C31.5853 11.551 31.8337 12.3572 31.9014 13.8426C31.9743 15.4486 31.9902 15.9309 31.9902 19.9966C31.9902 24.0624 31.9743 24.5449 31.9014 26.1507C31.8334 27.6361 31.5853 28.4423 31.3767 28.9787C31.1007 29.6897 30.7699 30.1959 30.2367 30.7288C29.7035 31.262 29.1973 31.592 28.486 31.8682C27.9496 32.0777 27.1428 32.3252 25.6574 32.3932C24.0514 32.4661 23.5691 32.482 19.5014 32.482C15.4335 32.482 14.9513 32.4661 13.3455 32.3932C11.8601 32.3246 11.0539 32.0764 10.5164 31.8679C9.8056 31.5917 9.29769 31.2617 8.76449 30.7285C8.23128 30.1953 7.90131 29.6887 7.6245 28.9775C7.41594 28.4411 7.16747 27.6348 7.09983 26.1495C7.02685 24.5435 7.01223 24.0612 7.01223 19.9928C7.01223 15.9246 7.02685 15.4448 7.09983 13.8388C7.16777 12.3534 7.41594 11.5472 7.6245 11.0102C7.9007 10.2992 8.23128 9.79144 8.76464 9.25824C9.29784 8.72504 9.8056 8.39491 10.5166 8.11825C11.0536 7.90878 11.8601 7.66122 13.3455 7.59297C14.7508 7.52944 15.2955 7.5104 18.1347 7.5072V7.51101ZM27.6335 10.0405C26.6242 10.0405 25.8053 10.8586 25.8053 11.868C25.8053 12.8773 26.6242 13.6962 27.6335 13.6962C28.6427 13.6962 29.4616 12.8773 29.4616 11.868C29.4616 10.8588 28.6427 10.0399 27.6335 10.0399V10.0405ZM19.5014 12.1765C15.1809 12.1765 11.6779 15.6795 11.6779 20.0001C11.6779 24.3208 15.1809 27.8221 19.5014 27.8221C23.822 27.8221 27.3238 24.3208 27.3238 20.0001C27.3238 15.6797 23.8217 12.1765 19.5011 12.1765H19.5014ZM19.5014 14.9219C22.3059 14.9219 24.5796 17.1953 24.5796 20.0001C24.5796 22.8046 22.3059 25.0784 19.5014 25.0784C16.6967 25.0784 14.4233 22.8046 14.4233 20.0001C14.4233 17.1953 16.6967 14.9219 19.5014 14.9219Z"
        fill="white"
      />
    </G>
    <Defs>
      <RadialGradient
        id="paint0_radial_33_23566"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(10.3594 42.5037) rotate(-90) scale(38.6519 35.9493)"
      >
        <Stop stopColor="#FFDD55" />
        <Stop offset="0.1" stopColor="#FFDD55" />
        <Stop offset="0.5" stopColor="#FF543E" />
        <Stop offset="1" stopColor="#C837AB" />
      </RadialGradient>
      <RadialGradient
        id="paint1_radial_33_23566"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(-6.53265 3.30937) rotate(78.681) scale(17.2776 71.2188)"
      >
        <Stop stopColor="#3771C8" />
        <Stop offset="0.128" stopColor="#3771C8" />
        <Stop offset="1" stopColor="#6600FF" stopOpacity={0} />
      </RadialGradient>
      <ClipPath id="clip0_33_23566">
        <Rect
          width="39"
          height="39"
          fill="white"
          transform="translate(0 0.5)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);

export const GlobeIcon = ({ color, size, style }: SvgProps) => (
  <Svg width={size} height={size} style={style} viewBox="0 0 24 24" fill="none">
    <G clip-path="url(#clip0_33_24585)">
      <Path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3 9H21M3 15H21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.95192 4.99609C9.87673 1.50604 14.1233 1.50604 15.0481 4.99609C15.638 7.22218 15.9641 9.58777 16 12C15.9641 14.4122 15.638 16.7778 15.0481 19.0039C14.1233 22.494 9.87673 22.494 8.95192 19.0039C8.36205 16.7778 8.0359 14.4122 8 12C8.0359 9.58777 8.36205 7.22218 8.95192 4.99609Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_33_24585">
        <Rect width="24" height="24" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export const HamburgerIcon = ({ color, size, style }: SvgProps) => (
  <Svg
    width={size}
    height={size / 2}
    style={style}
    viewBox="0 0 20 10"
    fill="none"
  >
    <Path d="M1 1H19" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M8 9H19" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const ChevronLeftIcon = ({
  color,
  size,
  style,
  strokeWidth,
}: SvgProps) => (
  <Svg
    width={size}
    height={size * 1.64}
    style={style}
    viewBox="0 0 11 18"
    fill="none"
  >
    <Path
      d="M9.08042 2L2 9.08042L9.08042 16.1608"
      stroke={color}
      strokeWidth={strokeWidth || "2.36014"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const RepostIcon = ({ color, size, style }: SvgProps) => (
  <Svg width={size} height={size} style={style} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 13.5V9C5 7.34315 6.34315 6 8 6H15.5M15.5 6L12.5 3M15.5 6L12.5 9M19 10.5V15C19 16.6569 17.6569 18 16 18L8.5 18M8.5 18L11.5 21M8.5 18L11.5 15"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const MenuIcon = ({ color, size, style }: SvgProps) => (
  <Svg width={size} height={size} style={style} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.5 12C8.5 12.8284 7.82843 13.5 7 13.5C6.17157 13.5 5.5 12.8284 5.5 12C5.5 11.1716 6.17157 10.5 7 10.5C7.82843 10.5 8.5 11.1716 8.5 12ZM13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12ZM17 13.5C17.8284 13.5 18.5 12.8284 18.5 12C18.5 11.1716 17.8284 10.5 17 10.5C16.1716 10.5 15.5 11.1716 15.5 12C15.5 12.8284 16.1716 13.5 17 13.5Z"
      fill={color}
    />
  </Svg>
);

export const CancelIcon = ({ color, size, style }: SvgProps) => (
  <Svg
    width={size}
    height={size}
    style={style}
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth={2}
    stroke={color}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </Svg>
);

export const AttachmentIcon = ({ color, size, style }: SvgProps) => (
  <Svg width={size} height={size} style={style} viewBox="0 0 20 20" fill="none">
    <Path
      d="M13.9455 9.0196L8.49626 14.4688C7.16326 15.8091 5.38347 15.692 4.23357 14.5347C3.07634 13.3922 2.9738 11.6197 4.30681 10.2794L11.7995 2.78669C12.5392 2.04694 13.6745 1.85651 14.4289 2.60358C15.1833 3.3653 14.9855 4.4859 14.2458 5.22565L6.83367 12.6524C6.57732 12.9088 6.28435 12.8355 6.10124 12.6671C5.94011 12.4986 5.87419 12.1983 6.12322 11.942L11.2868 6.78571C11.6091 6.45612 11.6164 5.97272 11.3088 5.65778C10.9938 5.35749 10.5031 5.35749 10.1808 5.67975L4.99529 10.8653C4.13835 11.7296 4.1823 13.0626 4.95134 13.8316C5.77898 14.6592 7.03874 14.6446 7.903 13.7803L15.3664 6.32428C16.8678 4.81549 16.8312 2.83063 15.4909 1.4903C14.1799 0.179264 12.1584 0.106021 10.6496 1.60749L3.10564 9.16608C1.16472 11.1143 1.27458 13.9268 3.06169 15.7139C4.8488 17.4937 7.6613 17.6109 9.60955 15.6773L15.1027 10.1841C15.4103 9.87653 15.4103 9.30524 15.0881 9.00495C14.7878 8.68268 14.2677 8.70465 13.9455 9.0196Z"
      fill={color}
    />
  </Svg>
);

export const RepostedIcon = ({ color, size, style }: SvgProps) => (
  <Svg
    aria-label="Repost"
    role="img"
    viewBox="0 0 24 24"
    height={size}
    width={size}
    style={style}
  >
    <Path
      d="M16.00092,6.00098c.13013,0,.2597-.02649,.3819-.07703,.24493-.10132,.43982-.29626,.54114-.54114,.10095-.24426,.10095-.51929,0-.76367-.0509-.12305-.12451-.23401-.21729-.32642L13.20697,.79297c-.39062-.39062-1.02344-.39062-1.41406,0s-.39062,1.02344,0,1.41406l1.79395,1.79395h-5.31543c-2.90625,0-5.27148,2.36426-5.27148,5.27051v4.22852c0,.55273,.44727,1,1,1s1-.44727,1-1v-4.22852c0-1.80371,1.46777-3.27051,3.27148-3.27051h7.72949Zm3.99707,3.49609c-.55273,0-1,.44727-1,1v4.22754c0,1.80371-1.4668,3.27051-3.27051,3.27051H7.99701c-.13007,0-.2597,.02649-.38184,.0769-.24487,.10132-.43982,.29626-.54114,.54126-.10107,.24426-.10107,.51953,0,.76379,.05084,.12292,.12439,.23389,.21716,.32629l3.50171,3.50366c.19531,.19531,.45117,.29297,.70703,.29297s.51172-.09766,.70703-.29297c.39062-.39062,.39062-1.02344,0-1.41406l-1.79688-1.79785h5.31738c2.90625,0,5.27051-2.36426,5.27051-5.27051v-4.22754c0-.55273-.44727-1-1-1Zm-5.20508-.51074l-3.90527,3.90625-1.68066-1.68066c-.39062-.39062-1.02344-.39062-1.41406,0s-.39062,1.02344,0,1.41406l2.3877,2.3877c.1875,.1875,.44141,.29297,.70703,.29297s.51953-.10547,.70703-.29297l4.6123-4.61328c.39062-.39062,.39062-1.02344,0-1.41406s-1.02344-.39062-1.41406,0Z"
      fill={color}
    ></Path>
  </Svg>
);

export const VerifiedIcon = ({ size, style }: BaseSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 12 12" fill="none" style={style}>
    <G clipPath="url(#clip0_134_1899)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.9994 0.9282L4.3914 0L3.4998 1.545H1.6296V3.4512L0 4.392L0.9282 6L0 7.6077L1.6296 8.5488V10.3203H3.4221L4.3914 12L5.9994 11.0718L7.6074 12L8.577 10.32H10.4256V8.517L12 7.6077L11.0715 6L12 4.3923L10.4256 3.4833V1.5453H8.4999L7.6074 0L5.9994 0.9282ZM8.2239 4.2957L8.9001 4.9818L5.4711 8.4318L3.4206 6.3528L4.0938 5.6754L5.4699 7.0497L8.2239 4.2957Z"
        fill="#0095F6"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_134_1899">
        <Rect width={size} height={size} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export const ThreadLineIcon = ({
  color,
  height,
  style,
}: {
  color: string;
  height: number;
  style?: ViewStyle;
}) => {
  const lineHeight = height - 25;
  const loopHeight = height - 11;
  const loopWidth = height - 18;

  return (
    <Svg
      fill="none"
      height={height}
      viewBox={`0 0 21 ${height}`}
      width={21}
      style={style}
    >
      <Path
        d={`M18 1L18 ${lineHeight}`}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></Path>
      <Path
        d={`M18 ${loopHeight}C18 ${lineHeight} 4 ${lineHeight} 4 ${loopWidth}.12777C4 ${loopHeight}.2555 18 ${loopHeight}.9513 18 ${lineHeight}`}
        stroke={color}
        strokeLinecap="round"
        strokeWidth="2"
      ></Path>
      <Path
        d={`M18 ${loopHeight}L18 ${height - 1}`}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></Path>
    </Svg>
  );
};
// export const Icon = ({color, size, style}: SvgProps) => ()
// export const Icon = ({color, size, style}: SvgProps) => ()
// export const Icon = ({color, size, style}: SvgProps) => ()
