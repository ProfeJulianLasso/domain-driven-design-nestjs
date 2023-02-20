export const IsStringAsJSON = (value: string): boolean => {
  const json = JSON.parse(value);
  return typeof json === 'object' ? true : false;
};
