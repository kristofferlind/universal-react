const isNode = typeof window === 'undefined';
const baseURL = 'http://127.0.0.1:9000';
let apiURL = '/api';

if (isNode) {
  apiURL = `${baseURL}/api`;
}

export const apiEndpoints = {
  ME: `${apiURL}/user/me`,
  TODO: `${apiURL}/todo`,
  SOCKET: baseURL
};

export default {
  apiEndpoints
};
