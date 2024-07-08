import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useClinicStore = create(persist((set) => ({
    token: null,
    user: null,
    manthisUser: null,
    otpUser: null,
    auxToken: null,
    currentCountry: 'co',
    setCurrentCountry: (country) => set({ currentCountry: country }),
    setLogin: (token) => set({ token: token }),
    setUser: (user) => set({ user: user }),
    setOtpUser: (user) => set({ otpUser: user }),
    setManthisUser: (user) => set({ manthisUser: user }),
    setLogout: () => set({ token: null, user: null, manthisUser: null, auxToken: null }),
}), {
    name: 'igs-pet-clinic-storage',
    getStorage: () => localStorage
}));

export default useClinicStore