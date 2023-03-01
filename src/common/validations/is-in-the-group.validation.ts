export const IsInTheGroup = (value: any, group: any[]): boolean => {
  const result = group.findIndex((item) => item === value);
  if (result !== -1) return true;
  return false;
};
