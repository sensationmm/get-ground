import 'babel-polyfill';
import { checkBreakPoint } from './ui';
import { CHECK_BREAKPOINT } from '../../config/constants';

describe('UI actions', () => {
  test('checkBreakPoint returns an action with type `CHECK_BREAKPOINT`', () => {
    const action = checkBreakPoint(768, 1024);
    expect(action).toEqual({ type: CHECK_BREAKPOINT, height: 768, width: 1024 });
  });
});
