import axios from "axios";

const API = "http://localhost:8080/api/cultivos";

export const getSowns = async () => {
  const res = await axios.get(API, { withCredentials: true });
  return res.data; 
};

export const getSownById = async (id) => {
  const res = await axios.get(`${API}/${id}`, { withCredentials: true });
  return res.data;
};

export const createSown = async (sownData) => {
  const res = await axios.post(`${API}/guardar`, sownData, { withCredentials: true });
  return res.data;
};

export const updateSown = async (id, sownData) => {
  const res = await axios.put(`${API}/${id}`, sownData, { withCredentials: true });
  return res.data;
};

export const deleteSown = async (id) => {
  const res = await axios.delete(`${API}/${id}`, { withCredentials: true });
  return res.data;
};

export const patchSown = async (id, estado) => {
  const res = await axios.patch(`${API}/${id}`, estado, { withCredentials: true });
  return res.data;
};
