"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { Loader2, Check, Globe, User, AtSign } from 'lucide-react'; // For professional icons
import { toast } from 'sonner';


// 1. Validation Schema
const profileSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  bio: z.string().max(160, 'Bio must be under 160 characters'),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
});

type ProfileValues = z.infer<typeof profileSchema>;

export default function EditProfilePage() {
 

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "John Doe",
      username: "johndoe",
      bio: "Product Designer based in New York.",
      website: "https://johndoe.com",
    }
  });

  // Dummy Update Action
  const onSubmit = async (data: ProfileValues) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      console.log("Updated Data:", data);

      // Trigger shadcn success toast
    
      toast("Profile updated", {
     description: "Your changes have been saved successfully.",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })

    } catch (error) {
    //   toast({
    //     variant: "destructive",
    //     title: "Error",
    //     description: "Failed to update profile. Please try again.",
    //   });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      {/* Ensure Toaster is in layout.tsx or here */}
  
      
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">Settings</h1>
            <p className="text-zinc-500 mt-1">Update your photo and personal details.</p>
          </div>
          <Link 
            href="/profile" 
            className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Cancel
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          
          {/* Avatar Section */}
          <section className="flex flex-col sm:flex-row sm:items-center gap-8 pb-10 border-b border-zinc-100 dark:border-zinc-800/50">
            <div className="relative h-24 w-24">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                alt="Avatar" 
                className="h-24 w-24 rounded-full object-cover ring-4 ring-zinc-50 dark:ring-zinc-900 shadow-sm"
              />
              <div className="absolute bottom-0 right-0 p-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full shadow-sm">
                 <Check className="h-3 w-3 text-indigo-600" />
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Your profile picture</h4>
              <div className="flex gap-3">
                <button type="button" className="px-4 py-2 text-xs font-bold bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:opacity-90 transition-opacity">
                  Upload new
                </button>
                <button type="button" className="px-4 py-2 text-xs font-bold text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                  Remove
                </button>
              </div>
            </div>
          </section>

          {/* Form Fields */}
          <section className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                  <User className="h-4 w-4 opacity-50" /> Display Name
                </label>
                <input 
                  {...register("name")}
                  className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 transition-all outline-none shadow-sm"
                />
                {errors.name && <p className="text-xs font-medium text-red-500 mt-1">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                  <AtSign className="h-4 w-4 opacity-50" /> Username
                </label>
                <input 
                  {...register("username")}
                  className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 transition-all outline-none shadow-sm"
                />
                {errors.username && <p className="text-xs font-medium text-red-500 mt-1">{errors.username.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Bio</label>
              <textarea 
                rows={4}
                {...register("bio")}
                className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 transition-all outline-none resize-none shadow-sm"
                placeholder="Write a few sentences about yourself..."
              />
              <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                 {errors.bio ? <span className="text-red-500">{errors.bio.message}</span> : <span />}
                 <span>{160} Characters Max</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                <Globe className="h-4 w-4 opacity-50" /> Website
              </label>
              <input 
                {...register("website")}
                placeholder="https://yourwebsite.com"
                className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 transition-all outline-none shadow-sm"
              />
              {errors.website && <p className="text-xs font-medium text-red-500 mt-1">{errors.website.message}</p>}
            </div>
          </section>

          {/* Action Buttons */}
          <div className="pt-10 flex items-center justify-end gap-4 border-t border-zinc-100 dark:border-zinc-800/50">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="relative flex items-center justify-center gap-2 min-w-[140px] px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md hover:shadow-indigo-500/20 transition-all active:scale-95 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}