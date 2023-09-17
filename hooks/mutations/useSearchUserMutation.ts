import AlgoliaUser from "@/models/AlgoliaUser";
import { useMutation } from "@tanstack/react-query";
import algoliasearch from "algoliasearch";

async function searchUser(searchQuery: string) {
  try {
    const client = algoliasearch(
      process.env.EXPO_PUBLIC_ALGOLIA_APP_ID!,
      process.env.EXPO_PUBLIC_ALGOLIA_APP_SEARCH!
    );

    const index = client.initIndex("users");
    const response = await index.search<AlgoliaUser>(searchQuery);

    return response.hits;
  } catch (error) {
    return Promise.reject(error);
  }
}

export default function useSearchUserMutation() {
  const mutation = useMutation({
    mutationKey: ["search", "user"],
    mutationFn: searchUser,
  });

  return mutation;
}
