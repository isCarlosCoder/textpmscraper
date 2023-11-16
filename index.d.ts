import { TextProResponse } from './lib';
import { ImageName } from './lib/image-names';
declare class TextPro {
    private create;
    oneTextCreate(url: string, text: string): Promise<TextProResponse>;
    twoTextCreate(url: string, text: string[]): Promise<TextProResponse>;
    generate(name: ImageName, text: string[] | string): Promise<TextProResponse>;
}
declare const textpro: TextPro;
export { textpro, TextProResponse };
