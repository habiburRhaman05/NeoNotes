import React from 'react'

const layout = ({children,users}:{
    children:React.ReactNode
    users:React.ReactNode
}) => {
  return (
    <div>
        {/* {children} */}
        {users}
    </div>
  )
}

export default layout