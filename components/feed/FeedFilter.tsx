"use client";

import React, { useState, useTransition } from "react";
import { 
  SlidersHorizontal, 
  ChevronDown, 
  Check, 
  Clock, 
  TrendingUp, 
  Star,
  Sparkles
} from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { refreshData } from "@/server-actions/feed";


const TAGS = ["NextJS", "React", "TypeScript", "Design", "AI", "Database"];
const SORT_OPTIONS = [
  { label: "Latest", value: "latest", icon: Clock },
  { label: "Trending", value: "trending", icon: TrendingUp },
  { label: "Featured", value: "featured", icon: Star },
];

export default function FeedFilter() {
  const [open, setOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("latest");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
const [isPending, startTransition] = useTransition();
  // ফিল্টার সক্রিয় আছে কি না তা চেক করার জন্য
  const hasActiveFilters = selectedTags.length > 0 || selectedSort !== "latest";

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleApply = () => {
    console.log("Applying filters:", { selectedSort, selectedTags });
    setOpen(false);
  startTransition(async () => {
      await refreshData("/feed"); // আপনার যে পেজটি রিফ্রেশ করা দরকার
    });
  };

  return (
    <div className="flex items-end justify-between w-full border-b border-zinc-100 dark:border-zinc-800/60 pb-5 mb-6">
      {/* Title Section */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-900 dark:from-zinc-100 dark:via-zinc-400 dark:to-zinc-100">
            The Thought Stream
          </h1>
          <Sparkles className="h-5 w-5 text-indigo-500 animate-pulse hidden md:block" />
        </div>
        <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
          Curated Insights for NeoNotes
        </p>
      </div>

      {/* Modern Refine Button */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className={cn(
              "h-9 gap-2 px-4 rounded-full font-bold transition-all duration-300 border shadow-sm active:scale-95",
              // ডার্ক মোডে হাই-ভিজিবিলিটি লজিক
              hasActiveFilters 
                ? "bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-700 dark:bg-indigo-500/20 dark:border-indigo-500 dark:text-indigo-400"
                : "bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-500"
            )}
          >
            <SlidersHorizontal className={cn("h-3.5 w-3.5", hasActiveFilters ? "animate-bounce" : "")} />
            <span className="text-xs">Refine</span>
            {hasActiveFilters && (
              <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 ml-0.5" />
            )}
            <ChevronDown className={cn("h-3 w-3 opacity-50 transition-transform duration-300", open && "rotate-180")} />
          </Button>
        </PopoverTrigger>
        
        <PopoverContent 
          className="w-72 p-4 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-2xl backdrop-blur-xl" 
          align="end"
          sideOffset={8}
        >
          <div className="space-y-4">
            {/* Sort Section */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">Sort By</p>
              <div className="grid grid-cols-1 gap-1">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedSort(option.value)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all",
                      selectedSort === option.value 
                        ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold" 
                        : "hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <option.icon className="h-3.5 w-3.5" />
                      {option.label}
                    </div>
                    {selectedSort === option.value && <Check className="h-3.5 w-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-zinc-100 dark:bg-zinc-800/60" />

            {/* Tags Section */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">Filter by Topic</p>
              <div className="flex flex-wrap gap-1.5">
                {TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all",
                      selectedTags.includes(tag)
                        ? "bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-100 dark:border-zinc-100 dark:text-zinc-900"
                        : "bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600"
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex gap-2">
              <Button 
                onClick={handleApply}
                disabled={isPending}
                className="flex-1 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 rounded-xl h-10 text-[11px] font-bold"
              >
                Apply
              </Button>
              <Button 
                variant="outline" 
                className="rounded-xl h-10 px-3 text-[11px] font-bold border-zinc-200 dark:border-zinc-800"
                onClick={() => {
                   setSelectedTags([]);
                   setSelectedSort("latest");
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}