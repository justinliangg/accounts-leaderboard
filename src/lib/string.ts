export const camelToNormal = (value: string) => {
  return value
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .replace(".", "")
    .trim();
};
