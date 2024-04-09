#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const fileName = process.argv[2];

const schema = JSON.parse(fs.readFileSync(path.resolve(__dirname, fileName), 'utf8'));

const generateContent = (schema) => {
  let result = Object.keys(schema.schema).map(key => ({
    name: key,
    type: schema.schema[key].type
  }));
  return result.map(blok => {
    switch (blok.type) {
      case 'text':
        return `<p> {blok.`+blok.name+`}</p>`
      case 'bloks':
        return `{blok.`+blok.name+` && blok.` +blok.name+ `.map(nestedBlok => <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />)}`
      default:
        return `<p>{blok}</p>`
    }
  })

}
schema.components.forEach((componentSchema) => {
  let componentName = componentSchema.name;
  componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);

  let className = componentName+'Props'

  let filePath = componentSchema.is_nestable
    ? `./components/nestables/${componentName}.tsx`
    : `./components/content_types/${componentName}.tsx`;

  let directory = path.dirname(filePath);
  if (!fs.existsSync(directory)){
    fs.mkdirSync(directory);
  }

  if(fs.existsSync(filePath)) {
    console.log(`File ${componentName}.tsx already exists at ${filePath}. Skipping.`);
    return;
  }

  const component = `
    import { StoryblokComponent, storyblokEditable } from '@storyblok/react/rsc';
    import { ${componentName}Storyblok } from '../../types/component-types-sb';
    
    type ${className} = {
      blok: ${componentName}Storyblok
    }
    
    const ${componentName} = ({ blok }: ${className}) => (
      <div className="py-2 bg-gray-100" {...storyblokEditable(blok)}>
        <div>
          ` + generateContent(componentSchema).join('\n') +`
        </div>
      </div>
    )
    
    export default ${componentName};
  `;
  fs.writeFileSync(path.resolve('./', filePath), component);
  console.log(`File ${componentName}.tsx created at ${filePath}`);


});

