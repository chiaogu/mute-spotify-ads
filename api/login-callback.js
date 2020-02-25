const util = require('util');
const qs = require('querystring');
const post =  util.promisify(require('request').post);
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } = require('./_constants');

module.exports = async (req, res) => {
  const { body: { access_token, refresh_token } } = await post({
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: req.query.code || null,
      redirect_uri: REDIRECT_URL,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      'Access-Control-Allow-Origin': '*'
    },
    json: true
  });
  res.writeHead(301, { Location: `https://mute-spotify-ads.chiaogu.now.sh?${qs.stringify({ refresh_token })}` });
  res.end();
}