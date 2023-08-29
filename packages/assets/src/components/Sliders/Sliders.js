import {Layout, Stack} from '@shopify/polaris';
import React from 'react';
import Slider from './Slider';
import PropTypes from 'prop-types';

export default function Sliders({displaySettings, setSettings}) {
  return (
    <Layout>
      <Layout.Section oneHalf>
        <Stack>
          <Slider
            name={'duration'}
            unit={'second'}
            label={'Display duration'}
            helpText={'How long each pop will display on your page'}
            max={100}
            value={displaySettings.duration}
            setSettings={setSettings}
          />

          <Slider
            name={'delayTime'}
            unit={'second'}
            label={'Time before the first pop'}
            helpText={'The delay time before the first notification'}
            max={100}
            setSettings={setSettings}
            value={displaySettings.delayTime}
          />
        </Stack>
      </Layout.Section>
      <Layout.Section>
        <Stack>
          <Slider
            name={'gapTime'}
            unit={'second'}
            label={'Gap time between two pops'}
            helpText={'The time interval between two popup notifications'}
            max={100}
            value={displaySettings.gapTime}
            setSettings={setSettings}
          />

          <Slider
            name={'maxPopups'}
            unit={'pop'}
            label={'Maximum of popups'}
            helpText={
              'The maximum number of popups are allowed to show after page loading. Maximum number is 800'
            }
            max={80}
            value={displaySettings.maxPopups}
            setSettings={setSettings}
          />
        </Stack>
      </Layout.Section>
    </Layout>
  );
}

Sliders.propTypes = {
  displaySettings: PropTypes.object,
  setSettings: PropTypes.func
};
