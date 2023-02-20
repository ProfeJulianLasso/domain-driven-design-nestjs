export const IsDateTimeGraterThanCurrentDateTime = (value: number): boolean => {
  return value > Date.now() ? true : false;
};
