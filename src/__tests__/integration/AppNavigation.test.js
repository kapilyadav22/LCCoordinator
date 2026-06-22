import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import App from '../../App';
import { MemoryRouter } from 'react-router-dom';

// We need to mock the entire BrowserRouter since App includes it,
// but for integration testing the full App, it's often better to render App
// as is, and let it use its own BrowserRouter.
// However, window.matchMedia or other browser APIs might need mocking.
// Here we will do a full render of App.

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),
  GoogleAuthProvider: jest.fn(),
}));

jest.mock('quill', () => {
  return jest.fn().mockImplementation(() => {
    return { on: jest.fn(), root: { innerHTML: '' }, setContents: jest.fn(), format: jest.fn() };
  });
});

describe('App Integration Tests', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear();
  });

  test('full app rendering and basic navigation', async () => {
    render(<App />);

    // 1. Verify Header renders
    expect(screen.getByText('LC Coordinator', { selector: 'a' })).toBeInTheDocument();

    // 2. Verify HomePage default route content
    expect(screen.getByText(/Empower Your Mind/i)).toBeInTheDocument();

    // Helper to open drawer
    const openDrawer = () => {
      const menuBtn = screen.getByLabelText('Open Navigation Menu');
      fireEvent.click(menuBtn);
    };

    // 3. Navigate to "Prepare" using the drawer
    openDrawer();
    let drawer = screen.getByRole('dialog', { name: /Navigation Menu/i });
    const prepareLink = within(drawer).getByText('Prepare');
    fireEvent.click(prepareLink);

    // 4. Verify Prepare page (LandingPage) content appears
    await waitFor(() => {
      expect(screen.getByText(/Preparation Tracks/i)).toBeInTheDocument();
    });

    // 5. Navigate to "About Me" using the drawer
    openDrawer();
    drawer = screen.getByRole('dialog', { name: /Navigation Menu/i });
    const aboutLink = within(drawer).getByText('About Me');
    fireEvent.click(aboutLink);

    // 6. Verify About Page content appears
    await waitFor(() => {
      // "I’m Kapil Kumar Yadav" is on the About Page
      expect(screen.getByText(/I’m Kapil Kumar Yadav/i)).toBeInTheDocument();
    });

    // 7. Navigate to "Login" page
    openDrawer();
    drawer = screen.getByRole('dialog', { name: /Navigation Menu/i });
    const loginLink = within(drawer).getByText('Login');
    fireEvent.click(loginLink);

    // 6. Verify Login Page renders
    await waitFor(() => {
      // The Login page has a "Log In" button
      expect(screen.getByRole('button', { name: /Log In/i })).toBeInTheDocument();
    });
  });
});
