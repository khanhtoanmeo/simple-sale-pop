import {Card, FormLayout, Select, TextField} from '@shopify/polaris';
import React from 'react';
import {
  ALL,
  ALLOW_SHOW,
  EXCLUDED_URLS,
  INCLUDED_URLS,
  SPECIFIC
} from '../../../const/displaySettings';
import PropTypes from 'prop-types';
const options = [
  {value: ALL, label: 'All pages'},
  {value: SPECIFIC, label: 'Specific pages'}
];

export default function Triggers({displaySettings, onInputChange, error}) {
  return (
    <Card.Section title="PAGES RESTRICTION">
      <FormLayout>
        <Select
          options={options.map(option => option)}
          onChange={val => {
            onInputChange(ALLOW_SHOW, val);
          }}
          value={displaySettings.allowShow}
        />
        {displaySettings.allowShow === SPECIFIC && (
          <TextField
            label="Included pages"
            helpText="Page URLs to show the pop-up (seperated by new lines)"
            multiline={3}
            onChange={val => onInputChange(INCLUDED_URLS, val)}
            value={displaySettings.includedUrls}
            error={error.from === INCLUDED_URLS && error.message}
          />
        )}
        <TextField
          label="Excluded pages"
          helpText="Page URLs NOT to show the pop-up (seperated by new lines)"
          multiline={3}
          onChange={val => onInputChange(EXCLUDED_URLS, val)}
          value={displaySettings.excludedUrls}
          error={error.from === EXCLUDED_URLS && error.message}
        />
      </FormLayout>
    </Card.Section>
  );
}

Triggers.propTypes = {
  displaySettings: PropTypes.object,
  onInputChange: PropTypes.func,
  error: PropTypes.object
};
