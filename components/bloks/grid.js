import React from 'react'
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const Grid = ({blok}) => {
  return (
    <ul className="flex py-8" {...storyblokEditable(blok)}>
      {blok.columns.map(blok => (
        <li key={blok._uid} className="flex-auto px-6"><StoryblokComponent blok={blok}  /></li>
      ))}
    </ul>
  )
}

export default Grid
