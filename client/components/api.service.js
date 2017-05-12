import fetch from 'isomorphic-fetch';
import cookieService from './cookie.service';

const request = (method, url, data) => new Promise((resolve, reject) => {
  const requestOptions = {
    method,
    headers: {
      Accept: 'application/json',
      Authorization: cookieService.read('token'),
      'Content-Type': 'application/json'
    }
  };
  if (data) {
    requestOptions.body = JSON.stringify(data);
  }
  fetch(url, requestOptions)
    .then((response) => {
      if (response.status === 401 || response.status === 403) {
        cookieService.destroy('token');
      }
      if (!response.ok) {
        response.json()
          .then(reject)
          .catch(reason => reject(reason));
      } else {
        response.text().then((text) => {
          const responseData = text ? JSON.parse(text) : {};
          resolve(responseData);
        });
      }
    })
    .catch(reason => reject(reason));
});

const methods = {
  get: url => request('GET', url),
  post: (url, data) => request('POST', url, data),
  put: (url, data) => request('PUT', url, data),
  delete: url => request('DELETE', url)
};

// only use request manager in browser
if (process.env.BROWSER) {
  const requestManager = require('./request-manager').default; // eslint-disable-line
  methods.post = (url, data) => requestManager(() => request('POST', url, data));
  methods.put = (url, data) => requestManager(() => request('PUT', url, data));
  methods.delete = url => requestManager(() => request('DELETE', url));
}

export default methods;
