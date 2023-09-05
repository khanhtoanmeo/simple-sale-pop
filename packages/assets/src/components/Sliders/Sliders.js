import {Layout} from '@shopify/polaris';
import React from 'react';
import Slider from './Slider';
import PropTypes from 'prop-types';
import {slidersInfo} from '../../const/slidersInfo';

export default function Sliders({displaySettings, setSettings}) {
  return (
    <Layout>
      {slidersInfo.map(info => (
        <Slider
          {...info}
          value={displaySettings[info.name]}
          setSettings={setSettings}
          key={info.name}
        />
      ))}
    </Layout>
  );
}

Sliders.propTypes = {
  displaySettings: PropTypes.object,
  setSettings: PropTypes.func
};
