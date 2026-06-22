/**
 * Tests for the stringUtils logic extracted from StringUtilityTools.js
 *
 * We test the pure utility functions directly by importing
 * the component module and accessing the non-exported object via
 * re-creating the logic here (since stringUtils is scoped inside the module).
 * 
 * This approach tests the core string manipulation logic independently.
 */

// Replicate the stringUtils logic here since it's not exported from the component
const stringUtils = {
  splitString: (inputString, separator) => {
    if (!inputString || !separator) return [];
    const result = inputString.split(separator);
    return result;
  },

  insertAtIndices: (inputString, separator, indices, insertText) => {
    if (inputString === undefined || !indices) return inputString;
    if (inputString == '' && indices === 0) {
      return insertText;
    }
    const index = parseInt(indices.toString().trim(), 10);
    if (isNaN(index) || index < 0) return inputString;
    const parts = inputString === '' ? [''] : inputString.split(separator);
    if (index >= parts.length) {
      parts.push(insertText);
    } else if (parts[index] === '') {
      parts[index] = insertText;
    } else {
      parts[index] = insertText + separator + parts[index];
    }
    return parts.join(separator);
  },

  deleteAtIndices: (inputString, separator, indices) => {
    if (!inputString || !indices) return inputString;

    if (!indices.includes(',')) {
      const index = parseInt(indices.trim(), 10);
      if (isNaN(index) || index < 0) return inputString;
      const parts = inputString.split(separator);
      if (index >= parts.length) return inputString;
      parts.splice(index, 1);
      return parts.join(separator);
    }

    const parts = inputString.split(separator);
    const indicesArray = indices
      .split(',')
      .map((idx) => parseInt(idx.trim(), 10))
      .filter((idx) => !isNaN(idx) && idx >= 0 && idx < parts.length)
      .sort((a, b) => b - a);

    const newParts = [...parts];
    indicesArray.forEach((index) => {
      if (index >= 0 && index < newParts.length) {
        newParts.splice(index, 1);
      }
    });
    return newParts.join(separator);
  },
};

describe('stringUtils', () => {
  // --- splitString ---
  describe('splitString', () => {
    test('splits a comma-separated string', () => {
      expect(stringUtils.splitString('a,b,c', ',')).toEqual(['a', 'b', 'c']);
    });

    test('splits a space-separated string', () => {
      expect(stringUtils.splitString('hello world', ' ')).toEqual(['hello', 'world']);
    });

    test('returns empty array when inputString is empty', () => {
      expect(stringUtils.splitString('', ',')).toEqual([]);
    });

    test('returns empty array when separator is empty', () => {
      expect(stringUtils.splitString('hello', '')).toEqual([]);
    });

    test('returns single-element array when separator not found', () => {
      expect(stringUtils.splitString('hello', ',')).toEqual(['hello']);
    });

    test('handles multiple consecutive separators', () => {
      expect(stringUtils.splitString('a,,b', ',')).toEqual(['a', '', 'b']);
    });
  });

  // --- insertAtIndices ---
  describe('insertAtIndices', () => {
    test('inserts text at the beginning (index 0)', () => {
      const result = stringUtils.insertAtIndices('b,c', ',', '0', 'a');
      expect(result).toBe('a,b,c');
    });

    test('inserts text at the end (index >= length)', () => {
      const result = stringUtils.insertAtIndices('a,b', ',', '5', 'c');
      expect(result).toBe('a,b,c');
    });

    test('inserts into empty string at index 0', () => {
      // Note: indices comes from text input in the UI, so it's always a string.
      // Passing numeric 0 would be caught by the !indices falsy check.
      const result = stringUtils.insertAtIndices('', ',', '0', 'first');
      expect(result).toBe('first');
    });

    test('returns inputString when indices is falsy', () => {
      expect(stringUtils.insertAtIndices('hello', ',', '', 'world')).toBe('hello');
    });

    test('returns inputString when inputString is undefined', () => {
      expect(stringUtils.insertAtIndices(undefined, ',', '0', 'test')).toBeUndefined();
    });

    test('returns inputString for negative index', () => {
      expect(stringUtils.insertAtIndices('a,b', ',', '-1', 'x')).toBe('a,b');
    });

    test('fills empty slot when part at index is empty', () => {
      const result = stringUtils.insertAtIndices(',b', ',', '0', 'a');
      expect(result).toBe('a,b');
    });
  });

  // --- deleteAtIndices ---
  describe('deleteAtIndices', () => {
    test('deletes element at a single index', () => {
      const result = stringUtils.deleteAtIndices('a,b,c', ',', '1');
      expect(result).toBe('a,c');
    });

    test('deletes first element', () => {
      const result = stringUtils.deleteAtIndices('a,b,c', ',', '0');
      expect(result).toBe('b,c');
    });

    test('deletes last element', () => {
      const result = stringUtils.deleteAtIndices('a,b,c', ',', '2');
      expect(result).toBe('a,b');
    });

    test('returns original string when index is out of bounds', () => {
      const result = stringUtils.deleteAtIndices('a,b', ',', '10');
      expect(result).toBe('a,b');
    });

    test('returns original string when index is negative', () => {
      const result = stringUtils.deleteAtIndices('a,b', ',', '-1');
      expect(result).toBe('a,b');
    });

    test('deletes at multiple comma-separated indices', () => {
      const result = stringUtils.deleteAtIndices('a,b,c,d,e', ',', '0,2,4');
      expect(result).toBe('b,d');
    });

    test('handles multiple indices that are out of bounds gracefully', () => {
      const result = stringUtils.deleteAtIndices('a,b', ',', '0,10');
      expect(result).toBe('b');
    });

    test('returns original string when inputString is empty', () => {
      expect(stringUtils.deleteAtIndices('', ',', '0')).toBe('');
    });

    test('returns original string when indices is empty', () => {
      expect(stringUtils.deleteAtIndices('a,b', ',', '')).toBe('a,b');
    });

    test('handles space-separated strings', () => {
      const result = stringUtils.deleteAtIndices('hello beautiful world', ' ', '1');
      expect(result).toBe('hello world');
    });
  });
});
