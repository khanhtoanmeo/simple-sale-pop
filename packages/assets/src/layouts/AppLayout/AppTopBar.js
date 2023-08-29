import React from 'react';
import {TopBar} from '@shopify/polaris';
import PropTypes from 'prop-types';
import {LOGO_URL, LOGO_WIDTH} from '@assets/config/theme';
import '@assets/styles/layout/topbar.scss';

/**
 * @param {boolean} isNavOpen
 * @param {function} toggleOpenNav
 * @return {JSX.Element}
 * @constructor
 */
export default function AppTopBar({isNavOpen, toggleOpenNav}) {
  const userMenuMarkUp = (
    <div className="Avada-TopBar__UserMenu">
      <TopBar.UserMenu name="Avada" initials="A" />
    </div>
  );

  const secondaryMenuMarkUp = (
    <div className="Avada-TopBar__Wrapper">
      <div className="Avada-TopBar__Title">
        <img alt="Avada App Name" src={LOGO_URL} width={LOGO_WIDTH} />
      </div>
    </div>
  );

  return <TopBar userMenu={userMenuMarkUp} secondaryMenu={secondaryMenuMarkUp} />;
}

AppTopBar.propTypes = {
  isNavOpen: PropTypes.bool,
  toggleOpenNav: PropTypes.func
};
