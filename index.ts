import textProModule, { TextProResponse } from './lib'

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
}

const textpro = new TextPro()
export { textpro }
