import { apiPlugin, storyblokInit } from '@storyblok/react/rsc'
import { ReactElement } from 'react'
import StoryblokProvider from '../components/StoryblokProvider'
import '../styles/globals.scss'

storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN,
  use: [apiPlugin],
})

export const metadata = {
  title: 'Storyblok and Next.js 13',
  description: 'A Next.js and Storyblok app using app router',
}

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
