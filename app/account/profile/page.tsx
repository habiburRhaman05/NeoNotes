import React from 'react';
import Link from 'next/link';
import { headers } from 'next/headers';
import { authServices } from '@/services/auth/authService';

// Simulate a database fetch

export default async function ProfilePage() {
  const user = await authServices.getUserSession();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Header / Cover Image */}
      <div className="h-48 w-full  from-indigo-500 to-purple-600 dark:from-indigo-900 dark:to-purple-900" />


      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-16 sm:-mt-24 sm:flex sm:items-end sm:space-x-5">
          {/* Avatar */}
          <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-2xl ring-4 ring-white dark:ring-zinc-950 bg-white dark:bg-zinc-800 overflow-hidden shadow-xl">
            <img 
              src={user?.image} 
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 truncate">{user?.name}</h1>
              <p className="text-zinc-500 dark:text-zinc-400">{user?.email}</p>
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Link href="/profile/edit" className="inline-flex justify-center px-4 py-2 border border-zinc-300 dark:border-zinc-700 shadow-sm text-sm font-medium rounded-xl text-zinc-700 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all">
                Edit Profile
              </Link>
              <button className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-all">
                Account Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pb-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Overview</h3>
              <div className="mt-4 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-500 dark:text-zinc-400">Member since</span>
                  {/* <span className="text-zinc-900 dark:text-zinc-100 font-medium">{user.joined}</span> */}
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-500 dark:text-zinc-400">Subscription</span>
                  {/* <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">{user.plan}</span> */}
                </div>
              </div>
            </div>
          </div>

          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              <div className="px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Profile Details</h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-xs font-medium text-zinc-500 uppercase">Biography</label>
                  {/* <p className="mt-2 text-zinc-700 dark:text-zinc-300 leading-relaxed">{user.bio}</p> */}
                </div>
                <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800">
                  <label className="block text-xs font-medium text-zinc-500 uppercase">Email Account</label>
                  <p className="mt-2 text-zinc-900 dark:text-zinc-100 font-medium">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}