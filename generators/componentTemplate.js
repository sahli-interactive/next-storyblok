import React from 'react'
import DynamicComponent from '../components/dynamic-component'
import {sbEditable} from '../lib/storyblok'

export default ({blok}) => {
  return (
    <div {...Editable(blok)}>
      This is a component you created with the CLI. Change its code in the components/ folder.

      {/*
        Use this code if you want to render a text field:

        {blok.YOUR_TEXT_FIELD}
      */}

      {/*
        Use this code if you want to render a block field:

        {blok.YOUR_BLOCK_FIELD.map((blok) =>
          (<DynamicComponent blok={blok} key={blok._uid}/>)
        )}
      */}
    </div>
  )
}
