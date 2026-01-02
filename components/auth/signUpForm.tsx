"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { authClient } from "@/lib/auth-client"; // আপনার কনফিগার করা পাথ অনুযায়ী
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"; // লোডার আইকন
import SocialLoginProvider from './SocialLoginProvider';

const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignUpValues = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  });

  // ১. ইমেইল সাইন-আপ লজিক
  const onSubmit = async (data: SignUpValues) => {
    await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Account created successfully! Redirecting...");
          router.push("/account/profile");
        },
        onError: (ctx) => {
          // সার্ভার থেকে আসা স্পেসিফিক এরর মেসেজ দেখাবে
          toast.error(ctx.error.message || "Something went wrong. Please try again.");
        },
      },
    });
  };

  // ২. সোশ্যাল সাইন-আপ লজিক (Google/GitHub)
  const handleSocialSignIn = async (provider: "google" | "github") => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/dashboard",
    });
  };

  return (
    <div className="bg-white dark:bg-zinc-900 py-8 px-4 shadow-2xl border border-zinc-200 dark:border-zinc-800 sm:rounded-2xl sm:px-10">
      
      {/* Social Sign Up */}
      <SocialLoginProvider/>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-200 dark:border-zinc-800"></div></div>
        <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="px-2 bg-white dark:bg-zinc-900 text-zinc-500 uppercase">Or use email</span></div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Full Name</label>
          <div className="mt-1 relative">
            <input 
              type="text" 
              placeholder="John Doe" 
              {...register("name")}
              disabled={isSubmitting}
              className={`block w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border ${errors.name ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-700'} rounded-xl text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-600 transition-all outline-none disabled:opacity-50`} 
            />
          </div>
          {errors.name && <p className='mt-1 text-xs text-red-500 font-medium'>{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Email address</label>
          <input 
            type="email" 
            placeholder="name@example.com" 
            {...register("email")}
            disabled={isSubmitting}
            className={`mt-1 block w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border ${errors.email ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-700'} rounded-xl text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-600 transition-all outline-none disabled:opacity-50`} 
          />
          {errors.email && <p className='mt-1 text-xs text-red-500 font-medium'>{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            {...register("password")}
            disabled={isSubmitting}
            className={`mt-1 block w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border ${errors.password ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-700'} rounded-xl text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-600 transition-all outline-none disabled:opacity-50`} 
          />
          {errors.password && <p className='mt-1 text-xs text-red-500 font-medium'>{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Confirm Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            {...register("confirmPassword")}
            disabled={isSubmitting}
            className={`mt-1 block w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border ${errors.confirmPassword ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-700'} rounded-xl text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-600 transition-all outline-none disabled:opacity-50`} 
          />
          {errors.confirmPassword && <p className='mt-1 text-xs text-red-500 font-medium'>{errors.confirmPassword.message}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>
    </div>
  );
}