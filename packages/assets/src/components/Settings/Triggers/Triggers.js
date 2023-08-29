import {Select, TextField} from '@shopify/polaris';
import React from 'react';
const options = ['All pages', 'Specific pages'];
import PropTypes from 'prop-types';

export default function Triggers({displaySettings, setSettings}) {
  return (
    <>
      <Select
        label="PAGES RESTRICTION"
        options={options.map(option => ({value: option, label: option}))}
        onChange={val => {
          setSettings(val, 'pagesRestriction');
        }}
        value={displaySettings.pagesRestriction}
      />
      {displaySettings.pagesRestriction === 'Specific pages' && (
        <TextField
          label="Included pages"
          helpText="Page URLs NOT to show the pop-up (seperated by new lines)"
          multiline={3}
          onChange={val => setSettings(val, 'includedPages')}
          value={displaySettings.includedPages}
        />
      )}
      <TextField
        label="Excluded pages"
        helpText="Page URLs NOT to show the pop-up (seperated by new lines)"
        multiline={3}
        onChange={val => setSettings(val, 'excludedPages')}
        value={displaySettings.excludedPages}
      />
    </>
  );
}

Triggers.propTypes = {
  displaySettings: PropTypes.object,
  setSettings: PropTypes.func
};
