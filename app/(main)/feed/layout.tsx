
import FeedRightSidebar from '@/components/pages/feed/FeedRightContent'
import React, { ReactNode } from 'react'

const FeedLayout = ({children}:{children:ReactNode}) => {
  return (
  <div>
        {/* <FeedFilter/> */}
   <div className='flex '>
          <div className="flex-1">
            {children}
          </div>
           <FeedRightSidebar/>
   </div>
      </div>
  )
}

export default FeedLayout