"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EyeIcon, FileTextIcon } from "lucide-react";
import Link from "next/link";

type Post = { id: number; title: string; date: string };

const PostsDefault = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setPosts([
        { id: 1, title: "Next.js 14 Features", date: "2026-01-10" },
        { id: 2, title: "React 18 Updates", date: "2026-01-12" },
        { id: 3, title: "Tailwind Tricks", date: "2026-01-13" },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
          <FileTextIcon size={18} /> Latest Posts
        </CardTitle>
        <Link href="/posts" className="text-blue-500 text-xs flex items-center gap-1 hover:underline">
          View All <EyeIcon size={14} />
        </Link>
      </CardHeader>
      <CardContent className="space-y-2">
        {loading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} className="h-6 w-full rounded animate-pulse" />
            ))
          : posts.map((post) => (
              <div key={post.id} className="flex justify-between items-center p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer">
                <span className="font-medium text-gray-700">{post.title}</span>
                <span className="text-xs text-gray-400">{post.date}</span>
              </div>
            ))}
      </CardContent>
    </Card>
  );
};

export default PostsDefault;
