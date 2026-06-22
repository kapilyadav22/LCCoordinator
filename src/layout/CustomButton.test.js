import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomButton from './CustomButton';

describe('CustomButton', () => {
  test('renders button with children text', () => {
    render(<CustomButton>Click Me</CustomButton>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<CustomButton onClick={handleClick}>Click</CustomButton>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<CustomButton disabled>Disabled</CustomButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<CustomButton disabled onClick={handleClick}>Disabled</CustomButton>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('applies custom className alongside default classes', () => {
    render(<CustomButton className="extra-class">Styled</CustomButton>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('extra-class');
    expect(button.className).toContain('bg-title-main');
  });

  test('forwards additional HTML attributes', () => {
    render(<CustomButton type="submit">Submit</CustomButton>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});
