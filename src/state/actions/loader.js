import {
  SHOW_LOADER,
  HIDE_LOADER,
} from '../../config/constants';

export const showLoader = () => {
  return {
    type: SHOW_LOADER
  }
}

export const hideLoader = () => {
  return {
    type: HIDE_LOADER
  }
}
