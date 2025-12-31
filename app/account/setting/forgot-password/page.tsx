"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// 1. Define the Schema
const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    // Simulate API call to send reset link
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Reset link sent to:', data.email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Simple Key/Lock Icon */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
          <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>
        
        <h2 className="mt-6 text-center text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          {isSubmitted ? 'Check your email' : 'Forgot password?'}
        </h2>
        <p className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">
          {isSubmitted 
            ? "We've sent a password reset link to your email address." 
            : "No worries, we'll send you reset instructions."}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-zinc-900 py-8 px-4 shadow-xl border border-zinc-200 dark:border-zinc-800 sm:rounded-2xl sm:px-10">
          
          {!isSubmitted ? (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    placeholder="name@company.com"
                    {...register("email")}
                    className={`block w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border ${
                      errors.email ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-700'
                    } rounded-xl text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-600 transition-all outline-none`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.email.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all active:scale-95 disabled:opacity-70"
              >
                {isSubmitting ? 'Sending link...' : 'Reset Password'}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
              >
                Didn't receive the email? Click to try again
              </button>
            </div>
          )}

          <div className="mt-6 text-center">
            <a href="/sign-in" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}