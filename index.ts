import textProModule, { TextProResponse } from './lib'
import { ImageName } from './lib/image-names'
import { imageMappings } from './lib/image-mappings'

class TextPro {
  private async create(url: string, text: string[]) {
    return await textProModule.textPro(url, text)
  }

  async oneTextCreate(url: string, text: string): Promise<TextProResponse> {
    return await this.create(url, [text])
  }

  async twoTextCreate(url: string, text: string[]): Promise<TextProResponse> {
    return await this.create(url, text)
  }

  async generate(name: ImageName, text: string[] | string) {
    const url = imageMappings[name]

    if (!url) {
      throw new Error(`Doe not exists a image with name: ${name}`)
    }

    if (name == 'pornhub' || name == 'bigsale') {
      if (typeof text == 'string') {
        throw new Error(`This image receive a string array: ${name}`)
      }
    }

    if (typeof text == 'string') {
      text = [text]
    }

    return await this.create(url, text)
  }
}

const textpro = new TextPro()

export {
  textpro,
  TextProResponse
}
