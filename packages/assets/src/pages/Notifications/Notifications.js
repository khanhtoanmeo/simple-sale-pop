import {
  Page,
  Pagination,
  ResourceItem,
  Card,
  ResourceList,
  TextStyle,
  Stack,
  EmptyState,
  Layout
} from '@shopify/polaris';
import React, {useState} from 'react';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import useFetchApi from '../../hooks/api/useFetchApi';
import {formatDateMonthOnly} from '../../helpers/utils/formatFullTime';

export default function Notifications() {
  const [selectedItems, setSelectedItems] = useState([]);
  const {loading, data} = useFetchApi({url: '/notifications'});

  const emptyStateMarkup = (
    <Card>
      <EmptyState
        heading="No notifications yet"
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      />
    </Card>
  );

  return (
    <Page title="Notifications" subtitle="List of sales notifications from shopify" fullWidth>
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              loading={loading}
              emptyState={emptyStateMarkup}
              resourceName={{singular: 'notification', plural: 'notifications'}}
              promotedBulkActions={[
                {
                  title: 'actions',
                  actions: [{content: 'Delete', destructive: true}]
                }
              ]}
              sortOptions={[{label: 'Newest update'}]}
              items={data}
              renderItem={({id, firstName, timestamp}) => {
                const date = new Date(timestamp._seconds * 10 ** 3);
                return (
                  <ResourceItem id={id} key={firstName} persistActions>
                    <Stack distribution="equalSpacing">
                      <NotificationPopup firstName={firstName} />
                      <Stack vertical spacing="extraTight" alignment="trailing">
                        <TextStyle variation="strong">{`From ${formatDateMonthOnly(
                          date
                        )},`}</TextStyle>
                        <TextStyle variation="strong">{`${date.getFullYear()}`}</TextStyle>
                      </Stack>
                    </Stack>
                  </ResourceItem>
                );
              }}
              selectable
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
            />
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Stack distribution="center">
            <Pagination />
          </Stack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
