import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomTextField from './CustomTextField';

describe('CustomTextField', () => {
  test('renders label text', () => {
    render(<CustomTextField label="Email" name="email" value="" onChange={() => {}} />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  test('renders an input element by default', () => {
    render(<CustomTextField label="Name" name="name" value="" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('renders a textarea when multiline is true', () => {
    const { container } = render(
      <CustomTextField label="Message" name="message" value="" onChange={() => {}} multiline />
    );
    expect(container.querySelector('textarea')).toBeInTheDocument();
  });

  test('displays current value', () => {
    render(<CustomTextField label="Name" name="name" value="John" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toHaveValue('John');
  });

  test('calls onChange when user types', () => {
    const handleChange = jest.fn();
    render(<CustomTextField label="Name" name="name" value="" onChange={handleChange} />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Jane' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('sets input type to password when type="password"', () => {
    const { container } = render(
      <CustomTextField label="Password" name="password" type="password" value="" onChange={() => {}} />
    );
    const input = container.querySelector('input[type="password"]');
    expect(input).toBeInTheDocument();
  });

  test('shows required asterisk when required is true', () => {
    render(<CustomTextField label="Email" name="email" value="" onChange={() => {}} required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  test('does not show asterisk when required is false', () => {
    render(<CustomTextField label="Email" name="email" value="" onChange={() => {}} />);
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  test('links label to input via htmlFor/id', () => {
    render(<CustomTextField label="Username" name="username" value="" onChange={() => {}} />);
    const label = screen.getByText('Username');
    const input = screen.getByRole('textbox');
    expect(label).toHaveAttribute('for', 'username');
    expect(input).toHaveAttribute('id', 'username');
  });
});
