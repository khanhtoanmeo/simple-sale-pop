export async function registerWebhooks(shopify) {
  const webhooks = [
    {
      address: 'https://5fac-123-17-158-3.ngrok.io/webhook/order/new',
      topic: 'orders/create',
      format: 'json'
    }
  ];

  return await Promise.all(webhooks.map(webhook => shopify.webhook.create(webhook)));
}
