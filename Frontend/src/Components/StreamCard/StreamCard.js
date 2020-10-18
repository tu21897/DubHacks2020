import React from "react";

import './StreamCard.css';

import Card from 'react-bootstrap/Card'

function StreamCard(props) {
  let { user_name, title, viewer_count, thumbnail_url, profile_image_url, game_name } = props;

  const cardInfoTest = [
    {
      preview:
        thumbnail_url,
      simage:
        profile_image_url,
      gname: game_name,
      title: title,
      name: user_name,
      viewcount: viewer_count
    }
  ];

  const renderCard = (card, index) => {
    return (
      <Card className="card" key={index} >
        <a href={"https://www.twitch.tv/" + user_name}><Card.Img className="preview" variant="top" src={card.preview} /></a>
        <Card.Img className="simage" src={card.simage} />
        <Card.Title className="title">{card.title}</Card.Title>
        <Card.Text className="name">{card.name}</Card.Text>
        <Card.Text className="viewcount">{card.viewcount} viewers</Card.Text>
        <Card.Text className="gname">{card.gname} </Card.Text>
      </Card>
    );
  };

  return (cardInfoTest.map(renderCard));
}
export default StreamCard;








































































