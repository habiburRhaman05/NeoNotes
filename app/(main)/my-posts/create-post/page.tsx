"use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronDown, Plus, X, Eye, RotateCcw } from "lucide-react";

// export default function BlogEditor() {
//   const [theme, setTheme] = useState("dark"); // আপনি চাইলে 'light' করতে পারেন
//   const [title, setTitle] = useState("");
//   const [slug, setSlug] = useState("");
//   const [content, setContent] = useState("");
//   const [tagInput, setTagInput] = useState("");
//   const [tags, setTags] = useState<string[]>([]);
//   const [publishOpen, setPublishOpen] = useState(false);
//   const [status, setStatus] = useState("Publish");
//   const isDark = theme === "dark";
//   const addTag = () => {
//     if (tagInput.trim() && !tags.includes(tagInput.trim())) {
//       setTags([...tags, tagInput.trim()]);
//       setTagInput("");
//     }
//   };

//   const removeTag = (tagToRemove: string) => {
//     setTags(tags.filter((t) => t !== tagToRemove));
//   };

//   return (
//     <div className={`min-h-screen p-6 transition-colors duration-300 ${isDark ? "bg-zinc-950 text-zinc-100" : "bg-zinc-50 text-zinc-900"}`}>
//       <div className="max-w-4xl mx-auto space-y-6">
        
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <h1 className="text-2xl font-bold tracking-tight">Write your story</h1>
//           <div className="flex gap-3 items-center">
//             <button className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition">
//               <Eye size={18} />
//             </button>
//             <button className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition">
//               <RotateCcw size={18} />
//             </button>

//             {/* Publish dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setPublishOpen(!publishOpen)}
//                 className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition flex items-center gap-2"
//               >
//                 {status}
//                 <ChevronDown size={16} className={publishOpen ? "rotate-180 transition" : "transition"} />
//               </button>
              
//               <AnimatePresence>
//                 {publishOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="absolute right-0 mt-2 w-48 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl z-50 overflow-hidden"
//                   >
//                     {["Publish", "Save as Draft", "Schedule"].map((s) => (
//                       <button
//                         key={s}
//                         onClick={() => {
//                           setStatus(s);
//                           setPublishOpen(false);
//                         }}
//                         className="w-full px-4 py-3 text-sm text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 transition first:rounded-t-2xl last:rounded-b-2xl"
//                       >
//                         {s}
//                       </button>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>
//         </div>

//         {/* Inputs Content Area */}
//         <div className="space-y-6 bg-white dark:bg-zinc-900/50 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm">
          
//           <CustomInput
//             label="Blog Title"
//             value={title}
//             onChange={setTitle}
//             placeholder="Enter a catchy title..."
//           />

       

//           {/* Tags Section */}
//           <div className="space-y-2">
//             <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Tags</label>
//             <div className="flex gap-2">
//               <input
//                 value={tagInput}
//                 onChange={(e) => setTagInput(e.target.value)}
//                 onKeyDown={(e) => e.key === 'Enter' && addTag()}
//                 placeholder="Type and press enter"
//                 className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//               />
//               <button onClick={addTag} className="p-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black">
//                 <Plus size={20} />
//               </button>
//             </div>
            
//             <div className="flex flex-wrap gap-2 mt-3">
//               <AnimatePresence>
//                 {tags.map((tag) => (
//                   <motion.div
//                     key={tag}
//                     initial={{ scale: 0.5, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     exit={{ scale: 0.5, opacity: 0 }}
//                     className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-bold border border-indigo-200 dark:border-indigo-800"
//                   >
//                     #{tag}
//                     <button onClick={() => removeTag(tag)} className="hover:text-red-500 transition">
//                       <X size={14} />
//                     </button>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* Editor Area */}
         
//         </div>
//       </div>
//     </div>
//   );
// }

// // আলাদা করা ইনপুট কম্পোনেন্ট (Fixed)
// function CustomInput({ label, value, onChange, placeholder }: any) {
//   return (
//     <div className="space-y-2">
//       <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest">{label}</label>
//       <input
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//         className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//       />
//     </div>
//   );
// }

import ContentForm from '@/components/content-form'
import React from 'react'

const page = () => {
  return (
    <div>
      <ContentForm/>
    </div>
  )
}

export default page