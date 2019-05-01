import * as functions from './functions';

describe('Functions', () => {
  describe('inArray()', () => {
    let searchArray;

    beforeEach(() => {
      searchArray = [
        'search-one',
        'search-two',
        'search-three'
      ];
    });

    test('returns true for if item is in array', () => {
      const search = 'search-one';
      const isInArray = functions.inArray(search, searchArray);
      expect(isInArray).toBe(true);
    });

    test('returns false if item is not in array', () => {
      const search = 'search-four';
      const isInArray = functions.inArray(search, searchArray);
      expect(isInArray).toBe(false);
    });
  });

  describe('objectKeyExists()', () => {
    let searchObj;

    beforeEach(() => {
      searchObj = {
        searchone: 'val',
        searchtwo: 'val',
        searchthree: 'val'
      };
    });

    test('returns true for if key exists on object', () => {
      const search = 'searchone';
      const isOnObject = functions.objectKeyExists(search, searchObj);
      expect(isOnObject).toBe(true);
    });

    test('returns false if key does not exist on object', () => {
      const search = 'searchfour';
      const isOnObject = functions.objectKeyExists(search, searchObj);
      expect(isOnObject).toBe(false);
    });
  });

  describe('getByValue()', () => {
    let searchArray;

    beforeEach(() => {
      searchArray = [
        {
          keyOne: 'valOne',
          keyTwo: 'valTwo',
        },
        {
          keyOne: 'valThree',
          keyTwo: 'valFour',
        }
      ];
    });

    test('returns object if key/value pair found', () => {
      const searchKey = 'valOne';
      const object = functions.getByValue(searchArray, 'keyOne', searchKey);
      expect(object).toEqual(searchArray[0]);
    });

    test('returns `null` if key/value pair not found', () => {
      const searchKey = 'valFive';
      const object = functions.getByValue(searchArray, 'keyOne', searchKey);
      expect(object).toEqual(null);
    });
  });
});
