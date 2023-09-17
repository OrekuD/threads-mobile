import User from "../../models/User";

export default interface AuthResponse {
  accessToken: string;
  user: User;
}
