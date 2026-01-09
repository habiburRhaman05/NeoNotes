
export default function BlogDetailsSkeleton() {
  return (
    <article className="flex-1 w-full lg:mx-0 animate-pulse">
      
      {/* ১. টপ অ্যাকশন বাটন স্কেলিটন */}
      <div className="flex items-center justify-between mb-10">
        <div className="h-9 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 bg-zinc-100 dark:bg-zinc-800/50 rounded-full" />
          <div className="h-9 w-9 bg-zinc-100 dark:bg-zinc-800/50 rounded-full" />
          <div className="h-9 w-9 bg-zinc-100 dark:bg-zinc-800/50 rounded-full" />
        </div>
      </div>

      {/* ২. হেডলাইন এবং মেটা স্কেলিটন */}
      <header className="space-y-6">
        {/* Title bars */}
        <div className="space-y-3">
          <div className="h-10 md:h-12 w-full bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
          <div className="h-10 md:h-12 w-[85%] bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
          <div className="h-10 md:h-12 w-[60%] bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
        </div>
        
        {/* Author info section */}
        <div className="flex items-center justify-between py-6 border-y border-zinc-100 dark:border-zinc-800/60">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-3 w-12 bg-indigo-100 dark:bg-indigo-900/30 rounded" />
              </div>
              <div className="h-3 w-32 bg-zinc-100 dark:bg-zinc-800/50 rounded" />
            </div>
          </div>
        </div>
      </header>

      {/* ৩. কন্টেন্ট এরিয়া স্কেলিটন */}
      <div className="mt-10">
        {/* Featured Image placeholder */}
        <div className="aspect-video w-full rounded-3xl bg-zinc-200 dark:bg-zinc-800 mb-10" />

        {/* Text Body placeholders */}
        <div className="space-y-6">
          {/* Blockquote placeholder */}
          <div className="h-6 w-3/4 bg-zinc-100 dark:bg-zinc-800/50 rounded italic mx-auto md:mx-0" />
          
          {/* Paragraphs */}
          <div className="space-y-3">
            <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded" />
            <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded" />
            <div className="h-4 w-[90%] bg-zinc-100 dark:bg-zinc-800/50 rounded" />
          </div>

          {/* Subheading placeholder */}
          <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg pt-4" />

          <div className="space-y-3">
            <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded" />
            <div className="h-4 w-[95%] bg-zinc-100 dark:bg-zinc-800/50 rounded" />
            <div className="h-4 w-[40%] bg-zinc-100 dark:bg-zinc-800/50 rounded" />
          </div>
        </div>
      </div>

      {/* ৪. বটম ইন্টারেকশন বার স্কেলিটন */}
      <div className="sticky bottom-8 mt-12 mx-auto w-fit bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 px-8 py-4 rounded-full flex items-center gap-8 shadow-sm">
        <div className="h-5 w-12 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
        <div className="h-5 w-12 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
        <div className="h-5 w-5 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
      </div>
    </article>
  );
}