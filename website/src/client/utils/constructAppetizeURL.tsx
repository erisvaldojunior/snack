import querystring from 'query-string';

import constants from '../configs/constants';

type Props = {
  experienceURL: string;
  platform: 'android' | 'ios';
  previewQueue: 'main' | 'secondary';
  autoplay?: boolean;
  screenOnly?: boolean;
  scale?: number;
  payerCode?: string;
  deviceColor?: 'black' | 'white';
  device?: string;
  orientation?: string;
};

export default function constructAppetizeURL({
  experienceURL,
  platform,
  screenOnly = false,
  scale,
  autoplay,
  payerCode,
  previewQueue,
  deviceColor = 'black',
  device,
  orientation,
}: Props) {
  const defaultDevice = platform === 'ios' ? 'iphone8' : 'pixel4';

  const appetizeOptions = {
    screenOnly,
    scale,
    autoplay: !!autoplay,
    embed: true,
    device: device || defaultDevice,
    launchUrl: platform === 'android' ? experienceURL : undefined,
    xdocMsg: true,
    deviceColor,
    xDocMsg: true,
    orientation: orientation || 'portrait',
    debug: true,
    pc: payerCode,
  };

  const appetizeKey = constants.appetize.public_keys[previewQueue][platform];
  const appParams = {
    EXDevMenuDisableAutoLaunch: true,
    EXKernelLaunchUrlDefaultsKey: experienceURL,
    EXKernelDisableNuxDefaultsKey: true,
  };

  return `${constants.appetize.url}/embed/${appetizeKey}?${querystring.stringify(
    appetizeOptions
  )}&params=${encodeURIComponent(JSON.stringify(appParams))}`;
}
