import {
  CHECK_BREAKPOINT
} from '../../config/constants';

export const checkBreakPoint = (height, width) => {
  return {
    height,
    width,
    type: CHECK_BREAKPOINT
  };
};
