import {
  SET_WIDTH,
} from '../../config/constants';

export const setWidth = (width) => {
  return {
    type: SET_WIDTH,
    payload: width
  }
}
