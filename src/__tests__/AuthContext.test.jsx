import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../context/AuthContext';

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('starts unauthenticated', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated()).toBe(false);
    expect(result.current.isAdmin()).toBe(false);
  });

  test('logs in with valid credentials', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    let loginResult;
    await act(async () => {
      loginResult = await result.current.login('admin@comperia.com.br', 'admin123');
    });

    expect(loginResult.success).toBe(true);
    expect(result.current.user).not.toBeNull();
    expect(result.current.isAuthenticated()).toBe(true);
  });

  test('fails login with invalid credentials', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    let loginResult;
    await act(async () => {
      loginResult = await result.current.login('wrong@email.com', 'wrongpass');
    });

    expect(loginResult.success).toBe(false);
    expect(loginResult.error).toBeDefined();
    expect(result.current.user).toBeNull();
  });

  test('logs out', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login('admin@comperia.com.br', 'admin123');
    });

    expect(result.current.isAuthenticated()).toBe(true);

    act(() => {
      result.current.logout();
    });

    expect(result.current.isAuthenticated()).toBe(false);
    expect(result.current.user).toBeNull();
  });

  test('admin user has admin role', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login('admin@comperia.com.br', 'admin123');
    });

    expect(result.current.isAdmin()).toBe(true);
  });
});
