import {Page, Pagination, Stack} from '@shopify/polaris';
import React from 'react';
import NotificationsList from '../../components/Notifications/NotificationsList';
import './Notifications.scss';

export default function Notifications() {
  return (
    <Page title="Notifications" subtitle="List of sales notifications from shopify" fullWidth>
      <NotificationsList />
      <div className="Avada-Notifications__pagination">
        <Pagination />
      </div>
    </Page>
  );
}
