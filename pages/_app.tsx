import '../styles/globals.css'
import { storyblokInit, apiPlugin } from '@storyblok/react'
import feature from '../components/bloks/Feature'
import teaser from '../components/bloks/Teaser'
import page from '../components/bloks/Page'
import grid from '../components/bloks/Grid'
import { ComponentType } from 'react'

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

type AppProps = {
  Component: ComponentType
  pageProps: any
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default MyApp
