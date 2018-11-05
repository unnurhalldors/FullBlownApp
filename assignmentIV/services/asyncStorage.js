import { AsyncStorage } from 'react-native';

const storageKey = 'Concert';

export const storeFavourite = async (eventDateName, dateOfShow) => {
  try {
    if ((await AsyncStorage.getItem(`@${storageKey}:${eventDateName}:${dateOfShow}`)) == null) {
      await AsyncStorage.setItem(
        `@${storageKey}:${eventDateName}:${dateOfShow}`,
        JSON.stringify({
          eventDateName,
          dateOfShow,
        }),
      );
      return true;
    }
    await AsyncStorage.removeItem(`@${storageKey}:${eventDateName}:${dateOfShow}`);
    return false;
  } catch (error) {
    alert(error);
  }
  return false;
};

export const getAllFavourites = async () => {
  try {
    const value = await AsyncStorage.getAllKeys();
    if (value !== null) {
      return AsyncStorage.multiGet(value);
    }
  } catch (error) {
    alert(error);
  }
  return false;
};
