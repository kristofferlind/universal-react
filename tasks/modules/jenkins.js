const request = require('request-promise');

module.exports = (settings) => {
  const buildInfoURL = `${settings.buildURL}/api/json`;
  const requestOptions = (csrf) => {
    const options = {
      headers: {
        Authorization: `Basic ${new Buffer(`${settings.apiUser}:${settings.apiKey}`).toString('base64')}`
      },
      json: true
    };
    if (csrf && csrf.crumbRequestField) {
      options.headers[csrf.crumbRequestField] = csrf.crumb;
    }
    return options;
  };


  function getCSRFToken() {
    const csrfUrl = `${settings.apiURL}/crumbIssuer/api/json`;
    return request.get(csrfUrl, requestOptions());
  }

  function getBuildInfo() {
    return getCSRFToken()
      .then(csrf => request.get(buildInfoURL, requestOptions(csrf)));
  }

  return {
    getBuildInfo
  };
};
