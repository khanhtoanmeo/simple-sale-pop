import React from 'react';
import {Page} from '@shopify/polaris';
import SettingsLayout from '../../layouts/PagesLayout/SettingsLayout';

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  return (
    <Page
      title="Settings"
      fullWidth
      subtitle="Decide how your notifications will display"
      primaryAction={{content: 'Save'}}
    >
      <SettingsLayout />
    </Page>
  );
}

Settings.propTypes = {};
