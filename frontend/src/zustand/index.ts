import { create } from "zustand";
import { api } from "@/lib/api";
import { persist } from "zustand/middleware";

export interface UserData {
  email: string;
  emailVerified: boolean;
  username: string;
  _id: string;
  user: UserData;
  loadCurrentUserData: () => void;
}

export interface Posts {
  _id: string;
  title: string;
  content: string;
  userId: string;
  posts: [] | string[];
  imageUrl: string;
  caption: string;
}

export interface Comments {
  _id: string;
  content: string;
  userId: string;
  postId: string;
}

export interface Fulldata {
  _id: string;
  username: string;
  email: string;
  bio: string;
  profilePictureUrl: string;
  followers: [] | string[];
  following: [] | string[];
  userGroup: string;
  passwordHash: string;
  userDataFull: Fulldata;
  getUserdataFull: (id: string) => void;
}

export const useStore = create(
  persist(
    (set) => ({
      user: null,
      loadCurrentUserData: async () => {
        const data = (await api
          .get("http://localhost:3000/users/currentUser", {
            credentials: "include",
          })
          .json()) as UserData;
        set({ user: data });
        const userData = (await api
          .get(`http://localhost:3000/users/${data._id}`, {
            credentials: "include",
          })
          .json()) as UserData;
        set({ user: userData });
        return data;
      },

      logout: async () => {
        await api.post("http://localhost:3000/auth/logout", {
          credentials: "include",
        });
        set({ user: null });
      },
      getUserdataFull: async (id) => {
        const getPosts = (await api
          .get(`http://localhost:3000/posts/${id}`, {
            credentials: "include",
          })
          .json()) as Posts[];
        set({ posts: getPosts });
        const getComments = (await api
          .get("http://localhost:3000/comments", {
            credentials: "include",
          })
          .json()) as Comments[];
        set({ comments: getComments });
        const FullUserData = (await api
          .get(`http://localhost:3000/users/${id}`, {
            credentials: "include",
          })
          .json()) as UserDataFull;
        set({ userDataFull: FullUserData });
      },
    }),
    {
      name: "zustand-store",
    }
  )
);
