import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomAlert1 from './CustomAlert1';

describe('CustomAlert1', () => {
  test('renders nothing when alert is not open', () => {
    const alert = { open: false, severity: '', message: '' };
    const { container } = render(<CustomAlert1 alert={alert} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders alert message when open is true', () => {
    const alert = { open: true, severity: 'success', message: 'Saved successfully!' };
    render(<CustomAlert1 alert={alert} />);
    expect(screen.getByText('Saved successfully!')).toBeInTheDocument();
  });

  test('renders with success styling (green background)', () => {
    const alert = { open: true, severity: 'success', message: 'Done' };
    const { container } = render(<CustomAlert1 alert={alert} />);
    const alertEl = container.firstChild;
    expect(alertEl.className).toContain('bg-green-500');
  });

  test('renders with error styling (red background)', () => {
    const alert = { open: true, severity: 'error', message: 'Failed' };
    const { container } = render(<CustomAlert1 alert={alert} />);
    const alertEl = container.firstChild;
    expect(alertEl.className).toContain('bg-red-500');
  });

  test('renders with warning styling (yellow background)', () => {
    const alert = { open: true, severity: 'warning', message: 'Be careful' };
    const { container } = render(<CustomAlert1 alert={alert} />);
    const alertEl = container.firstChild;
    expect(alertEl.className).toContain('bg-yellow-500');
  });

  test('renders with info styling (blue background)', () => {
    const alert = { open: true, severity: 'info', message: 'FYI' };
    const { container } = render(<CustomAlert1 alert={alert} />);
    const alertEl = container.firstChild;
    expect(alertEl.className).toContain('bg-blue-500');
  });

  test('falls back to gray background for unknown severity', () => {
    const alert = { open: true, severity: 'unknown', message: 'Hmm' };
    const { container } = render(<CustomAlert1 alert={alert} />);
    const alertEl = container.firstChild;
    expect(alertEl.className).toContain('bg-gray-800');
  });

  test('renders close button when closeAlert callback is provided', () => {
    const alert = { open: true, severity: 'success', message: 'Done' };
    const closeAlert = jest.fn();
    render(<CustomAlert1 alert={alert} closeAlert={closeAlert} />);
    
    const closeBtn = screen.getByRole('button');
    expect(closeBtn).toBeInTheDocument();
  });

  test('does not render close button when closeAlert is not provided', () => {
    const alert = { open: true, severity: 'success', message: 'Done' };
    render(<CustomAlert1 alert={alert} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  test('calls closeAlert when close button is clicked', () => {
    const alert = { open: true, severity: 'error', message: 'Error' };
    const closeAlert = jest.fn();
    render(<CustomAlert1 alert={alert} closeAlert={closeAlert} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(closeAlert).toHaveBeenCalledTimes(1);
  });

  test('auto-closes after 2 seconds via timer', () => {
    jest.useFakeTimers();
    const alert = { open: true, severity: 'success', message: 'Auto close' };
    const closeAlert = jest.fn();

    render(<CustomAlert1 alert={alert} closeAlert={closeAlert} />);

    expect(closeAlert).not.toHaveBeenCalled();

    jest.advanceTimersByTime(2000);

    expect(closeAlert).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });
});
