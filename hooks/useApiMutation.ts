// hooks/use-api-mutation.ts
import { httpRequest } from "@/config/axios/axios";
import { useMutation, useQueryClient, UseMutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";

type MutationMethod = "POST" | "PUT" | "PATCH" | "DELETE";

interface MutationConfig {
  method: MutationMethod;
  endpoint: string;
  invalidateKeys?: string[];
  successMessage?: string;
}

// এখানে TContext = unknown যোগ করা হয়েছে যা টাইপ এরর দূর করবে
export function useApiMutation<TData = any, TVariables = any, TContext = unknown>(
  config: MutationConfig,
  options?: UseMutationOptions<TData, Error, TVariables, TContext> | any
) {
  const queryClient = useQueryClient();
  const { method, endpoint, invalidateKeys, successMessage } = config;

  return useMutation<TData, Error, TVariables, TContext>({
    mutationFn: async (variables) => {
      const response = await httpRequest({
        url: endpoint,
        method,
        data: variables,
      });
      return response.data;
      //  await new Promise((reslove)=> setTimeout(reslove,3000))
      //  return true
    },
    onSuccess: (data:any, variables, context) => {
      toast.success(data.message || "Action completed successfully");

      if (invalidateKeys) {
        invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey:[key] });
        });
      }

      // এখন এটি সঠিকভাবে টাইপ পাবে
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error: any, variables, context) => {
      const message = error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(message, {
        description: "Error Code: " + (error.response?.status || "Unknown"),
      });

      options?.onError?.(error, variables, context);
    },
    ...options,
  });
}