"use client"
import { useApiMutation } from '@/hooks/useApiMutation';
import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import {  useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';


const signInSchema = z.object({
    email:z.string().email('Invalid email'),
    password:z.string("password is requried").min(6,'password min 6 char'),
})

type SignInValues = z.infer<typeof signInSchema>;



export default function SignInForm() {
    const router = useRouter()

      const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver:zodResolver(signInSchema)
  })


  const signInMutation = useApiMutation({
      method:"POST",
      endpoint:"/api/auth/sign-in/email",
      
  })

   const onSubmit = async (data:SignInValues) => {
  
    // await signInMutation.mutateAsync(data)
    //  router.push("/account/profile")

    await authClient.signIn.email({
      email: data.email,
      password: data.password,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Login Successful!");
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Login failed");
        },
      },
    });

  };



  

  return (


      
          <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Email address</label>
              <input type="email" placeholder="name@company.com" className="mt-1 block w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-600 transition-all outline-none" {...register("email")} />
              {
                errors.email && <p className='text-red-800'>{errors.email.message}</p>
              }
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
                <a href="#" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Forgot password?</a>
              </div>
              <input type="password" placeholder="••••••••" className="mt-1 block w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-600 transition-all outline-none" {...register("password")} />
                {
                errors.password && <p className='text-red-800'>{errors.password.message}</p>
              }
            </div>
            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all active:scale-95">
             {signInMutation.isPending ? <Loader2 className='animate-spin'/> :  "Sign in"}
            </button>
          </form>

  );
}