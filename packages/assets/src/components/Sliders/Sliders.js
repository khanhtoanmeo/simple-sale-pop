import {Stack} from '@shopify/polaris';
import React from 'react';
import Slider from './Slider';

export default function Sliders() {
  return (
    <Stack vertical>
      <Stack distribution="equalSpacing">
        <Stack.Item>
          <Slider
            unit={'second'}
            label={'Display duration'}
            helpText={'How long each pop will display on your page'}
            max={100}
          />
        </Stack.Item>
        <Stack.Item>
          <Slider
            unit={'second'}
            label={'Time before the first pop'}
            helpText={'The delay time before the first notification'}
            max={100}
          />
        </Stack.Item>
      </Stack>

      <Stack distribution="equalspacing">
        <Stack.Item>
          <Slider
            unit={'second'}
            label={'Gap time between two pops'}
            helpText={'The time interval between two popup notifications'}
            max={100}
          />
        </Stack.Item>

        <Stack.Item>
          <Slider
            unit={'pop'}
            label={'Maximum of popups'}
            helpText={
              'The maximum number of popups are allowed to show after page loading. Maximum number is 80'
            }
            max={80}
          />
        </Stack.Item>
      </Stack>
    </Stack>
  );
}
