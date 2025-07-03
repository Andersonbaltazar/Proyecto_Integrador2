import axios from 'axios';

const API = 'http://localhost:8080/api/recomendaciones/cultivo';

/**
 * Obtiene todas las recomendaciones (mensajes) de un cultivo
 */
export const fetchChatByCultivo = async (cultivoId) => {
  const { data } = await axios.get(`${API}/${cultivoId}`, {
    withCredentials: true,
  });
  return data; // array de recomendaciones
};

/**
 * Envía una pregunta, genera la respuesta IA y la guarda
 */
export const sendChatMessage = async (cultivoId, pregunta) => {
  const { data } = await axios.post(
    `${API}/${cultivoId}`,
    { pregunta },
    { withCredentials: true },
  );
  return data; // recomendación recién creada
};

/**
 * Borra lógicamente TODAS las recomendaciones de un cultivo
 */
export const deleteChat = async (cultivoId) => {
  await axios.put(
    `${API}/${cultivoId}/eliminar`,
    {},
    { withCredentials: true },
  );
};