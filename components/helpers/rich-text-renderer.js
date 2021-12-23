import React from 'react'
import {render} from 'storyblok-rich-text-react-renderer'
import DynamicComponent from "../dynamic-component";

const RichTextRenderer = ({text}) => {
    return (
        <>
            {render(text, {
                defaultBlokResolver: (name, props) => (
                    <DynamicComponent blok={{component: name, ...props}} />
                )
            })}
        </>
    )
}

export default RichTextRenderer
