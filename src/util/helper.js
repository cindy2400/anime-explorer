export const isEmpty = (obj) => Object.keys(obj).length === 0;

export const ellipsis = (input) =>
  input.length > 25 ? `${input.substring(0, 25)}...` : input;
