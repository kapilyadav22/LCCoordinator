import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { ContextProvider, useMyContext } from './ContextProvider';

// Mock alertData
jest.mock('../dataFields/alertData', () => ({
  alertInitialData: { open: false, severity: '', message: '' },
}));

// Helper consumer component to access context values
const ContextConsumer = () => {
  const { userName, isLoggedIn, updateUserName, updateLogin, alert, showAlert, closeAlert, adminStatus, updateAdminStatus } = useMyContext();
  return (
    <div>
      <span data-testid="username">{userName}</span>
      <span data-testid="loggedin">{isLoggedIn.toString()}</span>
      <span data-testid="admin-status">{adminStatus}</span>
      <span data-testid="alert-open">{alert.open.toString()}</span>
      <span data-testid="alert-message">{alert.message}</span>
      <button data-testid="login" onClick={() => { updateUserName('TestUser'); updateLogin(true); }}>Login</button>
      <button data-testid="logout" onClick={() => updateLogin(false)}>Logout</button>
      <button data-testid="show-alert" onClick={() => showAlert('success', 'Test Alert')}>Show Alert</button>
      <button data-testid="close-alert" onClick={closeAlert}>Close Alert</button>
      <button data-testid="set-admin" onClick={() => updateAdminStatus('Admin')}>Set Admin</button>
    </div>
  );
};

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => { store[key] = String(value); }),
    removeItem: jest.fn((key) => { delete store[key]; }),
    clear: jest.fn(() => { store = {}; }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('ContextProvider', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  test('provides default values (not logged in)', () => {
    render(
      <ContextProvider>
        <ContextConsumer />
      </ContextProvider>
    );

    expect(screen.getByTestId('username').textContent).toBe('Login');
    expect(screen.getByTestId('loggedin').textContent).toBe('false');
    expect(screen.getByTestId('admin-status').textContent).toBe('User');
  });

  test('updateUserName updates username and persists to localStorage', () => {
    render(
      <ContextProvider>
        <ContextConsumer />
      </ContextProvider>
    );

    act(() => {
      screen.getByTestId('login').click();
    });

    expect(screen.getByTestId('username').textContent).toBe('TestUser');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('username', 'TestUser');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('isLoggedIn', true);
  });

  test('updateLogin toggles logged-in state', () => {
    render(
      <ContextProvider>
        <ContextConsumer />
      </ContextProvider>
    );

    act(() => {
      screen.getByTestId('login').click();
    });
    expect(screen.getByTestId('loggedin').textContent).toBe('true');

    act(() => {
      screen.getByTestId('logout').click();
    });
    expect(screen.getByTestId('loggedin').textContent).toBe('false');
  });

  test('showAlert sets alert state correctly', () => {
    render(
      <ContextProvider>
        <ContextConsumer />
      </ContextProvider>
    );

    act(() => {
      screen.getByTestId('show-alert').click();
    });

    expect(screen.getByTestId('alert-open').textContent).toBe('true');
    expect(screen.getByTestId('alert-message').textContent).toBe('Test Alert');
  });

  test('closeAlert resets alert state to initial', () => {
    render(
      <ContextProvider>
        <ContextConsumer />
      </ContextProvider>
    );

    act(() => {
      screen.getByTestId('show-alert').click();
    });
    expect(screen.getByTestId('alert-open').textContent).toBe('true');

    act(() => {
      screen.getByTestId('close-alert').click();
    });
    expect(screen.getByTestId('alert-open').textContent).toBe('false');
    expect(screen.getByTestId('alert-message').textContent).toBe('');
  });

  test('updateAdminStatus updates admin role and persists to localStorage', () => {
    render(
      <ContextProvider>
        <ContextConsumer />
      </ContextProvider>
    );

    act(() => {
      screen.getByTestId('set-admin').click();
    });

    expect(screen.getByTestId('admin-status').textContent).toBe('Admin');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('adminStatus', 'Admin');
  });

  test('restores user session from localStorage on mount', () => {
    localStorageMock.getItem.mockImplementation((key) => {
      const store = {
        username: 'RestoredUser',
        isLoggedIn: 'true',
        adminStatus: 'Admin',
      };
      return store[key] || null;
    });

    render(
      <ContextProvider>
        <ContextConsumer />
      </ContextProvider>
    );

    expect(screen.getByTestId('username').textContent).toBe('RestoredUser');
    expect(screen.getByTestId('loggedin').textContent).toBe('true');
    expect(screen.getByTestId('admin-status').textContent).toBe('Admin');
  });
});
