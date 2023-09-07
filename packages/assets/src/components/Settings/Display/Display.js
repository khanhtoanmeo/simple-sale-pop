import React from 'react';
import {Checkbox, FormLayout, Card, RangeSlider, TextField} from '@shopify/polaris';
import DesktopPositionInput from '../../DesktopPositionInput/DesktopPositionInput';
import PropTypes from 'prop-types';
import {firstSlidersGroup, secondSlidersGroup} from '../../../const/slidersInfo';
import './Display.scss';

export default function Display({displaySettings, onInputChange}) {
  return (
    <>
      <Card.Section title="Appearance">
        <FormLayout>
          <DesktopPositionInput
            label={'Desktop position'}
            value={displaySettings.position}
            onChange={val => onInputChange('position', val)}
            helpText={'The display position of the pop on your website'}
          />
          <Checkbox
            onChange={val => onInputChange('hideTimeAgo', val)}
            checked={displaySettings.hideTimeAgo}
            label="Hide time ago"
            name="hideTimeAgo"
          />
          <Checkbox
            onChange={val => onInputChange('truncateProductName', val)}
            checked={displaySettings.truncateProductName}
            label="Truncate content text"
            name="truncateProductName"
            helpText='If your product name is long for one line, it will be truncated to "Product na..."'
          />
        </FormLayout>
      </Card.Section>
      <Card.Section title="Timing">
        <FormLayout>
          <FormLayout.Group>
            {firstSlidersGroup.map(({name, unit, label, helpText, max}) => (
              <RangeSlider
                key={name}
                value={displaySettings[name]}
                onChange={val => {
                  onInputChange(name, val);
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
            ))}
          </FormLayout.Group>
          <FormLayout.Group>
            {secondSlidersGroup.map(({name, unit, label, helpText, max}) => (
              <RangeSlider
                key={name}
                value={displaySettings[name]}
                onChange={val => {
                  onInputChange(name, val);
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
            ))}
          </FormLayout.Group>
        </FormLayout>
      </Card.Section>
    </>
  );
}

Display.propTypes = {
  displaySettings: PropTypes.object,
  onInputChange: PropTypes.func
};
