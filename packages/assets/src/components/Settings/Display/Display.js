import React from 'react';
import {TextStyle, Stack, Checkbox} from '@shopify/polaris';
import DesktopPositionInput from '../../DesktopPositionInput/DesktopPositionInput';
import PropTypes from 'prop-types';
import Sliders from '../../Sliders/Sliders';

import './Display.scss';

export default function Display({displaySettings, setSettings}) {
  return (
    <>
      <TextStyle variation="strong">APPEARANCE</TextStyle>
      <DesktopPositionInput
        label={'Desktop position'}
        value={displaySettings.desktopPosition}
        onChange={val => setSettings(val, 'desktopPosition')}
        helpText={'The display position of the pop on your website'}
      />
      <Stack vertical>
        <Checkbox
          onChange={val => setSettings(val, 'hideTimeChecked')}
          checked={displaySettings.hideTimeChecked}
          label="Hide time ago"
          name="hideTime"
        />
        <Checkbox
          onChange={val => setSettings(val, 'truncateTextChecked')}
          checked={displaySettings.truncateTextChecked}
          label="Truncate content text"
          name="truncateText"
          helpText='If your product name is long for one line, it will be truncated to "Product na..."'
        />
      </Stack>

      <TextStyle variation="strong">TIMING</TextStyle>
      <Sliders displaySettings={displaySettings} setSettings={setSettings} />
    </>
  );
}

Display.propTypes = {
  displaySettings: PropTypes.object,
  setSettings: PropTypes.func
};
