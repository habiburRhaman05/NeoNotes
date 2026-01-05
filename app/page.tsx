"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F7F4ED] dark:bg-[#0A0A0A] text-[#191919] dark:text-[#EAEAEA] transition-colors duration-500">
      
      {/* ১. ক্লিয়ার নেভিগেশন (Medium Inspired) */}
      <nav className="fixed top-0 w-full z-50 border-b border-black/5 dark:border-white/5 bg-[#F7F4ED]/90 dark:bg-[#0A0A0A]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-3xl font-serif font-black tracking-tighter hover:opacity-80 transition-opacity">
            Synapse<span className="text-indigo-600">.</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-tight">
            <Link href="#" className="hover:text-indigo-600 transition-colors">Our story</Link>
            <Link href="#" className="hover:text-indigo-600 transition-colors">Membership</Link>
            <Link href="/sign-in" className="hover:text-indigo-600 transition-colors">Write</Link>
            <Link href="/sign-in" className="hover:text-indigo-600 transition-colors">Sign in</Link>
            <Link href="/feed">
              <Button className="bg-[#191919] dark:bg-[#EAEAEA] text-white dark:text-black rounded-full px-6 py-5 font-bold hover:bg-black/80 transition-all">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ২. হিরো সেকশন (The Masterpiece) */}
      <section className="relative pt-32 pb-20 border-b border-black/5 dark:border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          
          {/* টেক্সট কন্টেন্ট */}
          <div className="lg:col-span-7 space-y-10 py-20 relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[80px] md:text-[110px] font-serif font-medium leading-[0.95] tracking-tighter"
            >
              Human <br />
              stories & ideas
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-2xl md:text-3xl font-medium text-black/70 dark:text-white/70 max-w-xl leading-snug tracking-tight"
            >
              A place to read, write, and deepen your understanding of the world.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link href="/feed">
                <Button className="h-14 px-12 bg-[#191919] dark:bg-[#EAEAEA] text-white dark:text-black rounded-full text-xl font-bold hover:scale-[1.02] transition-transform">
                  Start reading
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* ডান পাশের অ্যাবস্ট্রাক্ট ইলাস্ট্রেশন (Medium Inspired) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="lg:col-span-5 relative hidden lg:flex justify-center"
          >
            <div className="relative w-full max-w-[450px] aspect-square">
                {/* অ্যানিমেটেড গ্রাফিক এলিমেন্টস */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 dark:bg-emerald-500/10 rounded-full blur-[80px] animate-pulse" />
                
                {/* সেরিফ 'M' বা 'S' বড় করে ব্যাকগ্রাউন্ডে */}
                <span className="absolute inset-0 flex items-center justify-center text-[350px] font-serif font-black opacity-[0.03] dark:opacity-[0.05] select-none pointer-events-none">
                   S
                </span>

                {/* ক্লিন লাইন আর্ট (Medium Style) */}
                <svg viewBox="0 0 200 200" className="w-full h-full text-indigo-600/40 dark:text-indigo-400/20 fill-none stroke-current stroke-[0.5]">
                    <circle cx="100" cy="100" r="80" />
                    <rect x="60" y="60" width="80" height="80" transform="rotate(45 100 100)" />
                    <path d="M20 100 L180 100 M100 20 L100 180" />
                </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ৩. ট্রেন্ডিং সেকশন (Clean List) */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-10">
            <div className="p-1 rounded-full border border-black dark:border-white">
                <Sparkles className="w-3 h-3" />
            </div>
            <h2 className="text-xs font-black uppercase tracking-[0.2em]">Trending on Synapse</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-16">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex gap-6 group cursor-pointer">
               <span className="text-3xl font-serif font-bold text-black/10 dark:text-white/10 group-hover:text-indigo-600 transition-colors">0{i}</span>
               <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                    <span className="text-[13px] font-bold">Author Name</span>
                  </div>
                  <h3 className="text-lg font-black leading-tight tracking-tight group-hover:underline decoration-1 underline-offset-4">
                    The Silent Revolution of Minimalist Design in 2026.
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
                    <span>Jan 5</span>
                    <span>•</span>
                    <span>8 min read</span>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* ৪. মিনিমাল ফুটার */}
      <footer className="py-10 border-t border-black/5 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-6 text-[13px] font-medium text-zinc-500">
           <Link href="#" className="hover:text-black dark:hover:text-white">Help</Link>
           <Link href="#" className="hover:text-black dark:hover:text-white">Status</Link>
           <Link href="#" className="hover:text-black dark:hover:text-white">About</Link>
           <Link href="#" className="hover:text-black dark:hover:text-white">Careers</Link>
           <Link href="#" className="hover:text-black dark:hover:text-white">Privacy</Link>
           <Link href="#" className="hover:text-black dark:hover:text-white">Terms</Link>
        </div>
      </footer>
    </div>
  );
}