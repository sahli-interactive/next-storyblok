import React from 'react'
import {sbEditable} from '@storyblok/storyblok-editable'

const Feature = ({blok}) => (
  <div className="py-2 bg-gray-100" {...sbEditable(blok)}>
    <h1 className="uppercase font-medium text-2xl py-8 text-center">
      { blok.name }
    </h1>
  </div>
)

export default Feature
