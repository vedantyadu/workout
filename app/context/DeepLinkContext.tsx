import { createContext, useEffect, useState } from 'react'
import * as Linking from 'expo-linking'

export type DeepLinkContextType = {
  currentURL: string | null
  setCurrentURL: React.Dispatch<React.SetStateAction<string | null>>
}

export const DeepLinkContext = createContext<DeepLinkContextType | undefined>(
  undefined
)

export function DeepLinkProvider({ children }: { children: React.ReactNode }) {
  const [currentURL, setCurrentURL] = useState<string | null>(null)

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url) {
        setCurrentURL(url)
      }
    })

    const subscription = Linking.addEventListener('url', ({ url }) => {
      setCurrentURL(url)
    })

    return () => {
      subscription.remove()
    }
  }, [])

  useEffect(() => {
    if (currentURL) {
      console.log(Linking.parse(currentURL))
    }
  }, [currentURL])

  return (
    <DeepLinkContext.Provider value={{ currentURL, setCurrentURL }}>
      {children}
    </DeepLinkContext.Provider>
  )
}
