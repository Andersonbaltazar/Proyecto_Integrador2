import { create } from "zustand";
import {
  getCrops,
  getCropById,
  createCrop,
  updateCrop,
  deleteCrop,
  patchCrop,
} from "../services/crop.service";

const useCropStore = create((set) => ({
  crops: [],
  selectedCrop: null,

  fetchCrops: async () => {
    try {
      const crops = await getCrops();
      set({ crops });
    } catch (error) {
      console.error('Error fetching crops:', error);
      throw error;
    }
  },

  fetchCropById: async (id) => {
    const crop = await getCropById(id);
    set({ selectedCrop: crop });
  },

  createCrop: async (cropData) => {
    try {
      const newCrop = await createCrop(cropData);
      // Actualizar la lista después de crear
      const crops = await getCrops();
      set({ crops });
      return newCrop;
    } catch (error) {
      console.error('Error creating crop:', error);
      throw error;
    }
  },

  updateCrop: async (id, cropData) => {
    const updated = await updateCrop(id, cropData);
    set((state) => ({
      crops: state.crops.map((s) => (s.id === id ? { ...s, ...updated } : s)),
    }));
    return updated;
  },

  deleteCrop: async (id) => {
    await deleteCrop(id);
    set((state) => ({
      crops: state.crops.filter((s) => s.id !== id),
    }));
  },

  patchCrop: async (id, estado) => {
    const updatedCrop = await patchCrop(id, estado);
    set((state) => ({
      crops: state.crops.map((s) => (s.id === id ? { ...s, ...updatedCrop } : s)),
    }));
    return updatedCrop;
  },
}));

export default useCropStore;
