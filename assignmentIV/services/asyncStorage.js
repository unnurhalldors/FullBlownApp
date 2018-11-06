import { AsyncStorage } from 'react-native';

const storageKey = 'Concert';

export const storeFavourite = async (eventDateName, dateOfShow) => {
  try {
    await AsyncStorage.setItem(
      `@${storageKey}:${eventDateName}:${dateOfShow}`,
      JSON.stringify({
        eventDateName,
        dateOfShow,
      }),
    );
  } catch (error) {
    alert(error);
  }
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
