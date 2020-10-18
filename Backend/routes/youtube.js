var { google } = require('googleapis');
var youtube = google.youtube('v3');

require('dotenv').config();

const apiKey = process.env.YOUTUBE_API_KEY;

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getChannelByUserName', async function(req, res, next) {
  const { username } = req.query;
  try {
    const { data } = await
      youtube.channels.list({
        key: apiKey,
        part: 'snippet',
        forUsername: username,
        maxResults: 1,
      });
    if (data.pageInfo.totalResults === 0) {

    }
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

async function searchList(username) {
  try {
    const { data } = await
      youtube.search.list({
        key: apiKey,
        part: 'snippet'
      });
  } catch (err) {

  }
}




// get the statistics of the livestream
router.get('/getLiveStreamStat', async function(req, res, next) {
  const { username } = req.query;

  try {
    const { data } = await ;
      youtube.liveBroadcasts.statistics({

      })
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});



/*
  Typical get template

router.get('/', async function(req, res, next) {
  // const { _ } = req.query;

  try {
    const { data } = await
      youtube.({
        key: apiKey,

      });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
*/

module.exports = router;