var { ApiClient } = require('twitch');
var { ClientCredentialsAuthProvider } = require('twitch-auth');

require('dotenv').config();

const clientId = process.env.TWITCH_CLIENT_ID;
const clientSecret = process.env.TWITCH_SECRET;
const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
const apiClient = new ApiClient({ authProvider });

var express = require('express');
var router = express.Router();


/* GET Testing purposes */
router.get('/', async function(req, res, next) {
  var { username } = req.query;
  res.status(200).send(await isStreamLive(username));
});

/* GET user info based on username */
router.get('/getUserByName', async function(req, res, next) {
  const { username } = req.query;
  try {
    const user = await apiClient.helix.users.getUserByName(username);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/getUsersByIds', async function(req, res, next) {
  const { ids } = req.query;
  let array = JSON.parse("[" + ids + "]");
  try {
    const users = await apiClient.helix.users.getUsersByIds(array);
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/getGameById', async function(req, res, next) {
  const { id } = req.query;
  try {
    const games = await apiClient.helix.games.getGameById(id);
    res.status(200).send(games);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* GET info on whether a stream is live based on username */
router.get('/isStreamLive', async function(req, res, next) {
  const { username } = req.query;
  try {
    const user = await apiClient.helix.users.getUserByName(username);
    let isLive = await user.getStream() !== null;
    res.status(200).send(isLive);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/getStreamByUserName', async function(req, res, next) {
  const { username } = req.query;
  try {
    const stream = await apiClient.helix.streams.getStreamByUserName(username);
    res.status(200).send(stream);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/goToStream', async function(req, res, next) {
  const { username } = req.query;
  res.redirect('https://www.twitch.tv/' + username);
});

/* GET search multiple streams based on filter */
router.get('/getStreams', async function(req, res, next) {
  const { filter } = req.query;
  try {
    let { data } = await apiClient.helix.streams.getStreams(filter);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;