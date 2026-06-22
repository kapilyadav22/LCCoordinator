import { getData, postData, putData, deleteData } from './httpRequestUtils';

// Mock the global fetch
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('apiRequest / makeRequest wrappers', () => {
  describe('getData', () => {
    test('returns JSON data on successful GET request', async () => {
      const mockResponse = { status: 'success', data: [1, 2, 3] };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await getData('https://api.example.com/items');

      expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/items', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      expect(result).toEqual(mockResponse);
    });

    test('returns error message string when GET request fails', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: 'Not Found' }),
      });

      const result = await getData('https://api.example.com/missing');
      expect(result).toBe('Not Found');
    });

    test('returns error message when network error occurs', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network Error'));

      const result = await getData('https://api.example.com/items');
      expect(result).toBe('Network Error');
    });
  });

  describe('postData', () => {
    test('sends POST request with JSON body', async () => {
      const payload = { email: 'test@test.com', password: '123456' };
      const mockResponse = { status: 'success', data: { token: 'abc123' } };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await postData('https://api.example.com/login', payload);

      expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      expect(result).toEqual(mockResponse);
    });

    test('returns error message on failed POST', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: 'Invalid credentials' }),
      });

      const result = await postData('https://api.example.com/login', { email: 'bad' });
      expect(result).toBe('Invalid credentials');
    });
  });

  describe('putData', () => {
    test('sends PUT request with JSON body', async () => {
      const payload = { name: 'Updated Name' };
      const mockResponse = { status: 'success' };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await putData('https://api.example.com/profile', payload);

      expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteData', () => {
    test('sends DELETE request without body', async () => {
      const mockResponse = { status: 'success' };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await deleteData('https://api.example.com/item/1');

      expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/item/1', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      expect(result).toEqual(mockResponse);
    });

    test('returns error message on failed DELETE', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: 'Forbidden' }),
      });

      const result = await deleteData('https://api.example.com/item/1');
      expect(result).toBe('Forbidden');
    });
  });
});
