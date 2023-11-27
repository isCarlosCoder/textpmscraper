# textpmscraper

This module provides an interface to interact with the TextPro service, allowing the creation of online text effects. It includes methods to generate images with single or double text.

## Content table
1.  [Instalation](#instalation)
2.  [Usage](#usage)
3.  [Methods](#methods)
      - [oneTextCreate](#onetextcreate)
      - [twoTextCreate](#twotextcreate)
      - [generate](#generate)
          - [Name values and parameter types](#name-values-and-parameter-types)
4.  [Returns](#returns)
4.  [Final Notices](#final-notices)

## Instalation

```bash
npm install textpmscraper
```
or

```bash
yarn add textpmscraper
```

## Usage

``` javascript
const { textpro } = require('textpmscraper'); // import { textpro } from 'textpmscraper'

// create a image with one text
textpro.oneTextCreate('https://textpro.me/online-3d-alien-text-effect-generator-1146.html', 'test')
  .then(result => {
    console.log(result);
  });

// create a image with two text
textpro.twoTextCreate('https://textpro.me/pornhub-style-logo-online-generator-free-977.html', [
  'other',
  'test'
]).then(result => {
  console.log(result);
});

// create a image with name and one text
textpro.generate('nail', 'test').then(result => {
  console.log(result)
})

// create a image with name and two text
textpro.generate('bigsale', ['other', 'test']).then(result => {
  console.log(result)
})
```

## Methods

### oneTextCreate

`oneTextCreate(url: string, text: string): Promise<TextProResponse>`

Generates an image with a single text in the TextPro style.

- url: Specific URL of the TextPro style.
- text: The text to be displayed in the image.


### twoTextCreate

`twoTextCreate(url: string, text: string[]): Promise<TextProResponse>`

- Generates an image with two texts in the TextPro style.

- url: Specific URL of the TextPro style.
- texts: An array containing the two texts to be displayed in the image.


### generate

`generate(name: ImageName, text: string[] | string): Promise<TextProResponse>`

- Generates a image with two or single text in TextPro style.

- name: Specific image name if the TextPro style.
- text: The text or an text array to be displayed in the image.

#### Name values and parameter types:

|  name           | parameter type  |
|-----------------|-----------------|
|nail             |string           |
|thunder          |string           |
|moss             |string           |
|black            |string           |
|cyber            |string           |
|shadow           |string           |
|iphone15         |string           |
|bigsale          |[string, string] |
|pokemon          |string           |
|friday           |string           |
|naruto           |stirng           |
|cartoon          |string           |
|liquid           |string           |
|cage             |string           |
|metal            |string           |
|party            |string           |
|bornpink         |[string, string] |
|typhography      |string           |
|neonstyle        |string           |
|blackpink        |stirng           |
|slicedtext       |string           |
|batman           |string           |
|neonlightonbrick |string           |
|black2           |string           |
|demon            |string           |
|magma            |string           |
|neonlight        |string           |
|glitch           |string           |
|neondevil        |string           |
|blackpink2       |string           |
|glitcheffect     |[string, string] |
|neongalaxy       |string           |
|pornhub          |[string, string] |
|marvelstudio     |[string, string] |
|matrix           |string           |
|thunderneon      |string           |
|neon             |string           |
|roadwarning      |string           |
|bokeh            |string           |
|advancedglow     |string           |
|thewall          |string           |
|ice              |string           |


## Returns

Each of the methods shown above returns an object containing:

- `status`: Boolean for testing
- `url`: The URL of the generated image
- `file_name`: Automatically generated name for the image

```javascript
{
  status: true,
  url: 'https://textpro.me/images/user_image/2023/11/65565eb576066.jpg',
  file_name: '65565eb576066.jpg'
}
```


## Final Notices

Please note that URLs may change over time. I will try to keep this library updated as much as possible, but feel free to fork it and continue the work on your own.

- Keep an eye on the URLs at [TextPro]('https://textpro.me') in case any of the patterns change.
- This package was created and tested solely by me, there may be bugs. Feel free to modify it if needed.
