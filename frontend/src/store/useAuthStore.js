import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loading: true,
      hasCheckedSession: false, // ✅ para evitar múltiples llamadas

      loginWithGoogle: () => {
        window.location.href =
          "http://localhost:8080/oauth2/authorization/google";
      },

      logout: async () => {
        try {
          await axios.post("http://localhost:8080/logout", null, {
            withCredentials: true,
          });

          set({ user: null, isAuthenticated: false });
          localStorage.removeItem("auth-storage");
        } catch (error) {
          console.error("Error al cerrar sesión:", error);
        }
      },

      checkSession: async () => {
        const { hasCheckedSession } = get();
        if (hasCheckedSession) return;

        try {
          const response = await axios.get("http://localhost:8080/api/user", {
            withCredentials: true,
          });

          const userData = response.data;

          if (userData.authenticated) {
            set({
              user: {
                name: userData.name,
                email: userData.email,
                picture: userData.picture,
              },
              isAuthenticated: true,
              loading: false,
              hasCheckedSession: true,
            });
          } else {
            set({
              user: null,
              isAuthenticated: false,
              loading: false,
              hasCheckedSession: true,
            });
          }
        } catch (error) {
          console.error("Error al verificar la sesión:", error);
          set({
            user: null,
            isAuthenticated: false,
            loading: false,
            hasCheckedSession: true,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
