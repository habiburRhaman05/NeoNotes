"use client";

import React, { useState, useEffect } from 'react';
import { 
  Plus, X, Hash, Link2, CheckCircle2, 
  BookOpen, Info, ImagePlus, Loader2, CloudUpload,
  ChevronRight, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from "@/lib/utils";
import Editor from '@/components/editor/editor';
// Define the type for the props
interface CreatePostFormProps {
  formData: {
    title: string;
    slug: string;
    content: any;
    tags: string[];
    thumbnail: string | null;
  };
  defaultContent:any
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}
const CreatePostForm = ({ formData, setFormData,defaultContent }: CreatePostFormProps) => {
  const [currentTag, setCurrentTag] = useState("");
  const [showRules, setShowRules] = useState(false);
  const [uploading, setUploading] = useState(false);
  // const [htmlContent,setHtmlContent] = useState("")

  const { title, slug, tags, thumbnail } = formData;
 

  // update content


  // Sync state helpers
  const updateField = (field: string, value: any) => {

    
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    // Simulate upload delay
    const promise = fetch(process.env.NEXT_PUBLIC_API_URL+"/api/v1/post/upload-thumbnail", {
    method: "POST",
    headers: {
      "content-type": file?.type || "application/octet-stream",
      "x-vercel-filename": file?.name || "image.png",
    },
    body: file,
  });
  console.log(promise);
  
  };

  const autoGenerateSlug = (val: string) => {
    updateField('title', val);
    const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    updateField('slug', generatedSlug);
  };

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      updateField('tags', [...tags, currentTag.toLowerCase()]);
      setCurrentTag("");
    }
  };

  const removeThumbnail = ()=>{}
  const removeTag = (tag:string)=>{}

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-100/50 relative overflow-x-hidden">
      
     

      <main className="max-w-4xl mx-auto pt-8 pb-32 px-6 transition-all duration-500">
   
        <div className={cn(
          "transition-all duration-500 flex gap-12",
          showRules ? "mr-72 opacity-50 pointer-events-none scale-95 blur-[2px]" : "mr-0"
        )}>
          {/* WRITING AREA */}
          <div className="flex-1 max-w-3xl mx-auto">
            {/* THUMBNAIL UPLOAD UI */}
            <div className="mb-10 group">
              {!thumbnail ? (
                <label className={`
                  relative flex flex-col items-center justify-center w-full h-48 
                  border-2 border-dashed rounded-[2rem] transition-all cursor-pointer
                  ${uploading ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-50/50 border-zinc-100 hover:border-zinc-300 hover:bg-zinc-50'}
                  dark:bg-zinc-900/20 dark:border-zinc-800 dark:hover:border-zinc-700
                `}>
                  <div className="flex flex-col items-center justify-center">
                    {uploading ? (
                      <Loader2 className="w-8 h-8 text-zinc-400 animate-spin" />
                    ) : (
                      <div className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-600 transition-colors">
                        <ImagePlus className="w-5 h-5" />
                        <span className="text-sm font-bold">Add Cover Image</span>
                      </div>
                    )}
                  </div>
                  <input type="file" className="hidden" onChange={handleThumbnailUpload} disabled={uploading} accept="image/*" />
                </label>
              ) : (
                <div className="relative w-full h-64 rounded-[2rem] overflow-hidden group">
                  <img src={thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="destructive" size="sm" onClick={removeThumbnail} className="rounded-full">
                      <X className="w-4 h-4 mr-2" /> Remove
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Title & Slug */}
            <input
              type="text"
              value={title}
              onChange={(e) => autoGenerateSlug(e.target.value)}
              placeholder="Article Title..."
              className="w-full text-5xl font-bold bg-transparent border-none outline-none placeholder:text-zinc-100 dark:placeholder:text-zinc-800 mb-4 tracking-tight"
            />

            <div className="flex flex-col gap-6 mb-12">
                   <div className="flex items-center gap-2 group border-b border-zinc-100 dark:border-zinc-900 pb-2">
              <Link2 className="h-4 w-4 text-zinc-300" />
              <span className="text-sm text-zinc-400 font-mono">yoursite.com/feed/</span>
              <input 
                value={slug}
                onChange={(e) => updateField("slug",e.target.value) }
                className="flex-1 bg-transparent border-none outline-none text-sm font-mono text-zinc-500 dark:text-zinc-400 focus:text-zinc-900"
                placeholder="url-path"
              />
            </div>

              {/* Tags */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-xs font-medium">
                      #{tag}
                      <button onClick={() => removeTag(tag)}><X className="h-3 w-3" /></button>
                    </span>
                  ))}
                </div>
                <div className="relative flex items-center">
                  <Hash className="absolute left-0 h-3 w-3 text-zinc-300" />
                  <input 
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                    className="bg-transparent border-none outline-none pl-5 text-xs w-24 focus:w-40 transition-all"
                    placeholder="Add tag..."
                  />
                </div>
              </div>
            </div>

               <Editor initialValue={defaultContent} onChange={(content)=>{
updateField("content",content)
               }} />
                
          </div>
        </div>


      </main>
    </div>
  );
};

export default CreatePostForm;