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
import {formatDateMonthOnly} from '../../helpers/utils/formatFullTime';
import usePaginate from '../../hooks/api/usePaginate';
import NotificationsSkeletion from './NotificationsSkeleton';
import moment from 'moment';

export default function Notifications() {
  const [selectedItems, setSelectedItems] = useState([]);
  const {loading, data, pageInfo, nextPage, prevPage, count} = usePaginate({
    url: '/notifications',
    defaultLimit: 4,
    defaultSort: 'timestamp:desc'
  });

  const emptyStateMarkup = (
    <Card>
      <EmptyState
        heading="No notifications yet"
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      />
    </Card>
  );

  const resourceListMarkup = (
    <ResourceList
      emptyState={emptyStateMarkup}
      resourceName={{singular: 'notification', plural: 'notifications'}}
      sortOptions={[{label: 'Newest update'}]}
      items={data}
      totalItemsCount={count}
      renderItem={data => {
        const date = new Date(data.timestamp._seconds * 1000);

        return (
          <ResourceItem id={data.id} key={data.firstName} persistActions>
            <Stack distribution="equalSpacing">
              <NotificationPopup {...data} timestamp={moment(date).fromNow()} />
              <Stack vertical spacing="extraTight" alignment="trailing">
                <TextStyle variation="strong">{`From ${formatDateMonthOnly(date)},`}</TextStyle>
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
  );

  if (loading) return <NotificationsSkeletion />;

  return (
    <Page title="Notifications" subtitle="List of sales notifications from shopify" fullWidth>
      <Layout>
        <Layout.Section>
          <Card>{resourceListMarkup}</Card>
        </Layout.Section>
        <Layout.Section>
          <Stack distribution="center">
            <Pagination
              hasNext={pageInfo.hasNext}
              hasPrevious={pageInfo.hasPre}
              onNext={nextPage}
              onPrevious={prevPage}
            />
          </Stack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
