import React from 'react';
//components
import TheBackground from '../shared/components/TheBackground';
import Content from './components/Content';

const AboutPage = () => {
  return (
    <div className="wrapper">
      <TheBackground backgroundName='bgFoggy'/>
      <Content />
    </div>
   )
 }


 export default AboutPage;
