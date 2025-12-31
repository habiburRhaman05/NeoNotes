
// import { useApiQuery } from "./useApiQuery";

// export const useUser = () => {


//   // ১. ইউজার সেশন ফেচ করা (Get User)
// const { data ,status,isLoading,isError} = useApiQuery(["profile-data"],"/api/v1/user/profile");
// console.log(data);
// const user = data.user

// // //   // ২. লগআউট মিউটেশন
// //   const { mutate: logout } = useMutation({
// //     mutationFn: authServices.logout,
// //     onSuccess: () => {
// //       // ক্যাশ থেকে সব ডেটা মুছে ফেলা (নিরাপত্তার জন্য)
// //       queryClient.clear(); 
// //       router.push("/sign-in");
// //     },
// //   });

//   return {
//     user:data,
//     isLoading,
//     isAuthenticated: !!user && !isError,
//     // logout,
//   };
// };