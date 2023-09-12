export function orderToNotificationGraphQL({node, shopId, shopifyDomain}) {
  const {createdAt, billingAddress, lineItems} = node;
  const {firstName, city, country} = billingAddress || {};
  const {id, title, featuredImage} = lineItems.edges[0].node.product || {};

  return {
    firstName,
    city,
    country,
    productId: id,
    productName: title,
    productImage: featuredImage.url,
    timestamp: createdAt,
    shopId,
    shopifyDomain
  };
}

export async function orderToNotificationRestful({shopify, order, shopId, shopifyDomain}) {
  const {line_items: lineItems, billing_address: billingAddress, created_at: timestamp} = order;
  const {first_name: firstName, city, country} = billingAddress || {};
  const {product_id: productId, title: productName} = lineItems[0] || {};
  const {
    image: {src: productImage}
  } = await shopify.product.get(parseInt(productId));

  return {
    city,
    country,
    firstName,
    productId: 'gid://shopify/Product/' + productId,
    productImage,
    productName,
    timestamp,
    shopId,
    shopifyDomain
  };
}
