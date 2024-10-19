// import { create } from "zustand";
// import { Pokemon } from "./types/Pokemon";

// function getFavorites() {
//   if (localStorage.getItem("favorites")) {
//     const storedFavorites = localStorage.getItem("favorites") as string;
//     return JSON.parse(storedFavorites) as Pokemon[];
//   }

//   return [] as Pokemon[];
// }

// export const useStore = create((set) => ({
//   favorites: getFavorites(),
//   updateFavorites: () => set((state: { bears: number; }) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
//   updateBears: (newBears: any) => set({ bears: newBears }),
// }));

export {};
