export const IsNumberAsString = (value: string): boolean => {
  if (typeof value === 'string' && !isNaN(Number(value))) return true;
  else return false;
};
