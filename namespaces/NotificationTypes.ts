import {
  ActivityActiveIcon,
  ProfileActiveIcon,
  RetweetIcon,
  StarIcon,
} from "../components/Icons";

namespace NotificationTypes {
  export enum State {
    FOLLOWED_YOU = 1,
    LIKED_YOUR_POST = 2,
    COMMENTED_ON_YOUR_POST = 3,
    QUOTED_YOUR_POST = 4,
    FIRST_POST = 5,
    REPOSTED_YOUR_POST = 6,
  }

  const TITLE: Record<State, string> = {
    [State.FOLLOWED_YOU]: "Follows",
    [State.LIKED_YOUR_POST]: "Likes",
    [State.COMMENTED_ON_YOUR_POST]: "Replies",
    [State.QUOTED_YOUR_POST]: "Mentions",
    [State.FIRST_POST]: "Posts",
    [State.REPOSTED_YOUR_POST]: "Reposts",
  };

  const TEXT: Record<State, string> = {
    [State.FOLLOWED_YOU]: "Followed you",
    [State.LIKED_YOUR_POST]: "Liked you thread",
    [State.COMMENTED_ON_YOUR_POST]: "Commented on your thread",
    [State.QUOTED_YOUR_POST]: "Mentioned your thread",
    [State.FIRST_POST]: "Posted their first thread",
    [State.REPOSTED_YOUR_POST]: "Reposted your thread",
  };

  const ICON: Record<State, typeof ProfileActiveIcon> = {
    [State.FOLLOWED_YOU]: ProfileActiveIcon,
    [State.LIKED_YOUR_POST]: ActivityActiveIcon,
    [State.COMMENTED_ON_YOUR_POST]: RetweetIcon,
    [State.QUOTED_YOUR_POST]: RetweetIcon,
    [State.FIRST_POST]: StarIcon,
    [State.REPOSTED_YOUR_POST]: RetweetIcon,
  };

  const COLORS: Record<State, string> = {
    [State.FOLLOWED_YOU]: "#6642e7",
    [State.LIKED_YOUR_POST]: "#EB326D",
    [State.COMMENTED_ON_YOUR_POST]: "#5FC0FA",
    [State.QUOTED_YOUR_POST]: "#5FC0FA",
    [State.FIRST_POST]: "#007AFF",
    [State.REPOSTED_YOUR_POST]: "#5FC0FA",
  };

  export const text = (state: State) => TEXT[state];

  export const title = (state: State) => TITLE[state];

  export const icon = (state: State) => ICON[state];

  export const color = (state: State) => COLORS[state];

  export const list = () =>
    Object.values(State).filter((item) => typeof item !== "string") as State[];
}

export default NotificationTypes;
