import React, {useState} from 'react';
import {Card, ResourceItem, ResourceList} from '@shopify/polaris';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';
import {DUMMYDATA} from '../../const/dummyData';

export default function NotificationsList() {
  const [selectedItems, setSelectedItems] = useState([]);
  return (
    <Card>
      <ResourceList
        resourceName={{singular: 'notification', plural: 'notifications'}}
        promotedBulkActions={[
          {
            title: 'Chill',
            actions: [{content: 'haha'}, {content: 'hihi'}]
          }
        ]}
        sortOptions={[{label: 'Newest update'}]}
        items={DUMMYDATA}
        renderItem={({id, firstName, content}) => (
          <ResourceItem
            id={id}
            key={firstName}
            shortcutActions={[{content: content, disabled: true}]}
            persistActions
          >
            <NotificationPopup firstName={firstName} />
          </ResourceItem>
        )}
        selectable
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
      />
    </Card>
  );
}
