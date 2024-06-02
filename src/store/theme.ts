import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { ThemeType } from '@/types';

interface ThemeState {
  theme: ThemeType;
  changeTheme: (params: ThemeType) => void;
}

// 创建状态存储
const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'default',
      changeTheme: (theme) => set({ theme }),
    }),
    {
      name: 'themeColor',
    },
  ),
);

export default useThemeStore;
