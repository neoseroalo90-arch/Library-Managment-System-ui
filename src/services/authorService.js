import api from "./api";

export const getAuthors = async () => {
  const response = await api.get("/authors");
  return response.data;
};

export const getAuthorById = async (id) => {
  const response = await api.get(`/authors/${id}`);
  return response.data;
};

export const createAuthor = async (authorData) => {
  const response = await api.post("/authors", authorData);
  return response.data;
};

export const updateAuthor = async (id, authorData) => {
  const response = await api.put(`/authors/${id}`, authorData);
  return response.data;
};

export const deleteAuthor = async (id) => {
  const response = await api.delete(`/authors/${id}`);
  return response.data;
};