/**
 * Setup file for generate-templates-files script
 */
const { generateTemplateFiles } = require('generate-template-files')

// const config = require('../package.json')

const sharedOptions = {
  defaultCase: '(pascalCase)',
  entry: {
    folderPath: './tools/templates/vue/component/',
  },
  stringReplacers: [
    { question: 'Insert component name', slot: '__component__' },
    { question: 'What category this belongs to?', slot: '__category__' },
  ],
  output: {
    path: './components/__type__(camelCase)/__component__(pascalCase)',
    pathAndFileNameDefaultCase: '(camelCase)',
    overwrite: false,
  },
  // onComplete: (results) => {
  //   console.log(`results`, results);
  // },
}

/**
 * in vs code the typescript linter causes problems with the story.js template.
 * Obfuscating the js extension should hide it.
 */
const ignoreTsError = [
  { slot: '__jsfile__', slotValue: 'js' },
]

generateTemplateFiles([
  {
    option: 'Atom',

    dynamicReplacers: [
      { slot: '__type__', slotValue: 'atoms' },
      ...ignoreTsError,
    ],

    ...sharedOptions,
  },
  {
    option: 'Molecule',

    dynamicReplacers: [
      { slot: '__type__', slotValue: 'molecules' },
      ...ignoreTsError,
    ],

    ...sharedOptions,
  },
  {
    option: 'Organism',

    dynamicReplacers: [
      { slot: '__type__', slotValue: 'organisms' },
      ...ignoreTsError,
    ],

    ...sharedOptions,
  },
  {
    option: 'Template',

    dynamicReplacers: [
      { slot: '__type__', slotValue: 'templates' },
      ...ignoreTsError,
    ],

    ...sharedOptions,
  },
  {
    option: 'Page',

    dynamicReplacers: [
      { slot: '__type__', slotValue: 'pages' },
      ...ignoreTsError,
    ],

    ...sharedOptions,
  },
])
