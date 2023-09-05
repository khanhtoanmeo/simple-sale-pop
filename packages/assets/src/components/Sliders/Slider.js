import React from 'react';
import {TextField, RangeSlider} from '@shopify/polaris';
import './Sliders.scss';
import * as PropTypes from 'prop-types';

export default function Slider({max, unit, label, helpText, value, name, setSettings}) {
  function onType(val) {
    let valToNumber = +val;
    if (valToNumber < 0 || Number.isNaN(valToNumber)) return;
    if (val.trim() === '') valToNumber = 0;
    if (valToNumber > max) valToNumber = max;

    setSettings(valToNumber, name);
  }
  return (
    <div className="Avada-Slider__Wrapper">
      <RangeSlider
        value={value}
        onChange={val => {
          setSettings(val, name);
        }}
        label={label}
        min={0}
        max={max}
        helpText={helpText}
        suffix={
          <div className="Avada-Slider__TextField">
            <TextField suffix={unit + '(s)'} value={`${value}`} onChange={onType} />
          </div>
        }
      />
    </div>
  );
}

Slider.propTypes = {
  max: PropTypes.number,
  unit: PropTypes.string,
  label: PropTypes.string,
  helpText: PropTypes.string,
  value: PropTypes.number || PropTypes.string,
  name: PropTypes.string,
  setSettings: PropTypes.func
};
