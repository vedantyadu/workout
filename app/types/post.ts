export type newPostDataType = {
  activity: string | null
  duration: {
    hours: string
    minutes: string
  }
  description: string
  images: string[]
  location: string | null
}

export type PostContextType = {
  newPostData: newPostDataType
  setNewPostData: React.Dispatch<React.SetStateAction<newPostDataType>>
}
