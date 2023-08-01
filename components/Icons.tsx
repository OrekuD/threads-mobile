import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

export interface BaseSvgProps {
  size: number;
}

export interface SvgProps extends BaseSvgProps {
  color: string;
}

export const HomeActiveIcon = ({ color, size }: SvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <Path
      d="M27.8738 24.1632V15.3473C27.8738 14.0238 27.3452 12.7537 26.3839 11.844C25.2571 10.7776 23.6938 9.33896 22.4316 8.33137C20.0442 6.42542 18.8527 4.86816 16 4.86816C13.1473 4.86816 11.9557 6.42542 9.56828 8.33137C8.30616 9.33896 6.74281 10.7776 5.61599 11.844C4.65473 12.7537 4.1261 14.0238 4.1261 15.3473V24.1632C4.1261 25.8026 5.45513 27.1317 7.09456 27.1317H11.0525C12.1455 27.1317 13.0315 26.2456 13.0315 25.1527V20.8044C13.0315 19.8119 13.5275 18.8851 14.3534 18.3345C15.3505 17.6698 16.6495 17.6698 17.6466 18.3345C18.4724 18.8851 18.9684 19.8119 18.9684 20.8044V25.1527C18.9684 26.2456 19.8544 27.1317 20.9474 27.1317H24.9054C26.5448 27.1317 27.8738 25.8026 27.8738 24.1632Z"
      fill={color}
    />
  </Svg>
);

export const ProfileActiveIcon = ({ color, size }: SvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
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

export const CreateIcon = ({ color, size }: SvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 33 32" fill="none">
    <Path
      d="M16.5 6.25H12.75C9.43629 6.25 6.75 8.93629 6.75 12.25V19.75C6.75 23.0637 9.43629 25.75 12.75 25.75H20.25C23.5637 25.75 26.25 23.0637 26.25 19.75V16M16.981 15.4534L25.396 7.03838"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

export const ActivityActiveIcon = ({ color, size }: SvgProps) => (
  <Svg width={size * 1.0315} height={size} viewBox="0 0 33 32" fill="none">
    <Path
      d="M24.6483 7.3849C21.344 4.72015 17.9651 7.3849 16.75 8.60979C15.5348 7.3849 12.156 4.72015 8.85169 7.3849C5.54734 10.0497 4.82919 15.579 9.45925 20.2463C14.0893 24.9136 16.75 25.7584 16.75 25.7584C16.75 25.7584 19.4107 24.9136 24.0407 20.2463C28.6708 15.579 27.9526 10.0497 24.6483 7.3849Z"
      fill={color}
      stroke={color}
      strokeWidth="2"
    />
  </Svg>
);

export const HomeIcon = ({ color, size }: SvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <Path
      d="M26.7632 23.3452V15.354C26.7632 14.1543 26.2841 13.003 25.4127 12.1783C24.3913 11.2117 22.9742 9.9076 21.8301 8.99426C19.666 7.26658 18.5859 5.85498 16 5.85498C13.4141 5.85498 12.334 7.26658 10.1699 8.99426C9.02584 9.9076 7.60871 11.2117 6.58729 12.1783C5.71594 13.003 5.23676 14.1543 5.23676 15.354V23.3452C5.23676 24.8313 6.44147 25.6378 7.92757 25.6378H11.7639C12.3161 25.6378 12.7639 25.1901 12.7639 24.6378V20.3006V19.3398C12.7639 17.529 14.2318 16.061 16.0427 16.061C17.8536 16.061 19.3216 17.529 19.3216 19.3398V20.3006V24.6378C19.3216 25.1901 19.7693 25.6378 20.3216 25.6378H24.0724C25.5585 25.6378 26.7632 24.8313 26.7632 23.3452Z"
      stroke={color}
      strokeWidth="3"
    />
  </Svg>
);

export const SearchIcon = ({ color, size }: SvgProps) => (
  <Svg width={size * 1.03125} height={size} viewBox="0 0 33 32" fill="none">
    <Path
      d="M21.4332 21.1673C23.0977 19.4947 24.1265 17.1888 24.1265 14.6426C24.1265 9.53394 19.9851 5.39258 14.8765 5.39258C9.76783 5.39258 5.62646 9.53394 5.62646 14.6426C5.62646 19.7512 9.76783 23.8926 14.8765 23.8926C17.4389 23.8926 19.758 22.8506 21.4332 21.1673ZM21.4332 21.1673L26.8735 26.6076"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

export const ProfileIcon = ({ color, size }: SvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
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

export const ActivityIcon = ({ color, size }: SvgProps) => (
  <Svg width={size * 1.03125} height={size} viewBox="0 0 33 32" fill="none">
    <Path
      d="M24.6483 7.3849C21.344 4.72015 17.9651 7.3849 16.75 8.60979C15.5348 7.3849 12.156 4.72015 8.85169 7.3849C5.54734 10.0497 4.82919 15.579 9.45925 20.2463C14.0893 24.9136 16.75 25.7584 16.75 25.7584C16.75 25.7584 19.4107 24.9136 24.0407 20.2463C28.6708 15.579 27.9526 10.0497 24.6483 7.3849Z"
      stroke={color}
      strokeWidth="3"
    />
  </Svg>
);

export const Logo = ({ color, size }: SvgProps) => (
  <Svg width={size} height={size * 1.143} viewBox="0 0 28 32" fill="none">
    <Path
      d="M21.788 14.8315C21.6479 14.7654 21.5055 14.7019 21.3612 14.641C21.11 10.0898 18.5808 7.48429 14.3339 7.45762C14.3147 7.45751 14.2955 7.45751 14.2763 7.45751C11.7361 7.45751 9.62349 8.52361 8.32318 10.4636L10.6588 12.0389C11.6302 10.5898 13.1547 10.2809 14.2774 10.2809C14.2904 10.2809 14.3034 10.2809 14.3162 10.281C15.7146 10.2898 16.7698 10.6896 17.4527 11.4691C17.9497 12.0367 18.2821 12.821 18.4467 13.8108C17.2069 13.6036 15.8661 13.5399 14.4328 13.6207C10.395 13.8494 7.79925 16.1648 7.97359 19.3821C8.06205 21.0141 8.88895 22.4181 10.3018 23.3353C11.4964 24.1106 13.035 24.4898 14.634 24.404C16.7457 24.2901 18.4023 23.498 19.558 22.0495C20.4357 20.9495 20.9908 19.524 21.236 17.7278C22.2423 18.325 22.9882 19.1108 23.4001 20.0555C24.1005 21.6613 24.1413 24.3001 21.9514 26.4515C20.0328 28.3361 17.7265 29.1515 14.241 29.1766C10.3746 29.1485 7.45052 27.9293 5.54937 25.553C3.76909 23.3278 2.84904 20.1138 2.81471 16.0001C2.84904 11.8864 3.76909 8.67239 5.54937 6.44724C7.45052 4.07094 10.3745 2.85179 14.2409 2.82354C18.1353 2.85201 21.1103 4.07702 23.0843 6.46479C24.0522 7.63572 24.7819 9.10826 25.263 10.8252L28 10.1072C27.4169 7.99382 26.4993 6.17274 25.2507 4.66246C22.7202 1.60124 19.0191 0.0326467 14.2504 0.00012207H14.2314C9.47237 0.0325337 5.81278 1.60709 3.35427 4.68001C1.16654 7.41452 0.0380376 11.2194 0.000118655 15.9889L0 16.0001L0.000118655 16.0114C0.0380376 20.7808 1.16654 24.5858 3.35427 27.3203C5.81278 30.3931 9.47237 31.9678 14.2314 32.0001H14.2504C18.4815 31.9713 21.4638 30.8821 23.9206 28.4686C27.135 25.3111 27.0382 21.3533 25.9788 18.9236C25.2187 17.1813 23.7696 15.7662 21.788 14.8315ZM14.4828 21.5846C12.7132 21.6826 10.8747 20.9016 10.784 19.2288C10.7168 17.9885 11.6818 16.6045 14.5914 16.4396C14.9247 16.4207 15.2516 16.4115 15.5729 16.4115C16.6297 16.4115 17.6185 16.5124 18.5174 16.7056C18.1821 20.8226 16.2155 21.4911 14.4828 21.5846Z"
      fill={color}
    />
  </Svg>
);

export const HeartIcon = ({ color, size }: SvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18.4999 4.96682C15.7806 2.79133 12.9999 4.96681 11.9999 5.96681C10.9999 4.96681 8.2193 2.79133 5.49996 4.96682C2.78062 7.1423 2.18961 11.6564 5.99996 15.4668C9.81031 19.2771 11.9999 19.9668 11.9999 19.9668C11.9999 19.9668 14.1896 19.2771 17.9999 15.4668C21.8103 11.6564 21.2193 7.1423 18.4999 4.96682Z"
      stroke={color}
      strokeWidth="1.5"
    />
  </Svg>
);

export const HeartFilledIcon = ({ color, size }: SvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18.4999 4.96682C15.7806 2.79133 12.9999 4.96681 11.9999 5.96681C10.9999 4.96681 8.2193 2.79133 5.49996 4.96682C2.78062 7.1423 2.18961 11.6564 5.99996 15.4668C9.81031 19.2771 11.9999 19.9668 11.9999 19.9668C11.9999 19.9668 14.1896 19.2771 17.9999 15.4668C21.8103 11.6564 21.2193 7.1423 18.4999 4.96682Z"
      fill={color}
      stroke={color}
      strokeWidth="1.5"
    />
  </Svg>
);

export const SendIcon = ({ color, size }: SvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19.5 5.5H4.5L10 11M19.5 5.5L12 18.5L10 11M19.5 5.5L10 11"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </Svg>
);

export const MessageIcon = ({ color, size }: SvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 12C4 16.4183 7.58172 20 12 20C13.2552 20 14.4428 19.7109 15.5 19.1958L19.5 20L19 15.876C19.6372 14.7278 20 13.4063 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z"
      stroke={color}
      strokeWidth="1.5"
    />
  </Svg>
);

export const RepostIcon = ({ color, size }: SvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 13.5V9C5 7.34315 6.34315 6 8 6H15.5M15.5 6L12.5 3M15.5 6L12.5 9M19 10.5V15C19 16.6569 17.6569 18 16 18L8.5 18M8.5 18L11.5 21M8.5 18L11.5 15"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const MenuIcon = ({ color, size }: SvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.5 12C8.5 12.8284 7.82843 13.5 7 13.5C6.17157 13.5 5.5 12.8284 5.5 12C5.5 11.1716 6.17157 10.5 7 10.5C7.82843 10.5 8.5 11.1716 8.5 12ZM13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12ZM17 13.5C17.8284 13.5 18.5 12.8284 18.5 12C18.5 11.1716 17.8284 10.5 17 10.5C16.1716 10.5 15.5 11.1716 15.5 12C15.5 12.8284 16.1716 13.5 17 13.5Z"
      fill={color}
    />
  </Svg>
);

export const CancelIcon = ({ color, size }: SvgProps) => (
  <Svg
    width={size}
    height={size}
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

export const VerifiedIcon = ({ size }: BaseSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
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

// export const Icon = ({color, size}: SvgProps) => ()
// export const Icon = ({color, size}: SvgProps) => ()
// export const Icon = ({color, size}: SvgProps) => ()
