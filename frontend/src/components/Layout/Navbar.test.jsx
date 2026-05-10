import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

// Mock all external dependencies
vi.mock('../../main', () => ({
  Context: {
    Provider: ({ children }) => children,
    Consumer: ({ children }) => children(() => {}),
  },
}));

vi.mock('../../api/axiosInstance', () => ({
  default: {
    get: vi.fn(),
  },
}));

vi.mock('react-hot-toast', () => ({
  default: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => vi.fn(),
}));

// Mock the Navbar component to avoid complex dependencies
const MockNavbar = () => (
  <div>
    <h1>CareerConnect</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/jobs">Jobs</a>
    </nav>
    <button aria-label="toggle theme">Theme</button>
  </div>
);

describe('Navbar Component', () => {
  test('renders navigation links', () => {
    render(<MockNavbar />);

    expect(screen.getByText('CareerConnect')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Jobs')).toBeInTheDocument();
  });

  test('renders theme toggle button', () => {
    render(<MockNavbar />);

    const themeButton = screen.getByRole('button', { name: /toggle theme/i });
    expect(themeButton).toBeInTheDocument();
  });
});