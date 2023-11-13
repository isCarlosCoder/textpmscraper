import axios, { AxiosResponse } from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import cheerio from 'cheerio';
import cookie from 'cookie';

interface UploadResponse {
  uploaded_file: string;
  thumb_file: string;
  icon_file: string;
}

interface BasicDataResponse {
  is_tow_text: boolean;
  need_image: boolean;
  cookies: string;
  data: {
    token: string | undefined;
    submit: string | undefined;
    build_server: string | undefined;
    build_server_id: string | undefined;
  };
}

export interface TextProResponse {
  status: boolean;
  error?: string;
  url?: string;
  file_name?: string;
}

async function uploadFileImage(
  referer: string,
  filePath: string,
  cookies: string
): Promise<string> {
  const formData = new FormData();
  formData.append('file', fs.createReadStream(filePath));

  const response: AxiosResponse<UploadResponse> = await axios({
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

async function downloadFile(url: string): Promise<Buffer> {
  const response: AxiosResponse<Buffer> = await axios({
    url: url,
    responseType: 'arraybuffer',
  });

  return Buffer.from(response.data);
}

interface PostResponse {
  data: any;
}

async function post(url: string, params: any, cookies: string): Promise<PostResponse> {
  const response: AxiosResponse<PostResponse> = await axios.get(url, {
    params: params,
    headers: {
      Accept: '*/*',
      Cookie: cookies,
      'Accept-Language': 'en-US,en;q=0.9',
    },
  });

  return response.data;
}

async function getBasicData(url: string): Promise<BasicDataResponse> {
  const headers = { Referer: 'https://textpro.me/' };
  const response: any = await axios.get(url, { headers: headers });

  let cookies = response.headers['set-cookie']
    .join(',')
    .split(',')
    .map((cookieString: string) => cookie.parse(cookieString))
    .reduce((acc: any, curr: any) => ({ ...acc, ...curr }), {});

  cookies = {
    PHPSESSID: cookies.PHPSESSID,
    __cfduid: cookies['__cfduid'] || '',
  };

  const $ = cheerio.load(response.data);

  return {
    is_tow_text: !!$('#text-1').attr('name'),
    need_image: !!$('#image-0').attr('name'),
    cookies: Object.entries(cookies)
      .map(([key, value]) => cookie.serialize(key, value as string))
      .join('; '),
    data: {
      token: $('#token').attr('value'),
      submit: $('#submit').attr('value'),
      build_server: $('#build_server').attr('value'),
      build_server_id: $('#build_server_id').attr('value'),
    },
  };
}

function isValidUrl(url: string): boolean {
  return /^https:\/\/textpro\.me\/.+\.html$/.test(url);
}

async function textPro(url: string, text: string | string[], imageFilePath?: string): Promise<TextProResponse> {
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
  } else {
    text = [text.join(' ')];
  }

  if (basicData.need_image && !imageFilePath) {
    return {
      status: false,
      error: 'need image',
    };
  }

  const formData = new FormData();

  if (basicData.need_image) {
    const image = await uploadFileImage(url, imageFilePath!, basicData.cookies);
    formData.append('image[]', image);
  }

  for (const textItem of text) {
    formData.append('text[]', textItem);
  }

  for (const [key, value] of Object.entries(basicData.data)) {
    formData.append(key, value);
  }

  const response: AxiosResponse<string> = await axios({
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

  const postResponse: any = await post('https://textpro.me/effect/create-image', JSON.parse(match[1]), basicData.cookies);

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

async function imageToBuffer(data: { url?: string }): Promise<Buffer> {
  return await downloadFile(data.url || '');
}

const textProModule = {
  imageToBuffer: imageToBuffer,
  textPro: textPro,
};

export default textProModule;
