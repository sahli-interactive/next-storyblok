import { FC } from 'react'
import { render } from 'storyblok-rich-text-react-renderer-ts'
import { StoryblokComponent } from '@storyblok/react'

interface RichTextRendererProps {
  text: any
}

export const RichTextRenderer: FC<RichTextRendererProps> = ({ text }) => {
  return (
    <>
      {render(text, {
        defaultBlokResolver: (name, props) => (
          <StoryblokComponent blok={{ component: name, ...props }} />
        ),
      })}
    </>
  )
}
