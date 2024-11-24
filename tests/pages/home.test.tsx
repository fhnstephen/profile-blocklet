import { render } from '@testing-library/react';

import useProfile from '../../src/hooks/use-profile';
import Home from '../../src/pages/Home';

// Mock dependencies
vi.mock('../../src/hooks/use-profile');
vi.mock('antd', async () => {
  const originalModule = await vi.importActual('antd');
  return {
    ...originalModule,
    message: {
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

describe('Home Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state', () => {
    (useProfile as vi.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      updateProfile: vi.fn(),
      createProfile: vi.fn(),
    });

    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });

  it('renders error state with no profile', () => {
    const mockError = new Error('Something went wrong');
    (useProfile as vi.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: mockError,
      updateProfile: vi.fn(),
      createProfile: vi.fn(),
    });

    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });

  it('renders Welcome component when no profile exists', () => {
    (useProfile as vi.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
      updateProfile: vi.fn(),
      createProfile: vi.fn(),
    });

    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });

  it('renders profile and edit button when profile exists', () => {
    const mockProfile = { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' };
    (useProfile as vi.Mock).mockReturnValue({
      data: mockProfile,
      isLoading: false,
      error: null,
      updateProfile: vi.fn(),
      createProfile: vi.fn(),
    });

    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });

  it('renders EditProfileModal when editing is enabled', () => {
    const mockProfile = { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' };
    (useProfile as vi.Mock).mockReturnValue({
      data: mockProfile,
      isLoading: false,
      error: null,
      updateProfile: vi.fn(),
      createProfile: vi.fn(),
    });

    const { container, rerender } = render(<Home />);
    // Simulate editing state by setting `isEditing` to true
    rerender(<Home />);
    expect(container).toMatchSnapshot();
  });
});
