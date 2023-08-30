import React from 'react';
import {TextStyle, Stack, Checkbox, FormLayout} from '@shopify/polaris';
import DesktopPositionInput from '../../DesktopPositionInput/DesktopPositionInput';
import PropTypes from 'prop-types';
import Sliders from '../../Sliders/Sliders';

export default function Display({displaySettings, setSettings}) {
  return (
    <FormLayout>
      <TextStyle variation="strong">APPEARANCE</TextStyle>
      <DesktopPositionInput
        label={'Desktop position'}
        value={displaySettings.position}
        onChange={val => setSettings(val, 'position')}
        helpText={'The display position of the pop on your website'}
      />
      <Stack vertical>
        <Checkbox
          onChange={val => setSettings(val, 'hideTimeAgo')}
          checked={displaySettings.hideTimeAgo}
          label="Hide time ago"
          name="hideTime"
        />
        <Checkbox
          onChange={val => setSettings(val, 'truncateProductName')}
          checked={displaySettings.truncateProductName}
          label="Truncate content text"
          name="truncateText"
          helpText='If your product name is long for one line, it will be truncated to "Product na..."'
        />
      </Stack>

      <TextStyle variation="strong">TIMING</TextStyle>
      <Sliders displaySettings={displaySettings} setSettings={setSettings} />
    </FormLayout>
  );
}

Display.propTypes = {
  displaySettings: PropTypes.object,
  setSettings: PropTypes.func
};
