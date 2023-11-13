# textpm-scraper

This module provides an interface to interact with the TextPro service, allowing the creation of online text effects. It includes methods to generate images with single or double text.

## Instalation

```bash
npm install textpm-scraper
```

## Usage

### javascript

``` javascript
const { textpro } = require('textpm-scraper/src');

textpro.oneTextCreate('https://textpro.me/online-3d-alien-text-effect-generator-1146.html', 'test')
  .then(result => {
    console.log(result);
  });

textpro.twoTextCreate('https://textpro.me/pornhub-style-logo-online-generator-free-977.html', [
  'other',
  'test'
])
  .then(result => {
    console.log(result);
  });
```

### typescript

``` typescript
import { textpro } from 'textpm-scraper/src';

textpro.oneTextCreate('https://textpro.me/online-3d-alien-text-effect-generator-1146.html', 'test')
  .then(result => {
    console.log(result);
  });

textpro.twoTextCreate('https://textpro.me/pornhub-style-logo-online-generator-free-977.html', [
  'other',
  'test'
])
  .then(result => {
    console.log(result);
  });

```

### Methods

`oneTextCreate(url: string, text: string): Promise<TextProResponse>`

Generates an image with a single text in the TextPro style.

- url: Specific URL of the TextPro style.
- text: The text to be displayed in the image.


`twoTextCreate(url: string, text: string[]): Promise<TextProResponse>`

- Generates an image with two texts in the TextPro style.

- url: Specific URL of the TextPro style.
- texts: An array containing the two texts to be displayed in the image.
