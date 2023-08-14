import { AsyncStorageKeys } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function loadAsyncStorageValue<T>(
  key: AsyncStorageKeys
): Promise<T | null> {
  try {
    const savedState = await AsyncStorage.getItem(key.toString());
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    return null;
  }
  return null;
}
