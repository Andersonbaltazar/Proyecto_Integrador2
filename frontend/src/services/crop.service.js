import axios from "axios";

const API = "http://localhost:8080/api/cultivos";

export const getCrops = async () => {
  try {
    const res = await axios.get(API, { withCredentials: true });
    return res.data; 
  } catch (error) {
    console.error('Error fetching crops:', error.response?.data || error.message);
    throw error;
  }
};

export const getCropById = async (id) => {
  const res = await axios.get(`${API}/${id}`, { withCredentials: true });
  return res.data;
};

export const createCrop = async (cropData) => {
  try {
    const res = await axios.post(`${API}/guardar`, cropData, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.error('Error creating crop:', error.response?.data || error.message);
    throw error;
  }
};

export const updateCrop = async (id, cropData) => {
  const res = await axios.put(`${API}/${id}`, cropData, { withCredentials: true });
  return res.data;
};

export const deleteCrop = async (id) => {
  const res = await axios.delete(`${API}/${id}`, { withCredentials: true });
  return res.data;
};

export const patchCrop = async (id, estado) => {
  const res = await axios.patch(
    `${API}/${id}`,
    { estado },
    {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }
  );
  return res.data;
}; 