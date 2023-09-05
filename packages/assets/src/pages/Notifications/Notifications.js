import {
  Page,
  Pagination,
  ResourceItem,
  Card,
  ResourceList,
  TextStyle,
  Stack,
  EmptyState
} from '@shopify/polaris';
import React, {useState} from 'react';
import './Notifications.scss';
import {DUMMYDATA} from '../../const/dummyData';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import useFetchApi from '../../hooks/api/useFetchApi';
import {formatDateMonthOnly} from '../../helpers/utils/formatFullTime';

export default function Notifications() {
  const [selectedItems, setSelectedItems] = useState([]);
  const {loading} = useFetchApi({url: '/notifications'});

  const emptyStateMarkup = (
    <EmptyState>
      <TextStyle>No notifications yet</TextStyle>
    </EmptyState>
  );

  return (
    <Page title="Notifications" subtitle="List of sales notifications from shopify" fullWidth>
      <Card>
        <ResourceList
          // loading={loading}
          emptyState={emptyStateMarkup}
          resourceName={{singular: 'notification', plural: 'notifications'}}
          promotedBulkActions={[
            {
              title: 'actions',
              actions: [{content: 'Delete', destructive: true}]
            }
          ]}
          sortOptions={[{label: 'Newest update'}]}
          items={DUMMYDATA}
          renderItem={({id, firstName, date}) => (
            <ResourceItem id={id} key={firstName} persistActions>
              <Stack distribution="equalSpacing">
                <NotificationPopup firstName={firstName} />
                <Stack vertical spacing="extraTight">
                  <TextStyle variation="strong">{`From ${formatDateMonthOnly(date)},`}</TextStyle>
                  <TextStyle variation="strong">{`${date.getFullYear()}`}</TextStyle>
                </Stack>
              </Stack>
            </ResourceItem>
          )}
          selectable
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
        />
      </Card>
      <div className="Avada-Notifications__pagination">
        <Pagination />
      </div>
    </Page>
  );
}
