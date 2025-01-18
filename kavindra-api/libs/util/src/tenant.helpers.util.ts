import {NodeEnvironment} from '../config/environment';

export const getUrlFromNodeEnv = (
  nodeEnv: NodeEnvironment,
  subdomain: string,
) => {
  if (nodeEnv === 'production') {
    return `https://${subdomain}.kavindra.io`;
  } else if (nodeEnv === 'staging') {
    return `https://${subdomain}.staging.kavindra.io`;
  } else if (nodeEnv === 'development') {
    return `http://${subdomain}.local.kavindra.io`;
  }
  // Otherwise assume test
  return `https://${subdomain}.test.kavindra.io`;
};
