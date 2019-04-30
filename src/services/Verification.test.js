import { fetchVerification } from './Verification';

describe('fetchVerification', () => {
  test('returns 401 status', () => {
    return fetchVerification().then((data) => {
      expect(data).toBe(401);
    })
  })
})
