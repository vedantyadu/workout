import { newPostDataType, PostContextType } from '@/types/post'
import { createContext, useContext, useState } from 'react'

const PostContext = createContext<PostContextType | undefined>(undefined)

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [newPostData, setNewPostData] = useState<newPostDataType>({
    activity: null,
    duration: {
      hours: '',
      minutes: '',
    },
    description: '',
    images: []
  })

  return (
    <PostContext.Provider value={{ newPostData, setNewPostData }}>
      {children}
    </PostContext.Provider>
  )
}

export function usePostContext() {
  return useContext(PostContext) as PostContextType
}
