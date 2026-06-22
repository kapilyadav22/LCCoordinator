import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeContextProvider, ThemeContext } from './ThemeContext.js.js';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => { store[key] = value; }),
    removeItem: jest.fn((key) => { delete store[key]; }),
    clear: jest.fn(() => { store = {}; }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Helper consumer to read context values
const ThemeConsumer = () => {
  const { mode, toggleTheme } = React.useContext(ThemeContext);
  return (
    <div>
      <span data-testid="mode">{mode}</span>
      <button data-testid="toggle" onClick={toggleTheme}>Toggle</button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
    // Reset DOM classes
    document.documentElement.classList.remove('light', 'dark');
  });

  test('defaults to light mode when no localStorage value', () => {
    render(
      <ThemeContextProvider>
        <ThemeConsumer />
      </ThemeContextProvider>
    );

    expect(screen.getByTestId('mode').textContent).toBe('light');
  });

  test('reads initial mode from localStorage', () => {
    localStorageMock.getItem.mockReturnValueOnce('dark');

    render(
      <ThemeContextProvider>
        <ThemeConsumer />
      </ThemeContextProvider>
    );

    expect(screen.getByTestId('mode').textContent).toBe('dark');
  });

  test('toggleTheme switches from light to dark', () => {
    render(
      <ThemeContextProvider>
        <ThemeConsumer />
      </ThemeContextProvider>
    );

    expect(screen.getByTestId('mode').textContent).toBe('light');

    fireEvent.click(screen.getByTestId('toggle'));

    expect(screen.getByTestId('mode').textContent).toBe('dark');
  });

  test('toggleTheme switches from dark back to light', () => {
    localStorageMock.getItem.mockReturnValueOnce('dark');

    render(
      <ThemeContextProvider>
        <ThemeConsumer />
      </ThemeContextProvider>
    );

    expect(screen.getByTestId('mode').textContent).toBe('dark');

    fireEvent.click(screen.getByTestId('toggle'));

    expect(screen.getByTestId('mode').textContent).toBe('light');
  });

  test('persists mode to localStorage on change', () => {
    render(
      <ThemeContextProvider>
        <ThemeConsumer />
      </ThemeContextProvider>
    );

    fireEvent.click(screen.getByTestId('toggle'));

    expect(localStorageMock.setItem).toHaveBeenCalledWith('mode', 'dark');
  });

  test('adds correct CSS class to documentElement', () => {
    render(
      <ThemeContextProvider>
        <ThemeConsumer />
      </ThemeContextProvider>
    );

    expect(document.documentElement.classList.contains('light')).toBe(true);

    fireEvent.click(screen.getByTestId('toggle'));

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(false);
  });
});
