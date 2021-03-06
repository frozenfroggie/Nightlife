import React from 'react';
import reactIcon from '../../../../assets/react.png';
import reduxIcon from '../../../../assets/redux.png';
import nodeIcon from '../../../../assets/nodejs.png';
import mongoIcon from '../../../../assets/mongo.png';
import yelpIcon from '../../../../assets/yelp.png';
import googleMapsIcon from '../../../../assets/googleMaps.png';
import FontAwesome from 'react-fontawesome';

const Content = () => {
  return (
    <div className="aboutContent">
      <div className="about">
        <h1> About Nightlife </h1>
        <h3> Nightlife is a fullstack web application created
        to help You choose best sunday night bars near your liveplace
        or during trip to new places. After authentication You can declare
        your desire of going to specified bar and see who also want
        to go there tonight </h3>
        <br/>
        <hr style={{height: 1}}/>
        <br/>
        <h1> About technologies </h1>
        <h3> Aplication was created with modern web technologies and great external APIs listed below </h3>
        <div>
          <img src={reactIcon} className="icon" />
          <img src={reduxIcon} className="icon" />
          <img src={nodeIcon} className="icon" />
          <img src={mongoIcon} className="icon" />
          <img src={yelpIcon} className="icon" />
          <img src={googleMapsIcon} className="icon" />
        </div>
        <br/>
        <hr style={{height: 1}} />
        <br/>
        <h1> About author </h1>
        <h3> Designed & Coded by FrozenFroggie 2017 &reg; All rights reserved </h3>
        <div className="social">
          <a target="_blank" href='https://github.com/frozenfroggie'><FontAwesome name="github" size="2x" /></a>
          <a target="_blank" href='https://www.linkedin.com/in/jakub-wojtyra-07b783129/'><FontAwesome name="linkedin-square" size="2x" /></a>
          <a target="_blank" href='https://codepen.io/frozenfroggie/'><FontAwesome name="codepen" size="2x" /></a>
          <a target="_blank" href='https://www.freecodecamp.org/frozenfroggie'><FontAwesome name="free-code-camp" size="2x" /></a>
        </div>
      </div>
    </div>
  )
}

export default Content;
