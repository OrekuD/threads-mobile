
import AsyncStorageKeys from "@/constants/AsyncStorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getAccessToken() {
    const value = await AsyncStorage.getItem(AsyncStorageKeys.AUTHENTICATION);
    return value || ""
}