import { create } from 'zustand';
import { fetchChatByCultivo, sendChatMessage, deleteChat } from '../services/message_chat.service';

export const useChatStore = create((set, get) => ({
  chats: {},
  loading: {},

  loadChats: async (cultivoId) => {
    set((state) => ({
      loading: {
        ...state.loading,
        [cultivoId]: true,
      },
    }));

    try {
      const data = await fetchChatByCultivo(cultivoId);
      set((state) => ({
        chats: {
          ...state.chats,
          [cultivoId]: data,
        },
        loading: {
          ...state.loading,
          [cultivoId]: false,
        },
      }));
    } catch (error) {
      console.error("Error cargando chats:", error);
      set((state) => ({
        loading: {
          ...state.loading,
          [cultivoId]: false,
        },
      }));
    }
  },

  sendMessage: async (cultivoId, pregunta) => {
    set((state) => ({
      loading: {
        ...state.loading,
        [cultivoId]: true,
      },
    }));

    try {
      await sendChatMessage(cultivoId, pregunta);
      // Recarga el historial tras enviar para asegurar que se vean la pregunta y la respuesta
      await get().loadChats(cultivoId);
      set((state) => ({
        loading: {
          ...state.loading,
          [cultivoId]: false,
        },
      }));
    } catch (error) {
      console.error("Error enviando mensaje:", error);
      set((state) => ({
        loading: {
          ...state.loading,
          [cultivoId]: false,
        },
      }));
    }
  },

  clearChat: async (cultivoId) => {
    await deleteChat(cultivoId);
    set((state) => ({
      chats: {
        ...state.chats,
        [cultivoId]: [],
      },
    }));
  },
}));