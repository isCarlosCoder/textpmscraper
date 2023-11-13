import { TextProResponse } from './lib';
declare class TextPro {
    private create;
    oneTextCreate(url: string, text: string): Promise<TextProResponse>;
    twoTextCreate(url: string, text: string[]): Promise<TextProResponse>;
}
declare const textpro: TextPro;
export { textpro };
