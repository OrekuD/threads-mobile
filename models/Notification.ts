import NotificationTypes from "../namespaces/NotificationTypes";
import Thread from "./Thread";
import User from "./User";

export default interface Notification {
  id: string;
  user: User | null;
  fromUser: User | null;
  thread: Thread | null;
  notificationType: NotificationTypes.State;
  createdAt: string;
}
