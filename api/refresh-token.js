const util = require('util');
const post =  util.promisify(require('request').post);
const { CLIENT_ID, CLIENT_SECRET } = require('./constants');

module.exports = async (req, res) => {
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}` },
    form: {
      grant_type: 'refresh_token',
      refresh_token: req.query.refresh_token
    },
    json: true
  };

  const { body: { access_token } } = await post(authOptions);
  res.json({
    'access_token': access_token
  });
}