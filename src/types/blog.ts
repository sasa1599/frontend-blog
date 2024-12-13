import { Document } from "@contentful/rich-text-types";

export interface IUser {
  username: string;
  email: string;
  avatar: string;
  role: "Admin" | "User";
}

export interface IBlog {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  slug: string;
  createdAt: string;
  content: Document;
  user: IUser;
}

export interface BlogInput {
  title: string;
  category: string;
  content: string;
  slug: string;
  thumbnail?: File | string | null;
}
