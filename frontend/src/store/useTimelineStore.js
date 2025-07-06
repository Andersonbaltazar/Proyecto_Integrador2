import { create } from "zustand";
import { getTimeline } from "../services/timeline.service"; // Asegúrate que esté bien la ruta

export const useCropTimelineStore = create((set, get) => ({
  loading: false,
  error: null,
  timeline: null,
  lastCultivoId: null,

  fetchTimeline: async (cultivoId) => {
    const { lastCultivoId, timeline } = get();

    // Si ya está cargado y es el mismo cultivo, no vuelvas a llamar
    if (timeline && lastCultivoId === cultivoId) return;

    set({ loading: true, error: null });

    try {
      const data = await getTimeline(cultivoId);

      const edadNum = parseInt(data.edad);
      const edadTexto =
        isNaN(edadNum) || edadNum < 0 ? "Aún no sembrado" : `${edadNum} días`;

      const etapas = Object.entries(data.recomendaciones).map(
        ([etapa, detalle], index) => ({
          title: `Etapa ${index + 1}`,
          cardTitle: etapa,
          cardSubtitle:
            etapa === data.etapaActual ? "Etapa actual" : "Etapa posterior",
          cardDetailedText: detalle,
        })
      );

      const items = [
        {
          title: "Inicio",
          cardTitle: "Inicio del Cultivo",
          cardSubtitle: `Edad: ${edadTexto}`,
          cardDetailedText: `Etapa actual: ${data.etapaActual}`,
        },
        ...etapas,
      ];

      set({ timeline: items, loading: false, lastCultivoId: cultivoId });
    } catch (err) {
      set({ error: err.message || "Error inesperado", loading: false });
    }
  },
}));
