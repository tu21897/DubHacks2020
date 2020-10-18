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
    let { data } = await
      youtube.channels.list({
        key: apiKey,
        part: 'snippet',
        forUsername: username,
        maxResults: 5,
      });
    if (data.pageInfo.totalResults === 0) {
      data = await searchAll(username); //debug
    }
    if (data !== undefined) {
      res.status(200).send(data);
    } else {
      throw 'Could not find any data.';
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

async function searchList(username) {
  try {
    const { data } = await
      youtube.search.list({
        key: apiKey,
        part: 'snippet',
        eventType: 'live',
        maxResults: 25,
        q: username,
        type: 'video'
      });
    return data;
  } catch (err) {
    return undefined;
  }
}

// search channel
async function searchAll(username) {
  try {
    const { data } = await
      youtube.search.list({
        key: apiKey,
        part: 'snippet',
        maxResults: 25,
        q: username,
        type: 'channel'
      });
    return data;
  } catch (err) {
    return undefined;
  }
}


/*

// get the statistics of the livestream
router.get('/getLiveStreamStat', async function(req, res, next) {
  const { username } = req.query;

  try {
    const { data } = await ;
      youtube.liveBroadcasts.list({
        key:apiKey,
        part: 'snippet'

      })
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

*/


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