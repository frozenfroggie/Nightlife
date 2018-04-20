import React from 'react';
import FontAwesome from 'react-fontawesome';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import Activities from './Activities';
import Settings from '../components/Settings';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    }
  }
  fileSelected = event => {
    console.log(event.target.files);
  }
  render() {
    const { user } = this.props.authState;
    return (
      <div className="profileContent">
        <div className="profileAvatar">
          <FontAwesome name='user' size='3x'/>
          <input style={{display: 'none'}}
            type='file'
            onChange={this.fileSelected}
            ref={ fileInput => this.fileInput = fileInput}
          <FontAwesome onClick={() => this.fileInput.click()} name='plus' size='1x'/>
        </div>
        <h2 className="profileUsername">
        {
          user.local && (user.local.username || user.local.displayName) ||
          user.facebook && user.facebook.displayName ||
          user.google && user.google.displayName ||
          user.github && (user.github.username || user.github.displayName)
        }
        </h2>
        <h4 className="profileEmail">
        {
          user.local && user.local.email ||
          user.facebook && user.facebook.email ||
          user.google && user.google.email ||
          user.github && user.github.email
        }
        </h4>
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
              <Settings disconnect={(socialName) => props.disconnect(socialName)} user={user} />
            }
            </div>
          </ReactCSSTransitionGroup>
        </div>
      </div>
        )
  }
}

const mapStateToProps = store => ({
    authState: store.authReducer
});
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
