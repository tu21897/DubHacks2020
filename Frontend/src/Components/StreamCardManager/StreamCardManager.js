import React, { useEffect, useState } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SearchBar from '../SearchBar/SearchBar';
import StreamCard from '../StreamCard/StreamCard';

function StreamCardManager() {
  let [cards, setCards] = useState([]);
  let [search, setSearch] = useState('');

  useEffect(() => {
    fetchTwitchData();
  }, [search]);

  async function fetchTwitchData() {
    await fetch('/twitch/getStreams' + search)
    .then(checkStatus)
    .then(resp => resp.json())
    .then(data => {
      let newCards = [];
      for (let i = 0; i < data.length; i++) {
        let thumbnail = data[i]._data.thumbnail_url.replace("\{width\}", 286);
        thumbnail = thumbnail.replace("\{height\}", 143);
        newCards.push({
          platform: "twitch",
          thumbnail_url: thumbnail,
          user_name: data[i]._data.user_name,
          title: data[i]._data.title,
          viewer_count: data[i]._data.viewer_count,
          user_id: data[i]._data.user_id,
          game_id: data[i]._data.game_id
        });
      }
      return newCards;
    })
    .then(async (newCards) => {
      let ids= []
      for (let i = 0; i < newCards.length; i++) {
        ids.push(newCards[i].user_id);
      }
      await fetch('/twitch/getUsersByIds?ids=' + ids)
      .then(checkStatus)
      .then(resp => resp.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          newCards[i].profile_image_url = data[i]._data.profile_image_url;
        }
      })
      .catch(handleError);
      return newCards;
    })
    .then(async (newCards) => {
      for (let i = 0; i < newCards.length; i++) {
        await fetch('/twitch/getGameById?id=' + newCards[i].game_id)
        .then(checkStatus)
        .then(resp => resp.json())
        .then(data => {
          newCards[i].game_name = data._data.name;
        })
        .catch(handleError);
      }
      return newCards;
    })
    .then((newCards) => {setCards(newCards)})
    .catch(handleError);
  }

  return (
    <Container>
      <SearchBar/>
      <Row>
        {cards.map((json, i) => { return (
            <Col xs={12} md={6} lg={3} key={i} className="d-flex justify-content-center mb-4">
              <StreamCard className="" {... json} />
            </Col> ) }
            )}
      </Row>
    </Container>
  );
}

export default StreamCardManager;

function checkStatus(response) {
  if (response.ok) {
    return response;
  }
  throw Error("Error in request: " + response.statusText);
}

function handleError(err) {
  console.log(err)
}