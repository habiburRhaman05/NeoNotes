"use client";

import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { Loader2, Check, Globe, User, AtSign, Phone, Camera, ArrowLeft, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { authClient } from '@/lib/auth-client';
import { getSession } from 'better-auth/api';

// ১. ভ্যালিডেশন স্কিমা (Phone সহ)
const profileSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  bio: z.string().max(160, 'Bio must be under 160 characters'),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  phone: z.string().min(10, 'Invalid phone number').max(15, 'Too long'),
});

type ProfileValues = z.infer<typeof profileSchema>;

export default function EditProfilePage() {
  const [imagePreview, setImagePreview] = useState("https://api.dicebear.com/7.x/avataaars/svg?seed=Felix");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {user} = authClient.useSession()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
    
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "John Doe",
      phone: "+8801700000000"
    }
  });

  // ইমেজ হ্যান্ডলার
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProfileValues) => {
    try {
   
      await authClient.updateUser({
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&s",
    name: data.name,
    fetchOptions:{
      onSuccess(data) {
         toast.success("Profile Synced", {
        description: "Your information was updated across Synapse network.",
      });
      },
    }
   
})
      
     
    } catch (error) {
      toast.error("Sync Failed", { description: "Connection to auth server lost." });
    }
  };

  return (
    <div className="  bg-[#fafafa] dark:bg-[#050505] text-zinc-900 dark:text-zinc-50 transition-colors duration-500 pb-5">
      
     
   

      <div className="max-w-4xl relative mx-auto px-6">
           <AnimatePresence>
        {isSubmitting && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-white/60 dark:bg-black/60 backdrop-blur-xl "
          >
            <div className="relative">
                <Loader2 className="h-16 w-16 text-indigo-600 animate-spin" />
                <motion.div 
                    initial={{ scale: 0.8 }} animate={{ scale: 1.2 }} transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse' }}
                    className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full" 
                />
            </div>
            <p className="mt-6 text-lg font-black tracking-tighter italic animate-pulse">Syncing with Synapse...</p>
          </motion.div>
        )}
      </AnimatePresence>
        {/* হেডার */}
        <div className="flex flex-col gap-4 mb-12">
            <Link href="/account" className="flex items-center gap-2 text-zinc-500 hover:text-indigo-600 transition-colors text-sm font-bold group">
               <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Account
            </Link>
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-5xl font-[1000] tracking-tighter">Edit Profile</h1>
                    <div className="flex items-center gap-2 mt-2 text-emerald-500">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Verified Synapse Identity</span>
                    </div>
                </div>
            </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          
          {/* ৩. প্রোফাইল পিকচার সেকশন উইথ প্রিভিউ */}
          <section className="p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm flex flex-col items-center sm:flex-row gap-8">
            <div className="relative group">
              <div className="h-32 w-32 rounded-[2.5rem] overflow-hidden ring-4 ring-indigo-500/10 transition-transform group-hover:scale-105">
                <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
              </div>
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 p-3 bg-indigo-600 text-white rounded-2xl shadow-xl hover:bg-indigo-700 transition-all active:scale-90"
              >
                <Camera className="h-5 w-5" />
              </button>
              <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
            </div>
            
            <div className="text-center sm:text-left space-y-2">
              <h3 className="text-xl font-bold tracking-tight">Profile Photo</h3>
              <p className="text-sm text-zinc-500 max-w-[200px]">We recommend an image of at least 400x400px.</p>
            </div>
          </section>

          {/* ৪. ডিটেইলস গ্রিড */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-zinc-400 ml-2">Display Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input {...register("name")} className="w-full pl-12 pr-4 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold" />
              </div>
              {errors.name && <p className="text-[10px] text-red-500 font-bold uppercase ml-2">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-zinc-400 ml-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input {...register("phone")} placeholder="+1 (555) 000-0000" className="w-full pl-12 pr-4 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold" />
              </div>
              {errors.phone && <p className="text-[10px] text-red-500 font-bold uppercase ml-2">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-zinc-400 ml-2">Website</label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input {...register("website")} className="w-full pl-12 pr-4 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-zinc-400 ml-2">Bio</label>
            <textarea 
                {...register("bio")} rows={4} 
                className="w-full p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] focus:ring-2 focus:ring-indigo-500 outline-none font-medium resize-none" 
            />
          </div>

          {/* সেভ বাটন */}
          <div className="flex justify-end pt-6">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="group h-12 px-6 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full text-lg font-[1000] hover:scale-105 transition-all active:scale-95 shadow-xl disabled:opacity-50"
            >
              Update Synapse Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}