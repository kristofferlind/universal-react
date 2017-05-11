const isNode = typeof window === 'undefined';
const cookies = {};

// parse cookies, used to enable serverside cookies
const init = (cookieData) => {
  if (cookieData) {
    const rawCookies = cookieData.split('; ');
    rawCookies.forEach((rawCookie) => {
      const cookieParts = rawCookie.split('=');
      const cookieName = cookieParts[0];
      const cookieValue = cookieParts[1];
      cookies[cookieName] = cookieValue;
    });
  }
};

const read = (cookieName) => {
  if (Object.keys(cookies).length === 0 && !isNode) {
    init(document.cookie);
  }
  return cookies[cookieName] || '';
};

const destroy = (cookieName) => {
  if (!isNode) {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
  delete cookies[cookieName];
};

export default {
  init,
  read,
  destroy
};
