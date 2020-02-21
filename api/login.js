const querystring = require('querystring');
const { CLIENT_ID, REDIRECT_URL } = require('./constants');

module.exports = (req, res) => {
  const qs = querystring.stringify({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URL,
    response_type: 'code',
    scope: 'user-read-private user-read-email'
  });
  res.writeHead(301, { Location: `https://accounts.spotify.com/authorize?${qs}` });
  res.end();
}