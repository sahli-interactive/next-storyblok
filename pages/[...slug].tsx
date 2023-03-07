import { StoryblokComponent, useStoryblokState, getStoryblokApi, ISbStoryParams, ISbStoryData } from "@storyblok/react";
import { FC } from "react";

import Logo from "../components/layout/Logo"
import SeoMetaTags from "../components/layout/SeoMetaTags"
import { PageStoryblok } from "../types/component-types-sb";

interface PageProps {
    story: ISbStoryData<PageStoryblok>
    links: [{name: string, slug: string}]
    preview: boolean
}

const Page: FC<PageProps> = ({ story, preview }) => {
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
            </header>

            <StoryblokComponent blok={story.content} />

            <footer>
                Your Footer
            </footer>
        </>
    )
}

export default Page

export async function getStaticProps({ params, preview = false}: { params: {slug: string[]}, preview: boolean }) {
    const storyblokApi = getStoryblokApi()
    preview = process.env.NODE_ENV === 'development' || preview
    // home is the default slug for the homepage in Storyblok
    let slug = params?.slug ? params.slug.join("/") : "home";
    // load the published content outside of the preview mode
    let sbParams: ISbStoryParams = {
        version: 'published',
        resolve_links: 'url',
    }

    if (preview) {
        // load the draft version inside of the preview mode
        sbParams.version = 'draft'
        sbParams.cv = Date.now()
    }
    const storyQuery = storyblokApi.get(`cdn/stories/${slug}`, sbParams)

    const responses = await Promise.all([storyQuery])

    return {
        props: {
            story: responses[0].data ? responses[0].data.story : null,
            key: slug,
            preview,
        },
        revalidate: 3600, // revalidate every hour
    }
}

export async function getStaticPaths() {
    const storyblokApi = getStoryblokApi()
    // get all links from Storyblok
    const { data } = await storyblokApi.get("cdn/links/");

    let paths: { params: { slug: string[] }}[] = [];
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
