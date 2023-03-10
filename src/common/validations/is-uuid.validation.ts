export const IsUUID = (value: string): boolean => {
  const regex =
    /[0-9A-Za-z]{8}-[0-9A-Za-z]{4}-4[0-9A-Za-z]{3}-[89ABab][0-9A-Za-z]{3}-[0-9A-Za-z]{12}/g;
  const matches = value.match(regex);
  return matches !== null ? true : false;
};
