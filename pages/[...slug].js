import {StoryblokComponent, useStoryblokState, getStoryblokApi} from "@storyblok/react";

import Logo from '../components/layout/logo'
import Navigation from "../components/layout/navigation"
import SeoMetaTags from "../components/layout/seo-meta-tags"

export default function Page({story, links, preview}) {
    if (preview) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        story = useStoryblokState(story);
    }

    if (!story?.content) {
        return <div className="container w-screen h-screen p-4 flex justify-center items-center">Lade...</div>;
    }

    return (
        <>
            <SeoMetaTags story={story} />

            <header className="container w-full mx-auto py-4 px-4">
                <div className="flex justify-center">
                    <Logo/>
                </div>
                <Navigation links={links} currentStory={story}/>
            </header>

            <StoryblokComponent blok={story.content} />

            <footer>
                Your Footer
            </footer>
        </>
    )
}

export async function getStaticProps({query, params, preview = false}) {
    const storyblokApi = getStoryblokApi()
    preview = process.env.NODE_ENV === 'development' || preview
    // home is the default slug for the homepage in Storyblok
    let slug = params?.slug ? params.slug.join("/") : "home";
    // load the published content outside of the preview mode
    let sbParams = {
        version: 'published',
        resolve_links: 'url'
    }

    if (preview) {
        // load the draft version inside of the preview mode
        sbParams.version = 'draft'
        sbParams.cv = Date.now()
    }
    let storyQuery = storyblokApi.get(`cdn/stories/${slug}`, sbParams)
    let linksQuery = storyblokApi.get("cdn/links/")

    const responses = await Promise.all([storyQuery, linksQuery])
    let links = []

    Object.keys(responses[1].data.links).forEach((linkKey) => {
        // do not create a route for folders and home
        if (responses[1].data.links[linkKey].is_folder || responses[1].data.links[linkKey].slug === "home") {
            return;
        }

        links.push(responses[1].data.links[linkKey])
    })

    links.sort((a, b) => a.position - b.position)

    return {
        props: {
            story: responses[0].data ? responses[0].data.story : null,
            links,
            key: slug,
            preview,
        },
        revalidate: 3600, // revalidate every hour
    }
}

export async function getStaticPaths() {
    const storyblokApi = getStoryblokApi()
    // get all links from Storyblok
    let {data} = await storyblokApi.get("cdn/links/");

    let paths = [];
    // create a routes for every link
    Object.keys(data.links).forEach((linkKey) => {
        // do not create a route for folders and home
        if (data.links[linkKey].is_folder || data.links[linkKey].slug === "home") {
            return;
        }

        // get array for slug because of catch all
        const slug = data.links[linkKey].slug;
        let splittedSlug = slug.split("/");

        // creates all the routes
        paths.push({params: {slug: splittedSlug}});
    });

    return {
        paths: paths,
        fallback: 'blocking',
    };
}
