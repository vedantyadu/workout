export type DurationType = {
  hours: string
  minutes: string
}

export type ActivityPostDataType = {
  activity: string | null
  duration: DurationType
  description: string
  images: string[]
  location: string | null
}

export type UpdatePostDataType = {
  description: string
  images: string[]
  location: string | null
}
