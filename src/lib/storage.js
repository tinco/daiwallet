const storage = window.localStorage;

export const store = (key, value) => {
  storage.setItem(key, value);
};

export const read = key => {
  return storage.getItem(key);
};

export const remove = key => {
  storage.removeItem(key);
};

export const storeSecure = (key, value) => {
  store(key, value); // This is a mocked API with no form of secure storage.
};

export const readSecure = key => {
  return read(key); // This is a mocked API with no form of secure storage.
};

export const removeSecure = key => {
  return remove(key); // This is a mocked API with no form of secure storage.
};
