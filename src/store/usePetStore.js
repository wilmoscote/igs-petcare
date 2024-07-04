import { create } from 'zustand'

const usePetStore = create((set) => ({
    selectedPet: null,
    setSelectedPet: (pet) => set({ selectedPet: pet }),
    removePet: () => set({ bears: null }),
}))

export default usePetStore;