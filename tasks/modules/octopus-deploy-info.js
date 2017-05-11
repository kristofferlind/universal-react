const request = require('request-promise');

const stripOptions = url =>
  url.replace(/{[0-9a-zA-Z?,]+}/g, '');

// options = { apiKey, url, projectName }
module.exports = (options) => {
  const requestHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Octopus-ApiKey': options.apiKey
  };
  return {
    getDeployInfo: () =>
      request({
        method: 'GET',
        uri: `${options.url}/api/projects/${options.projectName}/releases`,
        json: true,
        headers: requestHeaders
      })
      .then(releases =>
        request({
          method: 'GET',
          uri: stripOptions(options.url + releases.Items[0].Links.Deployments),
          json: true,
          headers: requestHeaders
        }))
      .then(release =>
        request({
          method: 'GET',
          uri: stripOptions(`${options.url}${release.Items[0].Links.Task}/details`),
          json: true,
          headers: requestHeaders
        }))
  };
};
