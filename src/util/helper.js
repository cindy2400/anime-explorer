export const isEmpty = (obj) => Object.keys(obj).length === 0;

export const ellipsis = (input) =>
  input.length > 45 ? `${input.substring(0, 45)}...` : input;
