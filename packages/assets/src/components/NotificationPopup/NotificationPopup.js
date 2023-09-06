import React from 'react';
import './NoticationPopup.scss';

const NotificationPopup = ({
  firstName = 'John Doe',
  city = 'New York',
  country = 'United States',
  productName = 'Puffer Jacket With Hidden Hood',
  timestamp = 'a day ago',
  productImage = 'https://boostsales.apps.avada.io/42b7c27ec4d0b67163b3d2adc1f1221e.png',
  truncated = false,
  hideTimeAgo = false
}) => {
  return (
    <div className="Avava-SP__Wrapper fadeInUp animated">
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
                {firstName} in {city}, {country}
              </div>
              <div className={`Avada-SP__Subtitle ${truncated && 'Avada-SP__TruncateText'}`}>
                Purchased {productName}
              </div>
              <div className={'Avada-SP__Footer'}>
                <span className={`${hideTimeAgo && 'Avada-SP__HideTimeAgo'}`}>{timestamp}</span>
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
      <div className="Avada-SP__Cancel" />
    </div>
  );
};

NotificationPopup.propTypes = {};

export default NotificationPopup;
