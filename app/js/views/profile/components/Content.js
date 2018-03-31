import React from 'react';
import FontAwesome from 'react-fontawesome';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import Activities from '../containers/Activities';
import Settings from '../components/Settings';

const Content = (props) => {
  return (
    <div className="profileContent">
      <div className="profileAvatar"><FontAwesome name='user' size='3x'/></div>
      <h2 className="profileUsername"> { JSON.stringify(props.user) } </h2>
      <h4 className="profileEmail"> { props.user.email } </h4>
      <div className="profileButtonsContainer">
        <div className={classnames(['profileButton',{'profileButtonActive': !props.showSettings}])} onClick={() => props.handleClick(false)}> ACTIVITIES </div>
        <div className={classnames(['profileButton',{'profileButtonActive': props.showSettings}])} onClick={() => props.handleClick(true)}> SETTINGS </div>
      </div>
      <div className='showSettingsContainer'>
        <ReactCSSTransitionGroup
          transitionName="settings"
          transitionEnterTimeout={250}
          transitionLeaveTimeout={150}>
            <div className="absoluteWrapper" key={props.showSettings}>
              {
                !props.showSettings ?
                  <Activities scroll={props.scroll} />
                  :
                  <Settings />
              }
            </div>
        </ReactCSSTransitionGroup>
      </div>
    </div>
  )
}

  // beautyLocation(location) {
  //   try {
  //     let beauty = location.split('');
  //     if(beauty.length > 31) {
  //       beauty = beauty.slice(0, 31);
  //       if(beauty[beauty.length - 1] === ',') {
  //         beauty = beauty.slice(0, 30);
  //       }
  //       if(beauty[beauty.length - 1] === ' ' && beauty[beauty.length - 2] === ',') {
  //         beauty = beauty.slice(0, 28);
  //       }
  //       return trim(beauty.join('')) + '...'
  //     } else {
  //       return location
  //     }
  //   } catch(e) {
  //     console.log(e);
  //   }
  // }

export default Content;
