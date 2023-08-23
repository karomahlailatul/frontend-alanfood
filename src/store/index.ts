import { create } from "zustand";

export type StorePropsType = {
  isLoading: boolean;
  setIsLoading: (data: boolean) => void;
};

// const sampleParams = {
//   search: "",
//   offset: 0,
//   size: 5,
//   page: 1,
//   sort: "",
// };

const useStore = create<StorePropsType>((set) => ({
  isLoading: false,
  setIsLoading: (data) => set({ isLoading: data }),
}));

export default useStore;
