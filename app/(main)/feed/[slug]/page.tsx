import { Button } from "@/components/ui/button"
import { feedServices } from "@/services/feed/feedServices"
import {
  Bookmark,
  Calendar,
  Clock,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
} from "lucide-react"
import dayjs from "dayjs"
import BackButton from "@/components/shared/BakcButton"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { formatDate } from "@/helpers/formatDate"

export const revalidate = 60 

type PageProps = {
  params: {
    slug: string
  }
}

async function getPost(slug: string) {
  const res = await feedServices.getFeedDetailsBySlug(slug)
  if (!res?.success || !res.data) return null
  return res.data
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) return { title: "Post not found", robots: { index: false } }

  const date = formatDate(post.createdAt)
  const description = post.content?.replace(/<[^>]*>?/gm, '').slice(0, 150); // HTML ট্যাগ সরিয়ে মেটা ডেসক্রিপশন

  return {
    title: `${post.title} | ${post.author.name}`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      images: post.thumbnail ? [{ url: post.thumbnail }] : [],
    },
  }
}

export default async function BlogDetailsPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

    
  const {
    title,
    content,
    thumbnail,
    tags,
    viwes,
    createdAt,
    author,
    comment,
  } = post

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-0">
      <article className="w-full">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-12">
          <BackButton text="Back to feed" />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <Bookmark className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Header Section */}
        <header className="space-y-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag: string) => (
              <span key={tag} className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-600/10 text-indigo-600 border border-indigo-600/20">
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl font-[1000] tracking-tighter leading-[1.1] text-zinc-900 dark:text-zinc-50">
            {title}
          </h1>

          <div className="flex items-center justify-between py-8 border-y border-zinc-100 dark:border-zinc-800/50">
            <div className="flex items-center gap-4">
              <img
                src={author?.image || "https://github.com/shadcn.png"}
                alt={author?.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-zinc-100 dark:ring-zinc-800"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">{author?.name}</span>
                  <span className="text-zinc-300 dark:text-zinc-700">•</span>
                  <button className="text-sm font-bold text-indigo-600 hover:underline">Follow</button>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-500 font-medium">
                  <span className="flex items-center gap-1"><Clock size={14}/> 8 min read</span>
                  <span className="flex items-center gap-1"><Calendar size={14}/> {dayjs(createdAt).format("MMM D, YYYY")}</span>
                </div>
              </div>
            </div>
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-2xl font-black">{viwes.toLocaleString()}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Total Views</span>
            </div>
          </div>
        </header>

        {/* Main Image */}
        {thumbnail && (
          <div className="my-12 aspect-[16/9] rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-zinc-200 dark:ring-zinc-800">
            <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Blog Content Rendering */}
        <div className="mt-12">
          <div 
            className="prose prose-lg dark:prose-invert max-w-none 
            prose-headings:font-black prose-headings:tracking-tighter 
            prose-img:rounded-[2rem] prose-img:border prose-img:border-zinc-100 dark:prose-img:border-zinc-800
            prose-li:marker:text-indigo-600
            "
          >
            {/* HTML কন্টেন্ট এখানে রেন্ডার হবে */}
            <div 
              dangerouslySetInnerHTML={{ __html: content }} 
              className="content-renderer"
            />
          </div>
        </div>

        {/* Sticky Interaction Bar */}
        <div className="sticky bottom-10 mt-20 mx-auto w-fit px-8 py-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl rounded-full border border-zinc-200 dark:border-zinc-800 shadow-2xl flex items-center gap-10">
          <button className="flex items-center gap-2 group">
            <div className="p-2 rounded-full group-hover:bg-rose-50 dark:group-hover:bg-rose-900/20 transition-colors">
              <Heart className="w-5 h-5 group-hover:text-rose-500 transition-colors" />
            </div>
            <span className="text-sm font-bold">2.4k</span>
          </button>

          <button className="flex items-center gap-2 group">
             <div className="p-2 rounded-full group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors">
              <MessageCircle className="w-5 h-5 group-hover:text-indigo-500 transition-colors" />
            </div>
            <span className="text-sm font-bold">{comment?.length || 0}</span>
          </button>

          <div className="h-6 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
          
          <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </article>
    </div>
  )
}