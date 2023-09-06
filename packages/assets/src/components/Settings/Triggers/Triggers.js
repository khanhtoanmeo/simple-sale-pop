import {Card, FormLayout, Select, TextField} from '@shopify/polaris';
import React from 'react';
const options = ['All pages', 'Specific pages'];
import PropTypes from 'prop-types';

export default function Triggers({displaySettings, setSettings}) {
  return (
    <Card.Section title="PAGES RESTRICTION">
      <FormLayout>
        <Select
          options={options.map(option => ({value: option, label: option}))}
          onChange={val => {
            setSettings('allowShow', val);
          }}
          value={displaySettings.allowShow}
        />
        {displaySettings.allowShow === 'Specific pages' && (
          <TextField
            label="Included pages"
            helpText="Page URLs to show the pop-up (seperated by new lines)"
            multiline={3}
            onChange={val => setSettings('includedUrls', val)}
            value={displaySettings.includedUrls}
          />
        )}
        <TextField
          label="Excluded pages"
          helpText="Page URLs NOT to show the pop-up (seperated by new lines)"
          multiline={3}
          onChange={val => setSettings('excludedUrls', val)}
          value={displaySettings.excludedUrls}
        />
      </FormLayout>
    </Card.Section>
  );
}

Triggers.propTypes = {
  displaySettings: PropTypes.object,
  setSettings: PropTypes.func
};
