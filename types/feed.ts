import { User } from "better-auth";

export enum PostStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export enum CommentStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  SPAM = "SPAM",
}


export type Comment = {
  id: number;
  content: string;
  authorId: string;
  postId: number;
  parentId?: number | null;
  status: CommentStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
  author?: User;
  replies?: Comment[];
};

export type Feed = {
  id: number;
  title: string;
  content: string;
  thumbnail?: string | null;
  isFeatured: boolean;
  status: PostStatus;
  tags: string[];
  viwes: number; 
  authorId: string;
  author: User;
  createdAt: Date | string;
  updatedAt: Date | string;
  comment?: Comment[];
};

