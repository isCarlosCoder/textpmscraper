"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const form_data_1 = __importDefault(require("form-data"));
const cheerio_1 = __importDefault(require("cheerio"));
const cookie_1 = __importDefault(require("cookie"));
async function uploadFileImage(referer, filePath, cookies) {
    const formData = new form_data_1.default();
    formData.append('file', fs_1.default.createReadStream(filePath));
    const response = await (0, axios_1.default)({
        url: 'https://textpro.me/upload',
        method: 'POST',
        headers: {
            Accept: '*/*',
            'Accept-Language': 'en-US,en;q=0.9',
            Cookie: cookies,
            ...formData.getHeaders(),
            Referer: referer,
        },
        data: formData,
    });
    const imageData = {
        image: response.data.uploaded_file,
        image_thumb: response.data.thumb_file,
        icon_file: response.data.icon_file,
        x: 0,
        y: 0,
        width: 300,
        height: 300,
        rotate: 0,
        scaleX: 1,
        scaleY: 1,
        thumb_width: 300,
    };
    return JSON.stringify(imageData);
}
async function downloadFile(url) {
    const response = await (0, axios_1.default)({
        url: url,
        responseType: 'arraybuffer',
    });
    return Buffer.from(response.data);
}
async function post(url, params, cookies) {
    const response = await axios_1.default.get(url, {
        params: params,
        headers: {
            Accept: '*/*',
            Cookie: cookies,
            'Accept-Language': 'en-US,en;q=0.9',
        },
    });
    return response.data;
}
async function getBasicData(url) {
    const headers = { Referer: 'https://textpro.me/' };
    const response = await axios_1.default.get(url, { headers: headers });
    let cookies = response.headers['set-cookie']
        .join(',')
        .split(',')
        .map((cookieString) => cookie_1.default.parse(cookieString))
        .reduce((acc, curr) => ({ ...acc, ...curr }), {});
    cookies = {
        PHPSESSID: cookies.PHPSESSID,
        __cfduid: cookies['__cfduid'] || '',
    };
    const $ = cheerio_1.default.load(response.data);
    return {
        is_tow_text: !!$('#text-1').attr('name'),
        need_image: !!$('#image-0').attr('name'),
        cookies: Object.entries(cookies)
            .map(([key, value]) => cookie_1.default.serialize(key, value))
            .join('; '),
        data: {
            token: $('#token').attr('value'),
            submit: $('#submit').attr('value'),
            build_server: $('#build_server').attr('value'),
            build_server_id: $('#build_server_id').attr('value'),
        },
    };
}
function isValidUrl(url) {
    return /^https:\/\/textpro\.me\/.+\.html$/.test(url);
}
async function textPro(url, text, imageFilePath) {
    if (!isValidUrl(url)) {
        return {
            status: false,
            error: 'invalid text pro url',
        };
    }
    const basicData = await getBasicData(url);
    if (typeof text === 'string') {
        text = [text];
    }
    if (basicData.is_tow_text) {
        if (text.length !== 2) {
            return {
                status: false,
                error: 'need 2 text []',
            };
        }
    }
    else {
        text = [text.join(' ')];
    }
    if (basicData.need_image && !imageFilePath) {
        return {
            status: false,
            error: 'need image',
        };
    }
    const formData = new form_data_1.default();
    if (basicData.need_image) {
        const image = await uploadFileImage(url, imageFilePath, basicData.cookies);
        formData.append('image[]', image);
    }
    for (const textItem of text) {
        formData.append('text[]', textItem);
    }
    for (const [key, value] of Object.entries(basicData.data)) {
        formData.append(key, value);
    }
    const response = await (0, axios_1.default)({
        url: url,
        method: 'POST',
        headers: {
            Accept: '*/*',
            'Accept-Language': 'en-US,en;q=0.9',
            Cookie: basicData.cookies,
            ...formData.getHeaders(),
        },
        data: formData.getBuffer(),
    });
    const match = /<div.*?id="form_value".+>(.*?)<\/div>/.exec(response.data);
    if (!match || !match[1]) {
        return {
            status: false,
            error: 'invalid url or request',
        };
    }
    const postResponse = await post('https://textpro.me/effect/create-image', JSON.parse(match[1]), basicData.cookies);
    if (!postResponse.success) {
        return {
            status: false,
            error: 'request failed',
        };
    }
    return {
        status: true,
        url: 'https://textpro.me' + postResponse.fullsize_image,
        file_name: postResponse.image_code,
    };
}
async function imageToBuffer(data) {
    return await downloadFile(data.url || '');
}
const textProModule = {
    imageToBuffer: imageToBuffer,
    textPro: textPro,
};
exports.default = textProModule;
//# sourceMappingURL=index.js.map