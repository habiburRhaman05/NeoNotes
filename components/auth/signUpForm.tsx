"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { authClient } from "@/lib/auth-client"; // আপনার কনফিগার করা পাথ অনুযায়ী
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"; // লোডার আইকন

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
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button 
          type="button" 
          onClick={() => handleSocialSignIn("google")}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-white dark:bg-zinc-800 px-4 py-2.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100 shadow-sm ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>
        <button 
          type="button" 
          onClick={() => handleSocialSignIn("github")}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-white dark:bg-zinc-800 px-4 py-2.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100 shadow-sm ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all"
        >
          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
          GitHub
        </button>
      </div>

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