import { create } from "zustand";
import {
  getSowns,
  getSownById,
  createSown,
  updateSown,
  deleteSown,
} from "../services/sown.service";

const useSownStore = create((set) => ({
  sowns: [],
  selectedSown: null,

  fetchSowns: async () => {
    const sowns = await getSowns();
    set({ sowns });
  },

  fetchSownById: async (id) => {
    const sown = await getSownById(id);
    set({ selectedSown: sown });
  },

  createSown: async (sownData) => {
    const newSown = await createSown(sownData);
    const sowns = await getSowns();
    set({ sowns });
    return newSown;
  },

  updateSown: async (id, sownData) => {
    const updated = await updateSown(id, sownData);
    set((state) => ({
      sowns: state.sowns.map((s) => (s.id === id ? { ...s, ...updated } : s)),
    }));
    return updated;
  },

  deleteSown: async (id) => {
    await deleteSown(id);
    set((state) => ({
      sowns: state.sowns.filter((s) => s.id !== id),
    }));
  },
}));

export default useSownStore;
