"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const LinkTab = () => {
  const pathname = usePathname()

  const tabs = [
    { name: "For You", href: "/feed", key: "for-you" },
    { name: "Featured", href: "/feed/following", key: "following" },
  ]

  return (
    <div className="flex items-center gap-6 border-b border-zinc-800 mb-6 relative">
      {tabs.map(tab => {
        const isActive = pathname === tab.href

        return (
          <Link
            key={tab.key}
            href={tab.href}
            className={`
              relative pb-3 font-semibold text-md transition-colors
              ${isActive ? "text-zinc-100 after:absolute after:left-0 after:-bottom-[1px] after:h-[2px] after:w-full after:bg-zinc-100" : "text-zinc-400 hover:text-zinc-100"}
            `}
          >
            {tab.name}
          </Link>
        )
      })}
    </div>
  )
}

export default LinkTab
