import { create } from 'zustand';
interface FileState {
  fileName: string;
  setFileName: (params: string) => void;
}

// 创建状态存储
const useFileStore = create<FileState>((set) => ({
  fileName: '',
  setFileName: (fileName) => set({ fileName }),
}));

export default useFileStore;
