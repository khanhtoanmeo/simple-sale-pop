import React, {useState} from 'react';
import {Page, Card, Tabs, Layout} from '@shopify/polaris';
import Display from '../../components/Settings/Display/Display';
import Triggers from '../../components/Settings/Triggers/Triggers';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import './Settings.scss';
import useFetchApi from '../../hooks/api/useFetchApi';
import SettingsSkeleton from './SettingsSkeleton';
import useEditApi from '../../hooks/api/useEditApi';
import useTabs from '../../hooks/tab/useTabs';
import {isValidUrls} from '../../helpers/isValidUrls';
import {EXCLUDED_URLS, INCLUDED_URLS, SPECIFIC} from '../../const/displaySettings';
import {setToast} from '../../actions/storeActions';
import {useStore} from '../../reducers/storeReducer';

/**
 * @return {JSX.Element}
 */

export default function Settings() {
  const {loading, data: displaySettings, handleInputChange} = useFetchApi({
    url: '/settings'
  });
  const {editing, handleEdit} = useEditApi({url: `/settings`});
  const [inputError, setInputError] = useState({from: '', message: ''});

  const tabs = [
    {
      content: 'Display',
      id: 'display',
      bodyContent: <Display displaySettings={displaySettings} onInputChange={handleInputChange} />
    },
    {
      content: 'Triggers',
      id: 'triggers',
      bodyContent: (
        <Triggers
          displaySettings={displaySettings}
          onInputChange={handleInputChange}
          error={inputError}
        />
      )
    }
  ];
  const {setSelected, activeTab, selected} = useTabs(tabs);
  const {dispatch} = useStore();

  async function onSave() {
    try {
      const {includedUrls, excludedUrls} = displaySettings;
      if (!isValidUrls(includedUrls))
        return setInputError({from: INCLUDED_URLS, message: 'Included urls must be valid urls'});
      if (!isValidUrls(excludedUrls))
        return setInputError({from: EXCLUDED_URLS, message: 'Excluded urls must be valid urls'});

      await handleEdit(displaySettings);
      setInputError({from: '', message: ''});
    } catch (error) {
      setToast(dispatch, error.message, true);
    }
  }

  if (loading) return <SettingsSkeleton />;

  return (
    <Page
      title="Settings"
      fullWidth
      subtitle="Decide how your notifications will display"
      primaryAction={{
        content: 'Save',
        onAction: onSave,
        loading: editing,
        disabled: displaySettings.allowShow === SPECIFIC && !displaySettings.includedUrls.trim()
      }}
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
