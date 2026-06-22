import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavButton from './CustomNavButton';

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

describe('NavButton', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  const renderNavButton = (props = {}) => {
    return render(
      <MemoryRouter>
        <NavButton label="Home" to="/" {...props} />
      </MemoryRouter>
    );
  };

  test('renders the label text', () => {
    renderNavButton();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  test('renders as a link with correct href', () => {
    renderNavButton({ label: 'Articles', to: '/articles' });
    const link = screen.getByText('Articles');
    expect(link.closest('a')).toHaveAttribute('href', '/articles');
  });

  test('removes activeTab from localStorage on click', () => {
    localStorageMock.setItem('activeTab', '2');
    renderNavButton();

    fireEvent.click(screen.getByText('Home'));
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('activeTab');
  });

  test('calls custom onClick handler when provided', () => {
    const handleClick = jest.fn();
    renderNavButton({ onClick: handleClick });

    fireEvent.click(screen.getByText('Home'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies custom style prop', () => {
    renderNavButton({ style: { fontWeight: 'bold' } });
    const link = screen.getByText('Home');
    expect(link.style.fontWeight).toBe('bold');
  });
});
