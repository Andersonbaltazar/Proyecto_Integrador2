import { create } from "zustand";
import axios from "axios";

const useCultivoStore = create((set) => ({
  cultivos: [],
  loading: false,
  error: null,

  fetchCultivos: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("http://localhost:8080/api/cultivos", {
        withCredentials: true,
      });
      set({ cultivos: res.data, loading: false });
    } catch (err) {
      console.error("Error fetching cultivos:", err);
      set({ error: "Error al cargar los cultivos", loading: false });
    }
  },

  guardarCultivo: async (cultivoData) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/cultivos/guardar",
        cultivoData,
        { withCredentials: true } // ¡IMPORTANTE!
      );
      const cultivo = { ...cultivoData, id: res.data.cultivoId };
      set((state) => ({
        cultivos: [...state.cultivos, cultivo],
      }));
      return { ok: true, message: res.data.message };
    } catch (error) {
      console.error("Error al guardar el cultivo:", error);
      return {
        ok: false,
        message: error.response?.data || "Error desconocido",
      };
    }
  },

  eliminarCultivo: (id) =>
    set((state) => ({
      cultivos: state.cultivos.filter((c) => c.id !== id),
    })),
}));

export default useCultivoStore;
