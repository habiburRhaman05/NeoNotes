export type User = {
  id: string;
  name?: string;
  image?: string | null;
  email?: string ;
  role:"USER" | "ADMIN";
};
