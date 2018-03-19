import React from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
//containers
import BarsSearchButtons from '../containers/BarsSearchButtons';
import BarsSearchResults from '../containers/BarsSearchResults';
import TheGoogleMap from '../../shared/components/TheGoogleMap';

import { changeBarsPosition } from '../../shared/actions/scrollActions';

class Bars extends React.Component {
  showNextBar = () => {
    let barsPosition = this.props.scrollState.barsPosition;
    this.props.changeBarsPosition(barsPosition - (this.props.scrollState.barsContainerHeight / 2 + 0.5));
  }
  showPreviousBar = () => {
    let barsPosition = this.props.scrollState.barsPosition;
    this.props.changeBarsPosition(barsPosition + (this.props.scrollState.barsContainerHeight / 2 + 0.5));
  }
  render() {
      return (
      <div className="wrapper">
        <div className="searchContainerComplex">
          <div className="searchResults">
            { window.innerWidth >= 1024 ? <BarsSearchButtons /> : '' }
            <BarsSearchResults />
          </div>
          <div className="backButtonContainer">
          {
            window.innerWidth < 1024 ?
            <div className="backButton">
              <div className="specialButton" onClick={() => this.props.history.push('/bars')}>
                <FontAwesome name='chevron-left'/>
              </div>
            </div>
            : ''
          }
          </div>
          <div className="barsButtonsContainer">
            {
              this.props.scrollState.barsPosition < 0 ?
                <div className="previousBarButtonContainer">
                  <div onClick={this.showPreviousBar} className="specialButton">
                    <FontAwesome name="chevron-up" />
                  </div>
                </div>
                :
                ''
            }
            {
              -this.props.scrollState.barsPosition < this.props.scrollState.barsHeight - this.props.scrollState.barsContainerHeight * 1.5 ?
              <div className="nextBarButtonContainer">
                <div onClick={this.showNextBar} className="specialButton">
                  <FontAwesome name="chevron-down" />
                </div>
              </div>
                :
                ''
            }
          </div>
          <TheGoogleMap />
        </div>
      </div>
    )

  }
}

const mapStateToProps = store => ({
  scrollState: store.scrollReducer
});

export default connect(mapStateToProps, { changeBarsPosition })(Bars);
