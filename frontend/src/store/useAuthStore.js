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
            set({ loading: true });
            setTimeout(() => {
              set({
                user: {
                  name: userData.name,
                  first_name: userData.first_name,
                  last_name: userData.last_name,
                  email: userData.email,
                  picture: userData.picture,
                },
                isAuthenticated: true,
                loading: false,
                hasCheckedSession: true,
              });
            }, 2000);
          } else {
            set({ loading: true });
            setTimeout(() => {
              set({
                user: null,
                isAuthenticated: false,
                loading: false,
                hasCheckedSession: true,
              });
            }, 2000);
          }
        } catch (error) {
          console.error("Error al verificar la sesión:", error);
          set({ loading: true });
          setTimeout(() => {
            set({
              user: null,
              isAuthenticated: false,
              loading: false,
              hasCheckedSession: true,
            });
          }, 2000);
        }
      },
      updateUser: async (updatedFields) => {
        try {
          const response = await axios.put(
            "http://localhost:8080/api/user",
            updatedFields,
            { withCredentials: true }
          );

          const user = get().user;
          const newUser = { ...user, ...updatedFields };

          set({ user: newUser });
          return { success: true, message: response.data };
        } catch (error) {
          console.error("Error al actualizar el usuario:", error);
          return { success: false, message: "Error al actualizar el usuario" };
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
