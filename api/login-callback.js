const util = require('util');
const post =  util.promisify(require('request').post);
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } = require('./constants');

module.exports = async (req, res) => {
  const { body } = await post({
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: req.query.code || null,
      redirect_uri: REDIRECT_URL,
      grant_type: 'authorization_code'
    },
    headers: {
      Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
    },
    json: true
  });
  res.json(body);
}