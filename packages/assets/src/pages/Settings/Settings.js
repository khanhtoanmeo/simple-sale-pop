import React from 'react';
import {Page, Card, Tabs, Layout} from '@shopify/polaris';
import {initialDisplaySettings} from '../../const/initialDisplaySettings';
import Display from '../../components/Settings/Display/Display';
import Triggers from '../../components/Settings/Triggers/Triggers';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import './Settings.scss';
import useFetchApi from '../../hooks/api/useFetchApi';
import SettingsSkeleton from './SettingsSkeleton';
import useEditApi from '../../hooks/api/useEditApi';
import useTabs from '../../hooks/tab/useTabs';

/**
 * @return {JSX.Element}
 */

export default function Settings() {
  const {loading, data: displaySettings, handleInputChange} = useFetchApi({
    url: '/settings',
    defaultData: initialDisplaySettings
  });
  const {editing, handleEdit} = useEditApi({url: '/settings'});
  const tabs = [
    {
      content: 'Display',
      id: 'display',
      bodyContent: <Display displaySettings={displaySettings} onInputChange={handleInputChange} />
    },
    {
      content: 'Triggers',
      id: 'triggers',
      bodyContent: <Triggers displaySettings={displaySettings} onInputChange={handleInputChange} />
    }
  ];
  const {setSelected, activeTab, selected} = useTabs(tabs);

  async function onSave() {
    const dataBack = await handleEdit(displaySettings);
    console.log(dataBack);
  }

  if (loading) return <SettingsSkeleton />;

  return (
    <Page
      title="Settings"
      fullWidth
      subtitle="Decide how your notifications will display"
      primaryAction={{content: 'Save', onAction: onSave, loading: editing}}
    >
      <Layout>
        <Layout.Section oneThird>
          <NotificationPopup
            truncated={displaySettings.truncateProductName}
            hideTimeAgo={displaySettings.hideTimeAgo}
          />
        </Layout.Section>
        <Layout.Section>
          <Card>
            <Tabs selected={selected} onSelect={setSelected} tabs={tabs}>
              {activeTab}
            </Tabs>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

Settings.propTypes = {};
