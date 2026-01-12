"use client";

import React from 'react';
import { 
  X, 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  Bookmark,
  Monitor,
  Smartphone
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    title: string;
    slug: string;
    content: string;
    tags: string[];
    thumbnail: string | null;
  };
}

const PreviewModal = ({ isOpen, onClose, data }: PreviewModalProps) => {
  const [viewMode, setViewMode] = React.useState<'desktop' | 'mobile'>('desktop');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="xl:min-w-[1000px] h-[90vh] p-0 overflow-scroll bg-zinc-50/50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
        
        {/* Top bar for Modal Control */}
        <div className="flex items-center justify-between px-6 py-3 border-b bg-white dark:bg-zinc-900 z-10">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400">
              Draft Preview
            </Badge>
            <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
            <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
              <button 
                onClick={() => setViewMode('desktop')}
                className={cn("p-1.5 rounded-md transition-all", viewMode === 'desktop' ? "bg-white dark:bg-zinc-700 shadow-sm" : "text-zinc-400")}
              >
                <Monitor className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setViewMode('mobile')}
                className={cn("p-1.5 rounded-md transition-all", viewMode === 'mobile' ? "bg-white dark:bg-zinc-700 shadow-sm" : "text-zinc-400")}
              >
                <Smartphone className="h-4 w-4" />
              </button>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="h-full bg-zinc-50/50 dark:bg-zinc-950">
          <div className={cn(
            "mx-auto transition-all duration-500 py-12 px-6",
            viewMode === 'desktop' ? "max-w-3xl" : "max-w-[375px] bg-white dark:bg-zinc-900 shadow-2xl min-h-screen my-4 rounded-[3rem] border-8 border-zinc-200 dark:border-zinc-800 p-8"
          )}>
            
            {/* Header Section */}
            <header className="mb-10 text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                {data.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-primary/60">
                    #{tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 mb-6 leading-[1.1]">
                {data.title || "Untitled Masterpiece"}
              </h1>
              <div className="flex items-center justify-center gap-6 text-sm text-zinc-400">
                <span className="flex items-center gap-2"><User className="h-4 w-4" /> By You</span>
                <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Jan 12, 2026</span>
              </div>
            </header>

            {/* Thumbnail Preview */}
            {data.thumbnail && (
              <div className="mb-12 rounded-[2.5rem] overflow-hidden aspect-video shadow-2xl">
                <img 
                  src={data.thumbnail} 
                  alt="Thumbnail" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content Injection */}
            <article 
              className={cn(
                "prose prose-zinc dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight",
                "prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-xl",
                "prose-img:rounded-3xl prose-img:shadow-xl",
                "prose-pre:bg-zinc-900 prose-pre:rounded-2xl prose-pre:border prose-pre:border-zinc-800"
              )}
              dangerouslySetInnerHTML={{ __html: data.content }}
            />

            <footer className="mt-20 pt-10 border-t border-zinc-200 dark:border-zinc-800 text-center">
              <p className="text-zinc-400 text-sm italic">End of Preview</p>
            </footer>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;