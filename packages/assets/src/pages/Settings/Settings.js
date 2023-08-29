import React, {useState} from 'react';
import {Page} from '@shopify/polaris';
import SettingsLayout from '../../layouts/PagesLayout/SettingsLayout';
import {initialDisplaySettings} from '../../const/initialDisplaySettings';

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const [displaySettings, setDisplaySettings] = useState(initialDisplaySettings);

  function setSettings(val, name) {
    setDisplaySettings(prev => {
      const prevClone = {...prev};
      prevClone[name] = val;
      return prevClone;
    });
  }

  function onSave() {
    console.log(displaySettings);
  }

  return (
    <Page
      title="Settings"
      fullWidth
      subtitle="Decide how your notifications will display"
      primaryAction={{content: 'Save', onAction: onSave}}
    >
      <SettingsLayout displaySettings={displaySettings} setSettings={setSettings} />
    </Page>
  );
}

Settings.propTypes = {};
