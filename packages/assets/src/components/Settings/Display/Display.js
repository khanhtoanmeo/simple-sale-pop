import React, {useState} from 'react';
import {TextStyle, Stack, Checkbox} from '@shopify/polaris';
import DesktopPositionInput from '../../DesktopPositionInput/DesktopPositionInput';
import Sliders from '../../Sliders/Sliders';
import './Display.scss';

export default function Display() {
  const [hideTimeChecked, setHideTimeChecked] = useState(false);
  const [truncateTextChecked, setTruncateTextChecked] = useState(false);
  const [value, setValue] = useState('bottom-left');
  function onChangeValue(val) {
    setValue(val);
  }
  return (
    <>
      <TextStyle variation="strong">APPEARANCE</TextStyle>

      <DesktopPositionInput
        label={'Desktop position'}
        value={value}
        onChange={onChangeValue}
        helpText={'The display position of the pop on your website'}
      />
      <Stack vertical>
        <Checkbox
          onChange={val => setHideTimeChecked(val)}
          checked={hideTimeChecked}
          label="Hide time ago"
          name="hideTime"
        />
        <Checkbox
          onChange={val => setTruncateTextChecked(val)}
          checked={truncateTextChecked}
          label="Truncate content text"
          name="truncateText"
          helpText='If your product name is long for one line, it will be truncated to "Product na..."'
        />
      </Stack>

      <TextStyle variation="strong">TIMING</TextStyle>
      <Sliders />
    </>
  );
}
