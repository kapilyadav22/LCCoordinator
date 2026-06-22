import React from 'react';
import { render, screen } from '@testing-library/react';
import { CustomTitle } from './CustomTitle';

describe('CustomTitle', () => {
  test('renders the title text', () => {
    render(<CustomTitle title="Hello World" />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  test('applies bold font weight by default', () => {
    render(<CustomTitle title="Bold Title" />);
    const titleEl = screen.getByText('Bold Title');
    expect(titleEl.className).toContain('font-bold');
  });

  test('applies normal font weight when fontWeight is "regular"', () => {
    render(<CustomTitle title="Regular Title" fontWeight="regular" />);
    const titleEl = screen.getByText('Regular Title');
    expect(titleEl.className).toContain('font-normal');
  });

  test('applies the default color class (text-title-main)', () => {
    render(<CustomTitle title="Colored" />);
    const titleEl = screen.getByText('Colored');
    expect(titleEl.className).toContain('text-title-main');
  });

  test('applies custom color class', () => {
    render(<CustomTitle title="Custom Color" color="text-red-500" />);
    const titleEl = screen.getByText('Custom Color');
    expect(titleEl.className).toContain('text-red-500');
  });

  test('renders with h5 size class by default (text-xl)', () => {
    render(<CustomTitle title="Default Size" />);
    const titleEl = screen.getByText('Default Size');
    expect(titleEl.className).toContain('text-xl');
  });

  test('applies custom className', () => {
    render(<CustomTitle title="Extra" className="my-custom-class" />);
    const wrapper = screen.getByText('Extra').parentElement;
    expect(wrapper.className).toContain('my-custom-class');
  });

  test('applies uppercase text transform by default', () => {
    render(<CustomTitle title="Transform" />);
    const titleEl = screen.getByText('Transform');
    expect(titleEl.style.textTransform).toBe('uppercase');
  });

  test('applies custom text alignment', () => {
    render(<CustomTitle title="Aligned" textAlign="left" />);
    const titleEl = screen.getByText('Aligned');
    expect(titleEl.style.textAlign).toBe('left');
  });
});
