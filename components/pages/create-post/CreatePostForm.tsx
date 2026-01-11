"use client";

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  X, 
  Hash, 
  Link2, 
  CheckCircle2,
  BookOpen,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const CreatePostForm = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  // 1. Leave Page Guard
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (title || content || tags.length > 0) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [title, content, tags]);

  // 2. Handlers
  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag.toLowerCase()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const autoGenerateSlug = (val: string) => {
    setTitle(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
  };

  return (
    <div className=" bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-100/50">
      
      <main className="max-w-6xl mx-auto pt-16 pb-32 px-6 flex flex-col lg:flex-row gap-16">
        
        {/* LEFT COLUMN: WRITING AREA */}
        <div className="flex-1 max-w-3xl">
          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => autoGenerateSlug(e.target.value)}
            placeholder="Article Title..."
            className="w-full text-5xl font-bold bg-transparent border-none outline-none placeholder:text-zinc-200 dark:placeholder:text-zinc-800 mb-6 tracking-tight"
          />

          {/* Slug & Tags row */}
          <div className="flex flex-col gap-6 mb-12">
            <div className="flex items-center gap-2 group border-b border-zinc-100 dark:border-zinc-900 pb-2">
              <Link2 className="h-4 w-4 text-zinc-300" />
              <span className="text-sm text-zinc-400 font-mono">yoursite.com/</span>
              <input 
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-sm font-mono text-zinc-500 focus:text-zinc-900"
                placeholder="url-path"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <Hash className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-300" />
                  <input 
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                    className="w-full bg-transparent border-none outline-none pl-6 text-sm py-2 focus:ring-0"
                    placeholder="Add topics..."
                  />
                </div>
                <Button 
                  onClick={handleAddTag}
                  variant="outline" 
                  size="sm" 
                  className="rounded-full border-zinc-200 text-xs font-bold hover:bg-zinc-50 transition-all"
                >
                  <Plus className="h-3 w-3 mr-1" /> Add Tag
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-xs font-medium group transition-all hover:bg-zinc-200">
                    #{tag}
                    <button onClick={() => removeTag(tag)} className="opacity-30 hover:opacity-100">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="relative">
            <Textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="The floor is yours..."
              className="w-full min-h-[600px] bg-transparent border-none outline-none p-0 focus-visible:ring-0 text-xl leading-relaxed placeholder:text-zinc-200 resize-none shadow-none"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: WRITER RULES (Sidebar) */}
        <aside className="w-full lg:w-60 space-y-8 pt-4">
            <div className="sticky top-24 p-8 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3 mb-6 text-zinc-400">
                    <BookOpen className="h-5 w-5" />
                    <h3 className="text-xs font-bold uppercase tracking-widest">Writing Rules</h3>
                </div>

                <ul className="space-y-6">
                    <li className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <h4 className="text-sm font-bold">Be Authentic</h4>
                        </div>
                        <p className="text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            Write with your own voice. Avoid overused buzzwords and focus on unique perspectives.
                        </p>
                    </li>

                    <li className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <h4 className="text-sm font-bold">Readability First</h4>
                        </div>
                        <p className="text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            Use short paragraphs and clear headings. Your story should be scannable and easy to digest.
                        </p>
                    </li>

                    <li className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <h4 className="text-sm font-bold">Check Your Sources</h4>
                        </div>
                        <p className="text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            Ensure all facts and quotes are accurate. Linking to original sources builds trust with readers.
                        </p>
                    </li>
                </ul>

                <div className="mt-8 pt-6 border-t border-zinc-200/50 dark:border-zinc-800 flex items-center gap-3 text-zinc-400">
                    <Info className="h-4 w-4" />
                    <span className="text-[11px] italic">Remember: Quality over Quantity.</span>
                </div>
            </div>
        </aside>

      </main>
    </div>
  );
};

export default CreatePostForm;