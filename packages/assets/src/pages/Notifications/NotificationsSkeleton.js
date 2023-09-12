import React from 'react';
import {
  Layout,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  ResourceItem
} from '@shopify/polaris';

export default function NotificationsSkeletion() {
  return (
    <SkeletonPage title="Notifications" fullWidth primaryAction>
      <Layout>
        <Layout.Section>
          <SkeletonDisplayText />
        </Layout.Section>
        <Layout.Section>
          <ResourceItem>
            <SkeletonBodyText />
          </ResourceItem>
          <ResourceItem>
            <SkeletonBodyText />
          </ResourceItem>
          <ResourceItem>
            <SkeletonBodyText />
          </ResourceItem>
          <ResourceItem>
            <SkeletonBodyText />
          </ResourceItem>
          <ResourceItem>
            <SkeletonBodyText />
          </ResourceItem>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}
