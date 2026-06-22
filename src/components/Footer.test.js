import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { ThemeContextProvider } from '../Context/ThemeContext.js.js';

describe('Footer Component', () => {
  test('renders footer copyright text with current year', () => {
    render(
      <ThemeContextProvider>
        <Footer />
      </ThemeContextProvider>
    );
    const currentYear = new Date().getFullYear();
    const footerText = screen.getByText(
      new RegExp(`© ${currentYear} LC Coordinator. All rights reserved.`, 'i')
    );
    expect(footerText).toBeInTheDocument();
  });

  test('renders the footer element', () => {
    const { container } = render(
      <ThemeContextProvider>
        <Footer />
      </ThemeContextProvider>
    );
    const footerEl = container.querySelector('footer');
    expect(footerEl).toBeInTheDocument();
  });
});
