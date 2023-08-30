import {
  Page,
  Pagination,
  ResourceItem,
  Card,
  ResourceList,
  TextStyle,
  Stack
} from '@shopify/polaris';
import React, {useState} from 'react';
import './Notifications.scss';
import {DUMMYDATA} from '../../const/dummyData';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
export default function Notifications() {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <Page title="Notifications" subtitle="List of sales notifications from shopify" fullWidth>
      <Card>
        <ResourceList
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
                  <TextStyle variation="strong">{`From ${
                    months[date.getMonth()]
                  } ${date.getDate()},`}</TextStyle>
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
