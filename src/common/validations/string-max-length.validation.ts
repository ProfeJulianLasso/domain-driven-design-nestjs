export const StringMaxLength = (value: string, max: number): boolean => {
  return value.length > max ? true : false;
};
