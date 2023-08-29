import React, {useState} from 'react';
import {TextField, RangeSlider} from '@shopify/polaris';
import './Sliders.scss';
export default function Slider({max, unit, label, helpText}) {
  const [rangeValue, setRangeValue] = useState(0);

  return (
    <div className="Avada-Slider__Wrapper">
      <RangeSlider
        value={rangeValue}
        onChange={val => {
          console.log(val, typeof val);
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
