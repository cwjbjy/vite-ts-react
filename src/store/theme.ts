import { create } from 'zustand';

import type { ThemeType } from '@/types';

interface ThemeState {
  theme: ThemeType;
  changeTheme: (params: ThemeType) => void;
}

// 创建状态存储
const useThemeStore = create<ThemeState>((set) => ({
  theme: 'theme-gray',
  changeTheme: (theme) => set({ theme }),
}));

export default useThemeStore;
