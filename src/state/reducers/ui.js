// import {
//   SET_VIEWPORT,
//   CHECK_BREAKPOINT
// } from '../../config/constants';

// /**
//  * Checks current breakpoint
//  * @param {HTMLElement} app - page object
//  * @returns {object} containing current width, height and breakpoint
//  */
// export function checkBreakPoint(app = document.getElementById('app')) {
//   const width = app ? app.offsetWidth : window.innerWidth;
//   const height = window.innerHeight;

//   let breakpoint;

//   switch (true) {
//     case (width < 800):
//       breakpoint = 'mobile';
//       break;

//     default:
//       breakpoint = 'desktop';
//       break;
//   }

//   return { width, height, breakpoint };
// }

// const defaultValues = checkBreakPoint();

// const defaultState = {
//   width: defaultValues.width,
//   height: defaultValues.height,
//   breakpoint: defaultValues.breakpoint
// };

// export const ui = (state = defaultState, action={}) => {
//   switch (action.type) {

//     case SET_VIEWPORT:
//       return defaultState;

//     case CHECK_BREAKPOINT: {

//       const newUI = checkBreakPoint();

//       return Object.assign({}, state, {
//         width: newUI.width,
//         height: newUI.height,
//         breakpoint: newUI.breakpoint
//       });
//     }

//     default:
//       return state;
//   }
// };
