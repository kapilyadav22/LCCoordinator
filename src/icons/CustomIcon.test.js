import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomIcon from './CustomIcon';
import iconsMap from './iconmap';

// Mock the iconmap to avoid importing lucide-react in tests
jest.mock('./iconmap', () => {
  const MockIcon = (props) => <svg data-testid="mock-icon" {...props} />;
  const map = new Map();
  map.set('default', MockIcon);
  map.set('github', MockIcon);
  map.set('linkedin', MockIcon);
  return map;
});

describe('CustomIcon', () => {
  test('renders without crashing', () => {
    render(<CustomIcon name="github" />);
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  test('falls back to default icon for unknown name', () => {
    render(<CustomIcon name="nonexistent" />);
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<CustomIcon name="github" onClick={handleClick} />);

    fireEvent.click(screen.getByTestId('mock-icon'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies custom className', () => {
    render(<CustomIcon name="github" className="extra-style" />);
    const icon = screen.getByTestId('mock-icon');
    expect(icon.parentElement.getAttribute('class')).toContain('extra-style');
  });

  test('passes color prop', () => {
    render(<CustomIcon name="github" color="red" />);
    const icon = screen.getByTestId('mock-icon');
    expect(icon.getAttribute('color')).toBe('red');
  });

  test('uses currentColor as default color', () => {
    render(<CustomIcon name="github" />);
    const icon = screen.getByTestId('mock-icon');
    expect(icon.getAttribute('color')).toBe('currentColor');
  });

  test('forwards additional props to the icon', () => {
    render(<CustomIcon name="github" data-custom="test-value" />);
    const icon = screen.getByTestId('mock-icon');
    expect(icon.getAttribute('data-custom')).toBe('test-value');
  });
});
