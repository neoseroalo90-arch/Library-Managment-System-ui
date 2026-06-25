import api from "./api";

export const getBooks = async () => {
  const response = await api.get("/books");
  return response.data;
};

export const createBook = async (bookData) => {
  const response = await api.post("/books", bookData);
  return response.data;
};

export const deleteBook = async (bookId) => {
  const response = await api.delete(`/books/${bookId}`);
  return response.data;
};