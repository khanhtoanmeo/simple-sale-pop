import React from 'react';
import {
  Layout,
  Card,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  TextContainer,
  Stack,
  FormLayout,
  SkeletonThumbnail
} from '@shopify/polaris';

export default function SettingsSkeleton() {
  return (
    <SkeletonPage
      title="Settings"
      fullWidth
      subtitle="Decide how your notifications will display"
      primaryAction
    >
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
    </SkeletonPage>
  );
}
