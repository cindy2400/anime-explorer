export const isEmpty = (obj) => Object.keys(obj).length === 0;

export const ellipsis = (input) =>
  input.length > 45 ? `${input.substring(0, 45)}...` : input;

export const ellipsisTitle = (input) =>
  input.length > 20 ? `${input.substring(0, 20)}...` : input;
