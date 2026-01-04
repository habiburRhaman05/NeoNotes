"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const BakcButton = ({ text, path }: { text: string; path?: string }) => {
  const router = useRouter();
  const handleBack = () => {
    if (path) {
      router.push(path);
    } else {
      router.back();
    }
  };
  return (
    <Button
      onClick={handleBack}
      variant="ghost"
      className="gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-full"
    >
      <ArrowLeft className="w-4 h-4" />
      {text}
    </Button>
  );
};

export default BakcButton;
