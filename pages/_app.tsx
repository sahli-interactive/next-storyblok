import '../styles/globals.css'
import { storyblokInit, apiPlugin } from '@storyblok/react'
import { ComponentType, FC } from 'react'
import feature from '../components/bloks/Feature'
import teaser from '../components/bloks/Teaser'
import page from '../components/bloks/Page'
import grid from '../components/bloks/Grid'

storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN,
  // bridge: true,
  use: [apiPlugin],
  components: {
    page,
    teaser,
    feature,
    grid,
  },
})

interface AppProps {
  Component: ComponentType
  pageProps: any
}

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default MyApp
