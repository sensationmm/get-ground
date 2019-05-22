export const setImg = (section, img) => {
  return {
    type: `SET_${section.toUpperCase()}`,
    img
  };
};

export const setActive = (section) => {
  return {
    type: `ACTIVE_${section.toUpperCase()}`,
  }
}

export const resetActive = () => {
  return {
    type: `ACTIVE_RESET`,
  }
}
