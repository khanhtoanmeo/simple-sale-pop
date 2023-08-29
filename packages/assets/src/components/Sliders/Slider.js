import React, {useState} from 'react';
import {TextField, RangeSlider} from '@shopify/polaris';
import './Sliders.scss';
import * as PropTypes from 'prop-types';

export default function Slider({max, unit, label, helpText}) {
  const [rangeValue, setRangeValue] = useState(0);

  return (
    <div className="Avada-Slider__Wrapper">
      <RangeSlider
        value={rangeValue}
        onChange={val => {
          setRangeValue(val);
        }}
        label={label}
        min={0}
        max={max}
        helpText={helpText}
        suffix={
          <div className="Avada-Slider__TextField">
            <TextField suffix={unit + '(s)'} value={`${rangeValue}`} disabled />
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
  helpText: PropTypes.string
};
