export const setImg = (section, img) => {
  return { type: `SET_${section.toUpperCase()}`, img };
};
