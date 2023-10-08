import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
    async getItem(key: string) {
        const result = await AsyncStorage.getItem(key);
        if (result)
            return JSON.parse(result)
        return {};
    },
    setItem(key: string, data: any) {
        AsyncStorage.setItem(key, JSON.stringify(data))
    },
    removeItem(key: string) {
        AsyncStorage.removeItem(key)
    }
}