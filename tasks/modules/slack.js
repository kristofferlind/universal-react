const request = require('request-promise');

module.exports = (settings) => {
  const username = settings.username;
  const channel = settings.channel;
  function sendMessage(text, attachments, icon) {
    if (!(settings.username && settings.webhook)) {
      throw new Error('You need to specify username and webhook in options');
    }
    return request({
      uri: settings.webhook,
      method: 'POST',
      body: { text, username, channel, icon_emoji: icon, attachments, link_names: 1 },
      json: true
    });
  }

  return {
    sendMessage
  };
};
