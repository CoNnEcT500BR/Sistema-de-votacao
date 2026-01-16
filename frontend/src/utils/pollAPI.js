import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const pollAPI = {
  getAll: () => axios.get(`${API_URL}/api/polls`),

  getById: (pollId) => axios.get(`${API_URL}/api/polls/${pollId}`),

  create: (pollData) => axios.post(`${API_URL}/api/polls`, pollData),

  update: (pollId, pollData) =>
    axios.put(`${API_URL}/api/polls/${pollId}`, pollData),

  delete: (pollId) => axios.delete(`${API_URL}/api/polls/${pollId}`),

  getResults: (pollId) => axios.get(`${API_URL}/api/polls/${pollId}/results`),

  vote: (pollId, optionId) =>
    axios.post(`${API_URL}/api/polls/${pollId}/vote`, { optionId }),
};
