if (process.env.NODE_ENV === 'production') {
  module.exports = require('./app.routes.async'); // eslint-disable-line
} else {
  module.exports = require('./app.routes.sync'); // eslint-disable-line
}
