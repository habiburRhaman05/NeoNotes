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

export const revalidate = 60 // ✅ ISR (60 seconds)

type PageProps = {
  params: {
    id: string
  }
}

/* =========================
   Data Fetcher (Single Source)
========================= */
async function getPost(id: number) {
  const res = await feedServices.getFeedDetailsById(id)

  if (!res?.success || !res.data) return null
  return res.data
}

/* =========================
   SEO (VERY IMPORTANT)
========================= */
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
const {id} = await params
console.log(id);

  const post = await getPost(Number(id))


  if (!post) {
    return {
      title: "Post not found",
      robots: { index: false },
    }
  }

  const date = formatDate(post.createdAt)

  return {
    title: `${post.title} |${post.author.name} | ${date}`,
    description: post.content?.slice(0, 150),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/post/${id}`,
    },
    openGraph: {
      title: post.title,
      description: post.content?.slice(0, 150),
      type: "article",
      images: post.thumbnail
        ? [
            {
              url: post.thumbnail,
              width: 1200,
              height: 630,
            },
          ]
        : [],
      publishedTime: post.createdAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.content?.slice(0, 150),
      images: post.thumbnail ? [post.thumbnail] : [],
    },
  }
}

/* =========================
   Page
========================= */
export default async function BlogDetailsPage({ params }: PageProps) {
  const {id} = await params
  const post = await getPost(Number(id))

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
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2 flex gap-16">
      
      <article className="flex-1 w-full">

        {/* Top Bar */}
        <div className="flex items-center justify-between mb-10">
          <BackButton text="Back to feed" />

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bookmark className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Header */}
        <header className="space-y-6">
          <h1 className="text-3xl md:text-5xl font-black leading-tight">
            {title}
          </h1>

          <div className="flex items-center justify-between py-6 border-y">
            <div className="flex items-center gap-3">
              <img
                src={author?.image || "https://github.com/shadcn.png"}
                alt={author?.name}
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{author?.name}</span>
                  <button className="text-xs font-bold text-indigo-600">
                    Follow
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> 8 min read
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {dayjs(createdAt).format("MMM D, YYYY")}
                  </span>
                </div>
              </div>
            </div>

            <span className="hidden sm:block text-xs">
              {viwes.toLocaleString()} views
            </span>
          </div>
        </header>

        {/* Content */}
        <div className="mt-10">
          {thumbnail && (
            <div className="aspect-video rounded-3xl overflow-hidden mb-10">
              <img
                src={"https://images.pexels.com/photos/1557652/pexels-photo-1557652.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Tags */}
          <div className="flex gap-2 mb-6">
            {tags?.map((tag: string) => (
              <span
                key={tag}
                className="text-xs font-bold px-3 py-1 rounded-full bg-zinc-800"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Body */}
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap">
              {content}
            </div>
          </div>
        </div>

        {/* Bottom Interaction Bar */}
        <div className="sticky bottom-8 mt-12 mx-auto w-fit px-6 py-3 rounded-full flex items-center gap-8">
          <button className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            <span className="text-sm font-bold">Like</span>
          </button>

          <button className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-bold">
              {comment?.length || 0}
            </span>
          </button>

          <Share2 className="w-5 h-5" />
        </div>
      </article>
    </div>
  )
}

