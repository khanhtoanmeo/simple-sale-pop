import {Select, TextField} from '@shopify/polaris';
import React, {useState} from 'react';
const options = ['All pages', 'Specific pages'];

export default function Triggers() {
  const [selected, setSelected] = useState('All pages');
  const [includedPages, setIncludedPages] = useState('');
  const [excludedPages, setExcludedPages] = useState('');
  return (
    <>
      <Select
        label="PAGES RESTRICTION"
        options={options.map(option => ({value: option, label: option}))}
        onChange={val => {
          setSelected(val);
        }}
        value={selected}
      />
      {selected === 'Specific pages' && (
        <TextField
          label="Include pages"
          helpText="Page URLs NOT to show the pop-up (seperated by new lines)"
          multiline={3}
          onChange={val => setIncludedPages(val)}
          value={includedPages}
        />
      )}
      <TextField
        label="Exclude pages"
        helpText="Page URLs NOT to show the pop-up (seperated by new lines)"
        multiline={3}
        onChange={val => setExcludedPages(val)}
        value={excludedPages}
      />
    </>
  );
}
