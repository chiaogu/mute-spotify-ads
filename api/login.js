const querystring = require('querystring');
const { CLIENT_ID } = require('./_constants');

module.exports = (req, res) => {
  const qs = querystring.stringify({
    client_id: CLIENT_ID,
    redirect_uri: `https://${req.headers.host}/api/login-callback`,
    response_type: 'code',
    scope: 'streaming user-read-email user-read-private'
  });
  res.writeHead(301, { Location: `https://accounts.spotify.com/authorize?${qs}` });
  res.end();
}