import React, {useState} from 'react';
import {Page, Card, Stack, Tabs} from '@shopify/polaris';
import {initialDisplaySettings} from '../../const/initialDisplaySettings';
import Display from '../../components/Settings/Display/Display';
import Triggers from '../../components/Settings/Triggers/Triggers';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import './Settings.scss';
import useFetchApi from '../../hooks/api/useFetchApi';

const tabs = [
  {content: 'Display', id: 'display'},
  {content: 'Triggers', id: 'triggers'}
];

/**
 * @return {JSX.Element}
 */

export default function Settings() {
  const [displaySettings, setDisplaySettings] = useState(initialDisplaySettings);
  const [selected, setSelected] = useState(0);

  const {loading} = useFetchApi({url: '/settings'});

  function setSettings(val, name) {
    setDisplaySettings(prev => ({
      ...prev,
      [name]: val
    }));
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
      <Stack distribution="equalSpacing">
        <NotificationPopup />
        <Card>
          <Tabs selected={selected} onSelect={setSelected} tabs={tabs}>
            <div className="Avada-SettingTab__Wrapper">
              {tabs[selected].id === 'display' ? (
                <Display displaySettings={displaySettings} setSettings={setSettings} />
              ) : (
                <Triggers displaySettings={displaySettings} setSettings={setSettings} />
              )}
            </div>
          </Tabs>
        </Card>
      </Stack>
    </Page>
  );
}

Settings.propTypes = {};
