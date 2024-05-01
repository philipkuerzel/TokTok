import ky from "ky";

export const api = ky.create({ prefixUrl: import.meta.env.VITE_BACKEND_URL });

export const getAllUsers = () =>
  api.get("users", { credentials: "include" }).json();
export const getFeed = () =>
  api.get("posts", { credentials: "include" }).json();
export const getUserData = (id) =>
  api.get(`users/${id}`, { credentials: "include" }).json();
export const addLike = (postId, userId) =>
  api.post(`posts/like/${postId}/${userId}`, { credentials: "include" }).json();
export const getSinglePost = (id) =>
  api.get(`posts/${id}`, { credentials: "include" }).json();
export const getComments = (id) =>
  api.get(`posts/${id}/comments`, { credentials: "include" }).json();
export const addComment = (postId, userId) =>
  api.post(`posts/${postId}/${userId}`, { credentials: "include" }).json();
