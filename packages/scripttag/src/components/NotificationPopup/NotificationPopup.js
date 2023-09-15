import React from 'react';
import './NoticationPopup.scss';
import PropTypes from 'prop-types';
import {BOTTOM_LEFT, BOTTOM_RIGHT, TOP_LEFT, TOP_RIGHT} from '../../const/displaySettings';

const NotificationPopup = ({
  firstName = 'John Doe',
  city = 'New York',
  country = 'United States',
  productName = 'Puffer Jacket With Hidden Hood',
  timestamp = 'a day ago',
  productImage = 'https://boostsales.apps.avada.io/42b7c27ec4d0b67163b3d2adc1f1221e.png',
  truncateProductName = false,
  hideTimeAgo = false,
  position = BOTTOM_LEFT
}) => {
  function getPositionClassName(position) {
    let classNamePostfix;
    switch (position) {
      case BOTTOM_LEFT:
        classNamePostfix = 'BottomLeft';
        break;
      case BOTTOM_RIGHT:
        classNamePostfix = 'BottomRight';
        break;
      case TOP_LEFT:
        classNamePostfix = 'TopLeft';
        break;
      case TOP_RIGHT:
        classNamePostfix = 'TopRight';
        break;
    }
    return `Avava-SP__Wrapper--${classNamePostfix}`;
  }

  return (
    <div className={`Avava-SP__Wrapper fadeInUp animated ${getPositionClassName(position)}`}>
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          <a href="#" className={'Avava-SP__LinkWrapper'}>
            <div
              className="Avava-SP__Image"
              style={{
                backgroundImage: `url(${productImage})`
              }}
            ></div>
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'}>
                {firstName || 'Someone'} in {city}, {country}
              </div>
              <div
                className={`Avada-SP__Subtitle ${truncateProductName &&
                  'Avada-SP__Subtitle--TruncateText'}`}
              >
                Purchased {productName}
              </div>
              <div className={'Avada-SP__Footer'}>
                <span className={`${hideTimeAgo && 'Avada-SP__TimeText--HideTimeAgo'}`}>
                  {timestamp}
                </span>
                <span className="uni-blue">
                  <img
                    className="Avada-SP__CheckIcon"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Blue_check.svg/2048px-Blue_check.svg.png"
                  />
                  by Avada
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
      <svg
        viewBox="0 0 20 20"
        className="Icon_Icon__Dm3QW Avada-SP__CancelButton"
        onClick={() => {
          const popEl = document.getElementById('Avada-SP__Pop');
          popEl.classList.remove('Avada-SP__Pop--Display');
          popEl.classList.add('Avada-SP__Pop--Hide');
        }}
      >
        <path d="M13.97 15.03a.75.75 0 1 0 1.06-1.06l-3.97-3.97 3.97-3.97a.75.75 0 0 0-1.06-1.06l-3.97 3.97-3.97-3.97a.75.75 0 0 0-1.06 1.06l3.97 3.97-3.97 3.97a.75.75 0 1 0 1.06 1.06l3.97-3.97 3.97 3.97Z"></path>
      </svg>
    </div>
  );
};

NotificationPopup.propTypes = {
  firstName: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  productName: PropTypes.string,
  timestamp: PropTypes.string,
  productImage: PropTypes.string,
  truncateProductName: PropTypes.bool,
  hideTimeAgo: PropTypes.bool,
  position: PropTypes.string
};

export default NotificationPopup;
