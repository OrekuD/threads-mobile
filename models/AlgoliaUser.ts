export default interface AlgoliaUser {
  objectID: number;
  id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  profilePicture: string | null;
  followersCount: number;
  isVerified: boolean;
}
