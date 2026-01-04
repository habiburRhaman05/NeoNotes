"use client";

import React from "react";
import { TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const RECOMMENDED_TOPICS = ["Development", "Self Improvement", "Data Science", "Writing", "Relationships", "Politics"];

const SUGGESTED_AUTHORS = [
  { name: "Lex Fridman", bio: "AI Researcher & Podcaster", image: "https://github.com/shadcn.png" },
  { name: "Naval Ravikant", bio: "Entrepreneur & Philosopher", image: "https://github.com/shadcn.png" },
  { name: "Ali Abdaal", bio: "Productivity Expert", image: "https://github.com/shadcn.png" },
];

export default function FeedRightSidebar() {
  return (
    <aside className="w-[350px]  mt-8 xl:block hidden h-fit sticky top-24 space-y-12 pl-12">
      
      {/* ১. Staff Picks Section */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          Staff Picks
        </h3>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="group cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-4 w-4 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                   <img src="https://github.com/shadcn.png" alt="author" className="h-full w-full" />
                </div>
                <span className="text-[11px] font-medium text-zinc-500">In NeoNotes Stream</span>
              </div>
              <h4 className="text-sm font-bold leading-snug group-hover:underline text-zinc-800 dark:text-zinc-200 line-clamp-2">
                The future of AI and how it's shaping our thoughts in 2026.
              </h4>
            </div>
          ))}
        </div>
        <button className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors">
          See the full list
        </button>
      </section>

      {/* ২. Recommended Topics */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Recommended topics</h3>
        <div className="flex flex-wrap gap-2">
          {RECOMMENDED_TOPICS.map((topic) => (
            <button
              key={topic}
              className="px-4 py-2 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-xs font-medium rounded-full transition-colors text-zinc-700 dark:text-zinc-300"
            >
              {topic}
            </button>
          ))}
        </div>
      </section>

      {/* ৩. Who to follow */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Who to follow</h3>
        <div className="space-y-4">
          {SUGGESTED_AUTHORS.map((author) => (
            <div key={author.name} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <img src={author.image} className="h-8 w-8 rounded-full border border-zinc-100 dark:border-zinc-800" alt="" />
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-zinc-900 dark:text-zinc-100">{author.name}</span>
                  <span className="text-[11px] text-zinc-500 line-clamp-1">{author.bio}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-7 rounded-full text-xs px-3 border-zinc-300 dark:border-zinc-700 font-bold hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900">
                Follow
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* ৪. Footer Links */}
      <footer className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-x-4 gap-y-2">
        {["Help", "Status", "About", "Careers", "Privacy", "Terms"].map((link) => (
          <a key={link} href="#" className="text-[11px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
            {link}
          </a>
        ))}
      </footer>
    </aside>
  );
}