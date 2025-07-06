import { create } from "zustand";
import { getPrice } from "../services/price.service";

export const usePriceStore = create((set, get) => ({
  loading: false,
  error: null,
  priceData: null,

  fetchPrice: async (cultivoId) => {
    // Evita volver a cargar si ya hay datos
    const { priceData } = get();
    if (priceData?.id === cultivoId) return;

    set({ loading: true, error: null });

    try {
      const data = await getPrice(cultivoId);
      set({ priceData: data, loading: false });
    } catch (error) {
      set({
        error: error.message || "Error al obtener precios",
        loading: false,
      });
    }
  },
}));
