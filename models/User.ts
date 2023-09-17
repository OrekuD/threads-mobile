import Profile from "./Profile";

export default interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  createdAt: string;
  profile: Profile | null;
  followersCount: number;
  isFollowedByCurrentUser?: boolean;
  isFollowingCurrentUser?: boolean;
}
