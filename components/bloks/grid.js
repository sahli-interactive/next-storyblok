import React from 'react'
import DynamicComponent from '../dynamic-component'
import {sbEditable} from '@storyblok/storyblok-editable'

const Grid = ({blok}) => {
  return (
    <ul className="flex py-8" {...sbEditable(blok)}>
      {blok.columns.map(blok => (
        <li key={blok._uid} className="flex-auto px-6"><DynamicComponent blok={blok}  /></li>
      ))}
    </ul>
  )
}

export default Grid
