"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { Loader2, User, Phone, Camera, ArrowLeft, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { authClient } from '@/lib/auth-client';

const profileSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  phone: z.string().min(10, 'Invalid phone number').max(15, 'Too long'),
});

type ProfileValues = z.infer<typeof profileSchema>;

export default function EditProfilePage() {
  const { data: session } = authClient.useSession();
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      phone: "+8801700000000"
    }
  });

  // সেশন লোড হলে ফর্ম আপডেট করার জন্য
  useEffect(() => {
    if (session?.user) {
      reset({
        name: session.user.name,
        phone: "+8801700000000" // আপনি চাইলে এটি সেশন থেকে নিতে পারেন যদি ডাটাবেসে থাকে
      });
      setImagePreview(session.user.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix");
    }
  }, [session, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProfileValues) => {
    try {
      await authClient.updateUser({
        name: data.name,
        // এখানে imagePreview সরাসরি পাঠানো হয়েছে, আপনি চাইলে আগে S3 বা Cloudinary তে আপলোড করে URL পাঠাতে পারেন
        image: imagePreview, 
        fetchOptions: {
          onSuccess: () => {
            toast.success("Profile Synced", {
              description: "Your information was updated across Synapse network.",
            });
          },
          onError: (ctx) => {
            toast.error("Update Failed", { description: ctx.error.message });
          }
        }
      });
    } catch (error) {
      toast.error("Sync Failed", { description: "Connection to auth server lost." });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-zinc-900 dark:text-zinc-50 transition-colors duration-500 pb-10">
      <div className="max-w-4xl relative mx-auto px-6 pt-20">
        
        {/* লোডিং এনিমেশন */}
        <AnimatePresence>
          {isSubmitting && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/60 dark:bg-black/60 backdrop-blur-xl"
            >
              <div className="relative">
                <Loader2 className="h-16 w-16 text-indigo-600 animate-spin" />
                <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full animate-pulse" />
              </div>
              <p className="mt-6 text-lg font-black tracking-tighter italic">Syncing with Synapse...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* হেডার পার্ট */}
        <div className="flex flex-col gap-4 mb-12">
          <Link href="/account" className="flex items-center gap-2 text-zinc-500 hover:text-indigo-600 transition-colors text-sm font-bold group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Account
          </Link>
          <div>
            <h1 className="text-5xl font-[1000] tracking-tighter">Edit Profile</h1>
            <div className="flex items-center gap-2 mt-2 text-emerald-500">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Verified Synapse Identity</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          
          {/* ইমেজ সেকশন */}
          <section className="p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm flex flex-col items-center sm:flex-row gap-8">
            <div className="relative group">
              <div className="h-32 w-32 rounded-[2.5rem] overflow-hidden ring-4 ring-indigo-500/10 shadow-inner">
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
            
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold tracking-tight">Profile Photo</h3>
              <p className="text-sm text-zinc-500">Change your avatar across the Synapse network.</p>
            </div>
          </section>

          {/* ইনপুট ফিল্ডস */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-zinc-400 ml-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input {...register("name")} className="w-full pl-12 pr-4 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold transition-all" />
              </div>
              {errors.name && <p className="text-[10px] text-red-500 font-bold ml-2 uppercase">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-zinc-400 ml-2">Phone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input {...register("phone")} className="w-full pl-12 pr-4 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold transition-all" />
              </div>
              {errors.phone && <p className="text-[10px] text-red-500 font-bold ml-2 uppercase">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="h-14 px-10 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full text-lg font-black hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-50"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}