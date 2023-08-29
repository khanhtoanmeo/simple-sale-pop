import React, {useState} from 'react';
import {Stack, Card, Tabs} from '@shopify/polaris';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import Display from '../../components/Settings/Display/Display';
import Triggers from '../../components/Settings/Triggers/Triggers';
import './SettingsLayout.scss';

const tabsOrder = ['display', 'triggers'];

export default function SettingsLayout() {
  const [selected, setSelected] = useState(0);

  return (
    <Stack>
      <NotificationPopup />
      <Card>
        <Tabs
          selected={selected}
          onSelect={setSelected}
          tabs={[
            {content: 'Display', id: 'display'},
            {content: 'Triggers', id: 'triggers'}
          ]}
        >
          <div className="Avada-SettingTab__Wrapper">
            {tabsOrder[selected] === 'display' ? <Display /> : <Triggers />}
          </div>
        </Tabs>
      </Card>
    </Stack>
  );
}
