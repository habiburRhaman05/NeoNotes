import React, { Suspense } from "react";
import PostCard from "@/components/feed/PostCard";
import FeedFilter from "@/components/feed/FeedFilter";
import PostCardSkeleton from "@/components/feed/PostCardSkeleton";
import PostList from "@/components/feed/PostList";
import FeedRightSidebar from "@/components/feed/FeedRightContent";

// আপনার Prisma Schema অনুযায়ী মক ডেটা (Testing এর জন্য)
const MOCK_POSTS = [
  {
    id: 1,
    title: "Mastering Next.js 15: The Future of Web Development",
    content: "Next.js 15 brings a lot of new features to the table, including enhanced caching and partial pre-rendering. In this post, we'll explore how these changes affect your workflow...",
    thumbnail: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1000&auto=format&fit=crop",
    tags: ["NextJS", "React", "Tech"],
    createdAt: new Date(),
    author: {
      name: "John Doe",
      image: "https://github.com/shadcn.png",
    },
    comment: [
      { id: 101, author: { name: "Ariful" }, content: "This is exactly what I was looking for! Thanks." },
      { id: 102, author: { name: "Sara" }, content: "Can you explain more about PPR?" },
    ],
  },
  {
    id: 1,
    title: "Mastering Next.js 15: The Future of Web Development",
    content: "Next.js 15 brings a lot of new features to the table, including enhanced caching and partial pre-rendering. In this post, we'll explore how these changes affect your workflow...",
    thumbnail: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1000&auto=format&fit=crop",
    tags: ["NextJS", "React", "Tech"],
    createdAt: new Date(),
    author: {
      name: "John Doe",
      image: "https://github.com/shadcn.png",
    },
    comment: [
      { id: 101, author: { name: "Ariful" }, content: "This is exactly what I was looking for! Thanks." },
      { id: 102, author: { name: "Sara" }, content: "Can you explain more about PPR?" },
    ],
  },
  {
    id: 1,
    title: "Mastering Next.js 15: The Future of Web Development",
    content: "Next.js 15 brings a lot of new features to the table, including enhanced caching and partial pre-rendering. In this post, we'll explore how these changes affect your workflow...",
    thumbnail: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1000&auto=format&fit=crop",
    tags: ["NextJS", "React", "Tech"],
    createdAt: new Date(),
    author: {
      name: "John Doe",
      image: "https://github.com/shadcn.png",
    },
    comment: [
      { id: 101, author: { name: "Ariful" }, content: "This is exactly what I was looking for! Thanks." },
      { id: 102, author: { name: "Sara" }, content: "Can you explain more about PPR?" },
    ],
  },
  {
    id: 1,
    title: "Mastering Next.js 15: The Future of Web Development",
    content: "Next.js 15 brings a lot of new features to the table, including enhanced caching and partial pre-rendering. In this post, we'll explore how these changes affect your workflow...",
    thumbnail: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1000&auto=format&fit=crop",
    tags: ["NextJS", "React", "Tech"],
    createdAt: new Date(),
    author: {
      name: "John Doe",
      image: "https://github.com/shadcn.png",
    },
    comment: [
      { id: 101, author: { name: "Ariful" }, content: "This is exactly what I was looking for! Thanks." },
      { id: 102, author: { name: "Sara" }, content: "Can you explain more about PPR?" },
    ],
  },
  {
    id: 1,
    title: "Mastering Next.js 15: The Future of Web Development",
    content: "Next.js 15 brings a lot of new features to the table, including enhanced caching and partial pre-rendering. In this post, we'll explore how these changes affect your workflow...",
    thumbnail: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1000&auto=format&fit=crop",
    tags: ["NextJS", "React", "Tech"],
    createdAt: new Date(),
    author: {
      name: "John Doe",
      image: "https://github.com/shadcn.png",
    },
    comment: [
      { id: 101, author: { name: "Ariful" }, content: "This is exactly what I was looking for! Thanks." },
      { id: 102, author: { name: "Sara" }, content: "Can you explain more about PPR?" },
    ],
  },
  {
    id: 1,
    title: "Mastering Next.js 15: The Future of Web Development",
    content: "Next.js 15 brings a lot of new features to the table, including enhanced caching and partial pre-rendering. In this post, we'll explore how these changes affect your workflow...",
    thumbnail: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1000&auto=format&fit=crop",
    tags: ["NextJS", "React", "Tech"],
    createdAt: new Date(),
    author: {
      name: "John Doe",
      image: "https://github.com/shadcn.png",
    },
    comment: [
      { id: 101, author: { name: "Ariful" }, content: "This is exactly what I was looking for! Thanks." },
      { id: 102, author: { name: "Sara" }, content: "Can you explain more about PPR?" },
    ],
  },
  {
    id: 1,
    title: "Mastering Next.js 15: The Future of Web Development",
    content: "Next.js 15 brings a lot of new features to the table, including enhanced caching and partial pre-rendering. In this post, we'll explore how these changes affect your workflow...",
    thumbnail: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1000&auto=format&fit=crop",
    tags: ["NextJS", "React", "Tech"],
    createdAt: new Date(),
    author: {
      name: "John Doe",
      image: "https://github.com/shadcn.png",
    },
    comment: [
      { id: 101, author: { name: "Ariful" }, content: "This is exactly what I was looking for! Thanks." },
      { id: 102, author: { name: "Sara" }, content: "Can you explain more about PPR?" },
    ],
  },
  {
    id: 1,
    title: "Mastering Next.js 15: The Future of Web Development",
    content: "Next.js 15 brings a lot of new features to the table, including enhanced caching and partial pre-rendering. In this post, we'll explore how these changes affect your workflow...",
    thumbnail: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1000&auto=format&fit=crop",
    tags: ["NextJS", "React", "Tech"],
    createdAt: new Date(),
    author: {
      name: "John Doe",
      image: "https://github.com/shadcn.png",
    },
    comment: [
      { id: 101, author: { name: "Ariful" }, content: "This is exactly what I was looking for! Thanks." },
      { id: 102, author: { name: "Sara" }, content: "Can you explain more about PPR?" },
    ],
  },
  {
    id: 1,
    title: "Mastering Next.js 15: The Future of Web Development",
    content: "Next.js 15 brings a lot of new features to the table, including enhanced caching and partial pre-rendering. In this post, we'll explore how these changes affect your workflow...",
    thumbnail: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1000&auto=format&fit=crop",
    tags: ["NextJS", "React", "Tech"],
    createdAt: new Date(),
    author: {
      name: "John Doe",
      image: "https://github.com/shadcn.png",
    },
    comment: [
      { id: 101, author: { name: "Ariful" }, content: "This is exactly what I was looking for! Thanks." },
      { id: 102, author: { name: "Sara" }, content: "Can you explain more about PPR?" },
    ],
  },
  {
    id: 1,
    title: "Mastering Next.js 15: The Future of Web Development",
    content: "Next.js 15 brings a lot of new features to the table, including enhanced caching and partial pre-rendering. In this post, we'll explore how these changes affect your workflow...",
    thumbnail: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1000&auto=format&fit=crop",
    tags: ["NextJS", "React", "Tech"],
    createdAt: new Date(),
    author: {
      name: "John Doe",
      image: "https://github.com/shadcn.png",
    },
    comment: [
      { id: 101, author: { name: "Ariful" }, content: "This is exactly what I was looking for! Thanks." },
      { id: 102, author: { name: "Sara" }, content: "Can you explain more about PPR?" },
    ],
  },
  {
    id: 2,
    title: "Why Zinc Colors are better for Dark Mode UI",
    content: "Using pure black #000 is often harsh on the eyes. The Zinc palette provides a much softer, more premium feel for professional dashboards...",
    thumbnail: null,
    tags: ["Design", "UI/UX"],
    createdAt: new Date(Date.now() - 3600000),
    author: {
      name: "Jane Smith",
      image: null,
    },
    comment: [],
  },
];

export default function FeedPage() {
  return (
    <div className="space-y-8  w-full ">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <FeedFilter />
      </div>
<div className="flex items-start">
      {/* Feed Grid */}
      <div className="grid grid-cols-1  gap-6">
      <Suspense fallback={
        <div className="flex flex-col">
          {[...Array(5)].map((_, i) => (
            <PostCardSkeleton key={i} index={i} />
          ))}
        </div>
      }>
        <PostList posts={MOCK_POSTS}/>
      </Suspense>
      </div>



      <FeedRightSidebar/>
      </div>
    </div>
  );
}