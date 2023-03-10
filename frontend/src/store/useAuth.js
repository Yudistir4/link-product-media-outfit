import { create } from 'zustand';

export const useAuth = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  login: (user) =>
    set(() => {
      localStorage.setItem('user', JSON.stringify(user));
      return { user };
    }),

  logout: () => {
    localStorage.setItem('user', null);
    set({ user: null });
  },
}));
