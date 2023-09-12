import React from 'react';
import {
  Layout,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  ResourceItem,
  ResourceList
} from '@shopify/polaris';

export default function NotificationsSkeletion() {
  return (
    <SkeletonPage title="Notifications" fullWidth primaryAction>
      <Layout>
        <Layout.Section>
          <SkeletonDisplayText />
        </Layout.Section>
        <Layout.Section>
          <ResourceList
            items={[1, 2, 3, 4, 5]}
            renderItem={id => (
              <ResourceItem key={id}>
                <SkeletonBodyText />
              </ResourceItem>
            )}
          />
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}
