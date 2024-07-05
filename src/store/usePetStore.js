import { create } from 'zustand'

const usePetStore = create((set) => ({
    selectedPet: null,
    selectedService: null,
    setSelectedPet: (pet) => set({ selectedPet: pet }),
    removePet: () => set({ selectedPet: null }),
    setSelectedService: (service) => set({ selectedService: service }),
    removeService: () => set({ selectedService: null }),
}))

export default usePetStore;