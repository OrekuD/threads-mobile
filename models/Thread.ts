import User from "./User";

export default interface Thread {
  id: number;
  threadId: string;
  text: string;
  media: Array<string>;
  user: User | null;
  replyThead: Thread | null;
  quoteThead: Thread | null;
  replies: Array<Thread>;
  quotes: Array<Thread>;
  likesCount: number;
  isLikesHidden: boolean;
  hasCurrentUserLiked: boolean;
  hasCurrentUserReposted: boolean;
  createdAt: string;
}
