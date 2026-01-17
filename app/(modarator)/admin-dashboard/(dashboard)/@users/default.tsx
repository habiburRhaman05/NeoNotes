import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>page

      <h1>
        <Link href={"/admin-dashboard/users"}>go users</Link>
      </h1>
    </div>
  )
}

export default page