/// <reference types="node" />
export interface TextProResponse {
    status: boolean;
    error?: string;
    url?: string;
    file_name?: string;
}
declare function textPro(url: string, text: string | string[], imageFilePath?: string): Promise<TextProResponse>;
declare function imageToBuffer(data: {
    url?: string;
}): Promise<Buffer>;
declare const textProModule: {
    imageToBuffer: typeof imageToBuffer;
    textPro: typeof textPro;
};
export default textProModule;
