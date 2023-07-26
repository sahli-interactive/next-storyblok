import { apiPlugin, storyblokInit } from '@storyblok/react/rsc'
import { ReactElement } from 'react'
import StoryblokProvider from '../components/StoryblokProvider'
import '../styles/globals.scss'

storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN,
  use: [apiPlugin],
})

type RootLayoutProps = {
  children: ReactElement
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <StoryblokProvider>
      <html lang="de-CH">
        <body>{children}</body>
      </html>
    </StoryblokProvider>
  )
}
