"use client";

import React from "react";
import { Plus, SearchX, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  showCreateButton?: boolean;
}

export default function EmptyState({ 
  title = "No stories found", 
  description = "The stream is quiet for now. Be the first to spark a conversation by sharing your thoughts.",
  showCreateButton = true 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      {/* Visual Element */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-indigo-500/20 dark:bg-indigo-500/10 blur-3xl rounded-full" />
        <div className="relative flex items-center justify-center w-20 h-20 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl rotate-6 group hover:rotate-0 transition-transform duration-500 shadow-xl">
          <SearchX className="w-10 h-10 text-zinc-400 dark:text-zinc-500" />
          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-indigo-500 animate-pulse" />
        </div>
      </div>

      {/* Text Content */}
      <div className="max-w-md space-y-2">
        <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium italic">
          {description}
        </p>
      </div>

      {/* Call to Action */}
      {showCreateButton && (
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full px-8 h-11 shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4 mr-2" />
            Write a Story
          </Button>
          <Button 
            variant="ghost" 
            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 font-bold rounded-full h-11"
            onClick={() => window.location.reload()}
          >
            Refresh Feed
          </Button>
        </div>
      )}
    </div>
  );
}