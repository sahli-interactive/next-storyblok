import { ISbStoriesParams, getStoryblokApi, StoryblokStory, ISbStoryData } from '@storyblok/react/rsc'
import Logo from '../../components/layout/Logo'
import { draftMode } from 'next/headers'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageStoryblok } from '../../types/component-types-sb'

export type ContentType = PageStoryblok // add more content types if needed

const isDev = process.env.NODE_ENV === 'development'
export const revalidate = isDev ? 0 : 3600

async function fetchData(slug: string) {
  const { isEnabled: isDraft } = draftMode()
  const sbParams: ISbStoriesParams = {
    resolve_links: 'url',
    version: isDev || isDraft ? 'draft' : 'published',
    cv: isDev || isDraft ? Date.now() : undefined,
  }

  const storyblokApi = getStoryblokApi()

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams)
    return { story: data.story as ISbStoryData<ContentType> }
  } catch (error) {
    return { story: null }
  }
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const storyblokApi = getStoryblokApi()
  const { data } = await storyblokApi.get('cdn/links/', {
    version: 'published',
  })

  const paths: { slug: string[] }[] = []
  // create a route for every link
  Object.keys(data.links).forEach(linkKey => {
    // do not create a route for folders and home
    if (
      data.links[linkKey].is_folder ||
      data.links[linkKey].slug === 'home' ||
      data.links[linkKey].slug === 'global'
    ) {
      return
    }

    // get array for slug because of catch all
    const slug = data.links[linkKey].slug
    let splittedSlug = slug.split('/')

    // creates all the routes
    paths.push({ slug: splittedSlug })
  })

  return paths
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params?.slug ? params.slug.join('/') : 'home'
  const { story } = await fetchData(slug)

  if (!story) {
    return {}
  }

  const title = story.content?.seo?.title || story.name
  const description = story.content?.seo?.description
  return {
    metadataBase: new URL('https://your-brand.ch'),
    title: `${title} · Your Brand`,
    description: description,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: title,
      description: description,
      url: `/${story.slug}`,
    },
    twitter: {
      card: 'summary',
      title: title,
      description: description,
    },
  }
}

type Props = {
  params: { slug: string[] }
}

export default async function Home({ params }: Props) {
  const slug = params?.slug ? params.slug.join('/') : 'home'
  const { story } = await fetchData(slug)

  if (!story) {
    return notFound()
  }

  return (
    <>
      <nav className="container w-full mx-auto p-4">
        <div className="flex justify-center">
          <Logo />
        </div>
      </nav>

      <StoryblokStory story={story} />

      <footer className="p-4">Your Footer</footer>
    </>
  )
}
