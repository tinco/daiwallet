import * as english from './english.js';

export const match = letters => {
  return english.words.filter(word => word.startsWith(letters));
};
