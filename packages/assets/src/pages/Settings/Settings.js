import React, {useState} from 'react';
import {
  Page,
  Card,
  Tabs,
  Layout,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer,
  SkeletonThumbnail,
  FormLayout,
  Stack
} from '@shopify/polaris';
import {initialDisplaySettings} from '../../const/initialDisplaySettings';
import Display from '../../components/Settings/Display/Display';
import Triggers from '../../components/Settings/Triggers/Triggers';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import './Settings.scss';
import useFetchApi from '../../hooks/api/useFetchApi';
import useEditApi from '../../hooks/api/useEditApi';

/**
 * @return {JSX.Element}
 */

export default function Settings() {
  const {loading, data: displaySettings, setData: setDisplaySettings} = useFetchApi({
    url: '/settings',
    defaultData: initialDisplaySettings
  });
  const {editing, handleEdit} = useEditApi({url: '/settings', defaultState: false});
  const [selected, setSelected] = useState(0);

  function setSettings(key, val) {
    setDisplaySettings(prev => ({...prev, [key]: val}));
  }
  async function onSave() {
    const dataBack = await handleEdit(displaySettings);
    console.log(dataBack);
  }

  const tabs = [
    {
      content: 'Display',
      id: 'display',
      bodyContent: <Display displaySettings={displaySettings} setSettings={setSettings} />
    },
    {
      content: 'Triggers',
      id: 'triggers',
      bodyContent: <Triggers displaySettings={displaySettings} setSettings={setSettings} />
    }
  ];

  const pageSkeletonMarkup = (
    <Layout>
      <Layout.Section secondary>
        <Card sectioned>
          <FormLayout>
            <Stack>
              <SkeletonThumbnail />
              <Stack.Item fill>
                <SkeletonBodyText />
              </Stack.Item>
            </Stack>
          </FormLayout>
        </Card>
      </Layout.Section>
      <Layout.Section>
        <Card>
          <Card.Section>
            <TextContainer>
              <SkeletonDisplayText size="small" />
            </TextContainer>
          </Card.Section>
          <Card.Section>
            <FormLayout>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={5} />
            </FormLayout>
          </Card.Section>
          <Card.Section>
            <FormLayout>
              <SkeletonDisplayText size="small" />
              <FormLayout.Group>
                <SkeletonBodyText />
                <SkeletonBodyText />
              </FormLayout.Group>
              <FormLayout.Group>
                <SkeletonBodyText />
                <SkeletonBodyText />
              </FormLayout.Group>
            </FormLayout>
          </Card.Section>
        </Card>
      </Layout.Section>
    </Layout>
  );

  const actualPageMarkup = (
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
            {tabs[selected].bodyContent}
          </Tabs>
        </Card>
      </Layout.Section>
    </Layout>
  );

  return (
    <Page
      title="Settings"
      fullWidth
      subtitle="Decide how your notifications will display"
      primaryAction={{content: 'Save', onAction: onSave, loading: editing}}
    >
      {loading ? pageSkeletonMarkup : actualPageMarkup}
    </Page>
  );
}

Settings.propTypes = {};
