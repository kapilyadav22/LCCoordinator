import { renderHook, act } from '@testing-library/react';
import useCustomAlert from './customAlertHook';

// Mock the alertInitialData import
jest.mock('../dataFields/alertData', () => ({
  alertInitialData: { open: false, severity: '', message: '' },
}));

describe('useCustomAlert', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('returns initial alert state (closed)', () => {
    const { result } = renderHook(() => useCustomAlert());

    expect(result.current.alert).toEqual({
      open: false,
      severity: '',
      message: '',
    });
  });

  test('showAlert opens the alert with correct severity and message', () => {
    const { result } = renderHook(() => useCustomAlert());

    act(() => {
      result.current.showAlert('success', 'Operation completed');
    });

    expect(result.current.alert).toEqual({
      open: true,
      severity: 'success',
      message: 'Operation completed',
    });
  });

  test('showAlert with error severity', () => {
    const { result } = renderHook(() => useCustomAlert());

    act(() => {
      result.current.showAlert('error', 'Something went wrong');
    });

    expect(result.current.alert).toEqual({
      open: true,
      severity: 'error',
      message: 'Something went wrong',
    });
  });

  test('alert auto-closes after 2 seconds', () => {
    const { result } = renderHook(() => useCustomAlert());

    act(() => {
      result.current.showAlert('success', 'Saved!');
    });

    expect(result.current.alert.open).toBe(true);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.alert).toEqual({
      open: false,
      severity: '',
      message: '',
    });
  });

  test('alert stays open before 2 seconds elapse', () => {
    const { result } = renderHook(() => useCustomAlert());

    act(() => {
      result.current.showAlert('warning', 'Be careful');
    });

    act(() => {
      jest.advanceTimersByTime(1999);
    });

    expect(result.current.alert.open).toBe(true);
  });
});
