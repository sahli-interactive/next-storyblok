import React from 'react'
import {render} from 'storyblok-rich-text-react-renderer'
import {StoryblokComponent} from "@storyblok/react"

const RichTextRenderer = ({text}) => {
    return (
        <>
            {render(text, {
                defaultBlokResolver: (name, props) => (
                    <StoryblokComponent blok={{component: name, ...props}} />
                )
            })}
        </>
    )
}

export default RichTextRenderer
