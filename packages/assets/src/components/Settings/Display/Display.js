import React from 'react';
import {Checkbox, FormLayout, Card, RangeSlider, TextField} from '@shopify/polaris';
import DesktopPositionInput from '../../DesktopPositionInput/DesktopPositionInput';
import PropTypes from 'prop-types';
import {firstSlidersGroup, secondSlidersGroup} from '../../../const/slidersInfo';
import './Display.scss';

export default function Display({displaySettings, setSettings}) {
  function mapSlidersGroup(sliderGroup) {
    return sliderGroup.map(({name, unit, label, helpText, max}) => (
      <RangeSlider
        key={name}
        value={displaySettings[name]}
        onChange={val => {
          setSettings(name, val);
        }}
        label={label}
        min={0}
        max={max}
        helpText={helpText}
        suffix={
          <div className="Avada-Slider__TextField">
            <TextField suffix={unit + '(s)'} value={`${displaySettings[name]}`} disabled />
          </div>
        }
      />
    ));
  }

  return (
    <>
      <Card.Section title="Appearance">
        <FormLayout>
          <DesktopPositionInput
            label={'Desktop position'}
            value={displaySettings.position}
            onChange={val => setSettings('position', val)}
            helpText={'The display position of the pop on your website'}
          />
          <Checkbox
            onChange={val => setSettings('hideTimeAgo', val)}
            checked={displaySettings.hideTimeAgo}
            label="Hide time ago"
            name="hideTimeAgo"
          />
          <Checkbox
            onChange={val => setSettings('truncateProductName', val)}
            checked={displaySettings.truncateProductName}
            label="Truncate content text"
            name="truncateProductName"
            helpText='If your product name is long for one line, it will be truncated to "Product na..."'
          />
        </FormLayout>
      </Card.Section>
      <Card.Section title="Timing">
        <FormLayout>
          <FormLayout.Group>{mapSlidersGroup(firstSlidersGroup)}</FormLayout.Group>

          <FormLayout.Group>{mapSlidersGroup(secondSlidersGroup)}</FormLayout.Group>
        </FormLayout>
      </Card.Section>
    </>
  );
}

Display.propTypes = {
  displaySettings: PropTypes.object,
  setSettings: PropTypes.func
};
